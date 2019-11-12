const Flags = require("../flags");
const { Command } = require("@oclif/command");
const { getDomainList } = require("../DomainCrawler");

class CrawlerCommand extends Command {
    async run() {
        const { args, flags } = this.parse(CrawlerCommand);
        const [, Log] = require("../initCommand")(flags);
        const domain = args.domain;
        const depth = flags.depth;
        const noCache = flags.noCache;

        const domain_list = await getDomainList(domain, depth, noCache);

        Log.info(domain_list);
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
