const Command = require("../BaseCommand");
const { getCVEList } = require("../CVEListFetcher");

class CVECommand extends Command {
    async run() {
        const { args } = this.parse(CVECommand);
        const technology = args.technology;

        const cve_list = await getCVEList(technology);

        this.log(cve_list);
    }
}

CVECommand.description = "Searches CVEs for a given technology";

CVECommand.args = [
    {
        name: "technology",
        required: true,
        description: "technology to search CVEs",
        hidden: false,
    },
];

module.exports = CVECommand;
