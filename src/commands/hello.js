const { Command, flags } = require("@oclif/command");
// Import Config singleton object
const Config = require("../Config");

class HelloCommand extends Command {
    run() {
        const { flags } = this.parse(HelloCommand);
        const name = flags.name || "world";
        this.log(`hello ${name} from ./src/commands/hello.js`);

        // Set flags to Config, so that they can be accessed from other modules
        Config.addFlags(flags);
    }
}

HelloCommand.description = `Describe the command here
...
Extra documentation goes here
`;

HelloCommand.flags = {
    name: flags.string({ char: "n", description: "name to print" }),
};

module.exports = HelloCommand;