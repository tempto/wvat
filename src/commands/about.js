const Command = require("../BaseCommand");
const { aboutWVAT, aboutCommand, aboutError, commands } = require("../about");

class AboutCommand extends Command {
    async run() {
        const { args } = await this.parse(AboutCommand);

        if (!args.command)
            aboutWVAT();
        else if (commands.includes(args.command))
            aboutCommand(args.command);
        else
            aboutError();
    }
}

AboutCommand.description = "Describes WVAT and its functionalities";

AboutCommand.args = [
    {
        name: "command",
        required: false,
        description: "name of the command to obtain its description, args, flags and examples",
        hidden: false,
    },
];

AboutCommand.examples  = [
    "about",
    "about whois",
];

module.exports = AboutCommand;

