const Flags = require("../flags");
const Logger = require("../Logger");
const Command = require("../BaseCommand");
const Errors = require("../errors");

class CrawlerCommand extends Command {
    async run() {
        const { args, flags } = this.parse(CrawlerCommand);

        const { depth, noCrawlingCache } = flags;
        const { domain } = args;

        const { getSubdomainsList } = require("../SubdomainCrawler");
        const subdomains_list = await getSubdomainsList(domain);

        const { getPagesList } = require("../PageCrawler");

        const crawl_tree = {};

        await Promise.all(subdomains_list.map(async (subdomain, i) => {
            Logger.info(`${i}Fetching pages for subdomain ${subdomain}`);
            const pages_list = await getPagesList(`https://${domain}`, depth, noCrawlingCache);
            crawl_tree[subdomain] = pages_list ? pages_list : [];
        }));

        if (subdomains_list.length) {
            Logger.print(JSON.stringify(subdomains_list, null, 2));
        } else {
            Logger.error(Errors.NO_SUBDOMAINS_FOUND.description);
            process.exit(Errors.NO_SUBDOMAINS_FOUND.code);
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
};

module.exports = CrawlerCommand;
