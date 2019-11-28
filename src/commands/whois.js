const Command = require("../BaseCommand");
const Flags = require("../flags");
const Logger = require("../Logger");
const Errors = require("../errors");
const { getNetworkInfo } = require("../NetworkInfo");

class WhoisCommand extends Command {
    async run() {
        const { args } = this.parse(WhoisCommand);
        const { domain } = args;

        try {
            const network_info = await getNetworkInfo(domain);
            Logger.print(JSON.stringify(network_info, null, 2));
        } catch (e) {
            Logger.print(Errors.NETWORK.description);
            process.exit(Errors.NETWORK.code);
        }
    }
}

WhoisCommand.description = "Searches for network information for a given domain";

WhoisCommand.args = [
    {
        name: "domain",
        required: true,
        description: "domain to obtain network information",
        hidden: false,
    },
];

WhoisCommand.flags = {
    ...Flags,
};

WhoisCommand.examples  = [
    "whois google.com",
    "whois youtube.com --verbose",
];

module.exports = WhoisCommand;
