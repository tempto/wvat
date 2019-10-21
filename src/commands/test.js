const { Command, flags } = require("@oclif/command");
const Config = require("../Config");

class TestCommand extends Command {
    run() {
        const { flags } = this.parse(TestCommand);

        this.log("Command test ran with flags:");
        Config.addFlags(flags);
        this.log(Config.flags);
    }
}

TestCommand.description = "Test commmand description";

TestCommand.flags = {
    test1: flags.string({ char: "n", description: "test flag 1" }),
    test2: flags.string({ char: "t", description: "test flag 2" }),
};

module.exports = TestCommand;
