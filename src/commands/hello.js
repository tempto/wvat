const {Command, flags} = require('@oclif/command')
//Import verbose flag from flags file
const verbose = require('../flags.js').verbose
//Import common initialization command from file
const initCommand = require('../initCommand');

class HelloCommand extends Command {
  async run() {
    const {flags} = this.parse(HelloCommand)
    const name = flags.name || 'world'
    this.log(`hello ${name} from ./src/commands/hello.js`)

    //Loads config and log objects from the common initCommand
    const [Config, Log] = initCommand(flags);

    console.log("these are the config flags:", Config.flags)

    Log.warn("This is a warning only showing in verbose mode!")
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
