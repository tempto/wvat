const Flags = require("../flags");
const Logger = require("../Logger");
const Command = require("../BaseCommand");
const TechAnalyser = require("../TechAnalyser");

class InspectCommand extends Command {
    async run() {
        const { args } = this.parse(InspectCommand);

        try {
            const tech = await TechAnalyser.findWebPageTechnologies(args.url);
            Logger.print(JSON.stringify(tech, null, 2));
            Logger.print(`Technologies without version: ${TechAnalyser.noVersionCount(tech)}/${tech.length}`);
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
