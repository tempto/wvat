const Flags = require("../flags");
const Logger = require("../Logger");
const BaseCommand = require("../BaseCommand");
const Errors = require("../errors");

class CrawlerCommand extends BaseCommand {
    async run() {
        const { args, flags } = this.parse(CrawlerCommand);
        this.setup(flags);

        const domain = args.domain;
        const { depth, noCrawlingCache } = flags;
        const { getPagesList } = require("../PageCrawler");
        const domain_list = await getPagesList(domain, depth, noCrawlingCache);

        if (domain_list.length) {
            Logger.print(JSON.stringify(domain_list, null, 2));
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
