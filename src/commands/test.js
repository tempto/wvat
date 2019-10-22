const { Command, flags } = require("@oclif/command");
const Config = require("../Config");
const Errors = require("../errors");

class TestCommand extends Command {
    run() {
        const { flags } = this.parse(TestCommand);

        this.log("Command test ran with flags:");
        Config.addFlags(flags);
        this.log(Config.flags);

        this.error(Errors.TEST.description, { exit: Errors.TEST.code });
    }
}

TestCommand.description = "Test commmand description";

TestCommand.flags = {
    test1: flags.string({ char: "n", description: "test flag 1" }),
    test2: flags.string({ char: "t", description: "test flag 2" }),
};

TestCommand.flags.test1 = flags.string({ char: "n", description: "test flag 1" });
TestCommand.flags.test2 = flags.string({ char: "r", description: "test flag 2" });

module.exports = TestCommand;
