const Flags = require("../flags");
const Logger = require("../Logger");
const Command = require("../BaseCommand");
const Errors = require("../errors");
const { getSubdomainsList } = require("../SubdomainCrawler");
const { getPagesList } = require("../PageCrawler");
const { generateSubdomainsGraph } = require("../SubdomainsGraph");
const { addURLEndSlash, extractDomainFromUrl } = require("../utils");

class CrawlerCommand extends Command {
    async run() {
        const { args, flags } = this.parse(CrawlerCommand);

        const { depth, noCrawlingCache, graph } = flags;
        const { domain } = args;

        const subdomains_list = await getSubdomainsList(domain);

        if (graph) generateSubdomainsGraph(domain);

        const crawl_tree = {};

        await Promise.all(subdomains_list.map(async (subdomain) => {
            // Logger.print(`Fetching pages for subdomain ${subdomain}`);
            const pages_list = await getPagesList(`https://${addURLEndSlash(extractDomainFromUrl(subdomain))}`, depth, noCrawlingCache);
            crawl_tree[subdomain] = pages_list || [];
        }));

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
    timeout: Flags.timeout,
    verbose: Flags.verbose,
    depth: Flags.depth,
    noCrawlingCache: Flags.noCrawlingCache,
    graph: Flags.graph,
};

module.exports = CrawlerCommand;
