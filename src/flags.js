const { flags } = require("@oclif/command");

/**
 * Flags constant object used to describe all of the app's configuration flags
 */
const Flags = Object.freeze({
    timeout: flags.string({
        char: "t",
        description: "Maximum application execution time (in seconds)",
    }),
    verbose: flags.boolean({
        char: "v",
        description: "Verbose Mode (outputs all messages to screen)",
        default: false,
    }),
});

module.exports = Flags;
