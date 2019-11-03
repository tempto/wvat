const { Command } = require("@oclif/command");
const { getWebpageTechnologies } = require("../TechAnalyzer");

class AnalyzeCommand extends Command {
    async run() {
        const { args } = this.parse(AnalyzeCommand);

        try {
            const tech = await getWebpageTechnologies(args.url);
            this.log(tech);
        } catch (err) {
            this.log(err.message);
        }
    }
}

AnalyzeCommand.description = "Analyzes a given webpage and displays its technologies";

AnalyzeCommand.args = [
    {
        name: "url",
        required: true,
        description: "Webpage URL",
        hidden: false,
    },
];

module.exports = AnalyzeCommand;
