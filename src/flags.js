const {flags} = require('@oclif/command')

const Flags = {
  VERBOSE: flags.boolean({
    char: 'v',
    description: 'Verbose Mode (outputs all messages to screen)',
    default: false
  })
}

module.exports = Flags
