const {Command, flags} = require('@oclif/command')

class HelloCommand extends Command {
  async run() {
    const {flags} = this.parse(HelloCommand)
    const name = flags.name || 'world'
    this.log(`hello ${name} from ./src/commands/hello.js`)
    
    //Set flags to Config, so that they can be accessed from other modules
    Config.addFlags(flags)
    console.log("these are the config flags:", Config.flags)

    //Prints message only if in verbose mode
    if(Config.verboseMode) console.log("Verbose mode activated!");
  }
}

HelloCommand.description = `Describe the command here
...
Extra documentation goes here
`

HelloCommand.flags = {
  name: flags.string({char: 'n', description: 'name to print'}),
}

module.exports = HelloCommand
