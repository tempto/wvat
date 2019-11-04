const { Command } = require("@oclif/command");
const Flags = require("../flags");
const { getDomainList } = require("../DomainCrawler");

class CrawlerCommand extends Command {
    async run() {
        const { args, flags } = this.parse(CrawlerCommand);
        const domain = args.domain;
        const depth = flags.depth;

        const domain_list = await getDomainList(domain, depth);

        this.log(domain_list);
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
    depth: Flags.depth,
};

module.exports = CrawlerCommand;
