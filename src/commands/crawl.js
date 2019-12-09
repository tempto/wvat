const Flags = require("../flags");
const Logger = require("../Logger");
const Command = require("../BaseCommand");
const Errors = require("../errors");
const { getSubdomainsList } = require("../SubdomainCrawler");
const {  generateSubdomainsGraph } = require("../SubdomainsGraph");
const { getCrawlTree } = require("../PageCrawler");

class CrawlerCommand extends Command {
    async run() {
        const { args, flags } = this.parse(CrawlerCommand);

        const { depth, noCrawlingCache, graph } = flags;
        const { domain } = args;

        const subdomains_list = await getSubdomainsList(domain);

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
    timeout: Flags.timeout,
    verbose: Flags.verbose,
    depth: Flags.depth,
    noCrawlingCache: Flags.noCrawlingCache,
    graph: Flags.graph,
};

module.exports = CrawlerCommand;
