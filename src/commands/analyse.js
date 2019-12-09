const Flags = require("../flags");
const Command = require("../BaseCommand");
const Logger = require("../Logger");
const { getCrawlTree } = require("../PageCrawler");
const handleTimeout = require("../handleTimeout");
const { getSubdomainsList } = require("../SubdomainCrawler");
const { getNetworkInfo } = require("../NetworkInfo");
const {  generateSubdomainsGraph } = require("../SubdomainsGraph");
const { findWebPageTechnologies, noVersionCount } = require("../TechAnalyser");
const {
    findCVEsWithoutCache, findCVEsWithCache, updateLocalCVECache, localCVECacheExists,
} = require("../CVEs");
const Errors = require("../errors");
const { saveHTMLReport } = require("../html-report/HTMLReport");

class AnalyseCommand extends Command {
    async run() {
        const { args, flags } = this.parse(AnalyseCommand);

        const { domain } = args;
        const {
            timeout, depth, noCrawlingCache, noCveCache, updateCveCache, graph,
        } = flags;

        const analysis_data = {
            domain,
        };

        /* Setup timeout */
        if (timeout) {
            handleTimeout(() => {
                Logger.error(Errors.TIMEOUT.description);
                process.exit(Errors.TIMEOUT.code);
            }, timeout);
        }

        /* Cache preparation */
        if (noCveCache) {
            Logger.print("CVE cache will not be used in this analysis.");
        } else {
            const cve_cache_exists = localCVECacheExists();
            if (updateCveCache || !cve_cache_exists) {
                if (!cve_cache_exists) {
                    Logger.print("CVE cache not found.");
                } else if (updateCveCache) {
                    Logger.print("CVE cache update was requested.");
                }
                Logger.print("Downloading CVEs database ...");

                try {
                    await updateLocalCVECache();
                } catch (e) {
                    Logger.error(Errors.CVE_LOCAL_CACHE_UPDATE.description);
                    Logger.error(
                        "Could not update the local CVE cache. If the problem persists, try running the tool without using cache.",
                    );
                    process.exit(Errors.CVE_LOCAL_CACHE_UPDATE.code);
                }
            }
        }

        const findCVEs = noCveCache ? findCVEsWithoutCache : findCVEsWithCache;

        Logger.print(`Starting ${domain} analysis...`);

        /* Get Subdomains */
        Logger.print("Searching for subdomains...");

        const subdomains_list = await getSubdomainsList(domain);

        if (subdomains_list.length === 0) {
            Logger.print(`No subdomains found for ${domain}.`);
            subdomains_list.push(domain);
        } else {
            Logger.print(`Found ${subdomains_list.length} subdomains.`);
        }

        analysis_data.subdomains = subdomains_list.map((subdomain) => ({
            name: subdomain,
            pages: [],
        }));

        /* Subdomains Graph */
        if (graph) {
            Logger.print("Generating subdomains graph file...");
            generateSubdomainsGraph(domain);
            Logger.print("Subdomains graph file generated.");
        }

        /* Get Pages */
        Logger.print("Searching for domain and subdomain's pages...");

        const crawl_tree = await getCrawlTree(subdomains_list, depth, noCrawlingCache);
        const num_pages = Object.values(crawl_tree).reduce((prev, curr) => prev + curr.length, 0);

        Logger.print(`Found ${num_pages} pages.`);

        analysis_data.subdomains.forEach((subdomain) => {
            subdomain.pages = crawl_tree[subdomain.name].map((page) => ({
                name: page,
                technologies: [],
            }));
        });

        /* Date */
        analysis_data.date = new Date().toISOString().substr(0, 10);

        /* Get Network info */
        Logger.print("Getting network information for the domain...");

        try {
            analysis_data.network = await getNetworkInfo(domain);
            Logger.print("Network info found.");
            Logger.print(`Network Info: ${JSON.stringify(analysis_data.network, null, 2)}`, true);
        } catch (e) {
            Logger.error("Failed to get networking information");
        }

        /* Get technologies */
        Logger.print("Searching technologies for the found pages...");

        const techs_version_info = {
            num_techs: 0,
            num_techs_no_version: 0,
        };
        for (const subdomain of analysis_data.subdomains) {
            await Promise.all(subdomain.pages.map(async (page) => {
                Logger.print(`Searching technologies for page ${page.name}...`, true);
                const technologies = await findWebPageTechnologies(page.name);
                page.no_version_technologies = noVersionCount(technologies);
                page.technologies = technologies.map((tech) => ({
                    name: tech.name,
                    version: tech.version,
                    cves: [],
                }));
                Logger.print(`Found ${technologies.length} technologies for page ${page.name}.`, true);
            }));

            /* Get CVEs for the subdomain*/
            const tech_cves = {}; // Hashmap to store technology cves (to avoid searching same technology more than once)
            for (const page of subdomain.pages) {
                techs_version_info.num_techs += page.technologies.length;
                techs_version_info.num_techs_no_version += page.no_version_technologies;
                await Promise.all(page.technologies.map(async (tech) => {
                    Logger.print(`Searching CVEs for technology ${tech.name}...`, true);
                    if (!tech_cves[tech.name]) {
                        tech_cves[tech.name] = await findCVEs(tech.name);
                    }
                    tech.cves = tech_cves[tech.name];
                    Logger.print(`Found ${tech_cves[tech.name].length} CVEs for technology ${tech.name}.`, true);
                }));
            }
        }

        analysis_data.num_techs_no_version = `${techs_version_info.num_techs_no_version}/${techs_version_info.num_techs}`;

        saveHTMLReport(analysis_data);

        process.exit(0);
    }
}

AnalyseCommand.args = [
    {
        name: "domain",
        required: true,
        description: "domain to search subdomains",
        hidden: false,
    },
];

AnalyseCommand.description = "Test commmand description";

AnalyseCommand.flags = {
    ...Flags,
};

AnalyseCommand.examples  = [
    "analyse https://www.google.com",
    "analyse https://www.youtube.com -d 2 --verbose",
    "analyse https://www.github.com -t 10 --noCveCache --noCrawlingCache",
];

module.exports = AnalyseCommand;
