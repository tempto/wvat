const Flags = require("../flags");
const Logger = require("../Logger");
const Command = require("../BaseCommand");
const Errors = require("../errors");
const { generateSubdomainsGraph } = require("../SubdomainsGraph");
const { getCrawlTree } = require("../PageCrawler");
const { getSubdomainsList, getCompatibleWhitelistedSubdomains } = require("../SubdomainCrawler");
const { stripDomain } = require("../utils");

class CrawlerCommand extends Command {
    async run() {
        const { args, flags } = await this.parse(CrawlerCommand);

        const { depth, noCrawlingCache, graph, whitelist, crawlingTimeout } = flags;
        const { domain } = args;

        let subdomains_list;
        if (whitelist) {
            subdomains_list = getCompatibleWhitelistedSubdomains(whitelist, stripDomain(domain));
        } else {
            subdomains_list = await getSubdomainsList(stripDomain(domain), { timeout: crawlingTimeout });
        }

        if (subdomains_list.length === 0) {
            Logger.print(`No subdomains found for ${domain}.`);
            subdomains_list.push(domain);
        } else {
            Logger.print(`Found ${subdomains_list.length} subdomains.`);
        }

        if (graph) generateSubdomainsGraph(domain);

        const crawl_tree = await getCrawlTree(subdomains_list, depth, noCrawlingCache);

        if (subdomains_list.length) {
            Logger.print(crawl_tree, true);
            return crawl_tree;
        } else {
            Logger.error(Errors.NO_SUBDOMAINS_FOUND.description);
            process.exit(Errors.NO_SUBDOMAINS_FOUND.code);
            return null;
        }
    }
}

CrawlerCommand.description = "Searches for all subdomains for a given domain";

CrawlerCommand.args = [
    {
        name: "domain",
        required: true,
        description: "domain to search subdomains",
        hidden: false,
    },
];

CrawlerCommand.flags = {
    ...Flags.global,
    depth: Flags.depth,
    noCrawlingCache: Flags.noCrawlingCache,
    graph: Flags.graph,
    crawlingTimeout: Flags.crawlingTimeout,
    whitelist: Flags.whitelist,
};

module.exports = {
    CrawlerCommand,
    getCompatibleWhitelistedSubdomains,
};
