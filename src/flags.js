const { flags } = require("@oclif/command");

const Flags = Object.freeze({
    timeout: flags.string({
        char: "t",
        description: "Maximum application execution time (in seconds)",
    }),
});

module.exports = Flags;
