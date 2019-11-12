const Flags = require("../flags");
const BaseCommand = require("../BaseCommand");
const Errors = require("../errors");

class CrawlerCommand extends BaseCommand {
    async run() {
        const { args, flags } = this.parse(CrawlerCommand);
        const [, Log] = require("../initCommand")(flags);
        const domain = args.domain;
        const { depth, noCache } = flags;
        const { getPagesList } = require("../PageCrawler");
        const domain_list = await getPagesList(domain, depth, noCache);
        if (domain_list.length) Log.info(domain_list);
        else {
            Log.error(Errors.NO_SUBDOMAINS_FOUND.description);
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
    noCache: Flags.noCache,
};

module.exports = CrawlerCommand;
