const Flags = require("../flags");
const Command = require("../BaseCommand");
const { flags } = require("@oclif/command");
const Logger = require("../Logger");
const Config = require("../Config");

class TestCommand extends Command {
    run() {
        this.parse(TestCommand);

        Logger.print(`Current logger mode: ${Logger.getLoggerMode()}\n`);

        Logger.print(`Configuration object:\n${JSON.stringify(Config, null, 2)}\n`);

        Logger.print("Non-verbose Message!");
        Logger.print("Verbose Message!", true);
    }
}

TestCommand.description = "Test commmand description";

TestCommand.flags = {
    timeout: Flags.timeout,
    verbose: Flags.verbose,
    test1: flags.string({ char: "n", description: "test flag 1" }),
    test2: flags.string({ char: "r", description: "test flag 2" }),
};

module.exports = TestCommand;
