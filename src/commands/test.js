const {Command, flags} = require('@oclif/command')

class TestCommand extends Command {
  async run() {
    const {flags} = this.parse(TestCommand)
    
    this.log("Command test ran with arguments:")
    for (const flag in flags) {
        const flagValue = flags[flag];
        this.log(flag, "with value:", flagValue)
    }
  }
}

TestCommand.description = `Test commmand description`

TestCommand.flags = {
  test1: flags.string({char: 'n', description: 'test flag 1'}),
  test2: flags.string({char: 't', description: 'test flag 2'}),
}

module.exports = TestCommand
