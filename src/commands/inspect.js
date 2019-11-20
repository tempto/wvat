const Flags = require("../flags");
const Logger = require("../Logger");
const Command = require("../BaseCommand");
const { getWebpageTechnologies, noVersionCount } = require("../TechAnalyser");

class InspectCommand extends Command {
    async run() {
        const { args, flags } = this.parse(InspectCommand);
        this.setup(flags);

        try {
            const tech = await getWebpageTechnologies(args.url);
            Logger.print(tech);
            Logger.print(`Technologies without version: ${noVersionCount(tech)}/${tech.length}`);
            process.exit(0);
        } catch (err) {
            Logger.error(err.message);
            process.exit(-1);
        }
    }
}

InspectCommand.description = "Analyses a given webpage and displays its technologies";

InspectCommand.args = [
    {
        name: "url",
        required: true,
        description: "Webpage URL",
        hidden: false,
    },
];

InspectCommand.flags = {};

InspectCommand.flags = {
    timeout: Flags.timeout,
    verbose: Flags.verbose,
};

module.exports = InspectCommand;
