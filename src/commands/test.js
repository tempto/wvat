const Flags = require("../flags");
const Errors = require("../errors");
const Command = require("../BaseCommand");
const { flags } = require("@oclif/command");

class TestCommand extends Command {
    run() {
        const { flags } = this.parse(TestCommand);

        const [Config, Log] = require("../initCommand")(flags);

        this.log("Command test ran with flags:");
        this.log(Config.flags);

        Log.warn("Verbose mode activated!");

        this.error(Errors.TEST.description, { exit: Errors.TEST.code });
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
