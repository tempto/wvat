const { Command, flags } = require("@oclif/command");
const Flags = require("../flags");
const Errors = require("../errors");

class TestCommand extends Command {
    run() {
        const { flags } = this.parse(TestCommand);

        const Config = require("../initCommand")(flags);

        this.log("Command test ran with flags:");
        this.log(Config.flags);

        this.error(Errors.TEST.description, { exit: Errors.TEST.code });
    }
}

TestCommand.description = "Test commmand description";

TestCommand.flags = {
    timeout: Flags.timeout,
    test1: flags.string({ char: "n", description: "test flag 1" }),
    test2: flags.string({ char: "r", description: "test flag 2" }),
};

module.exports = TestCommand;
