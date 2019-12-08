const Command = require("../BaseCommand");
const Logger = require("../Logger");
const { aboutWVAT, aboutCommand, commands } = require("../about");

class AboutCommand extends Command {
    run() {
        const { args } = this.parse(AboutCommand);

        if (!args.command)
            aboutWVAT();
        else if (commands.hasOwnProperty(args.command))
            aboutCommand(args.command);
        else
            Logger.error("Error: Invalid command, please use a wvat command (crawl, whois,...).");
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
