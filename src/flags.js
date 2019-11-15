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
    depth: flags.string({
        char: "d",
        description: "crawling depth",
        default: 2,
    }),
    noCache: flags.boolean({
        char: "ncrc",
        description: "crawl with no cache",
        default: false,
    }),
    "no-cve-cache": flags.boolean({
        char: "ncc",
        description: "Search without using local CVE cache",
        default: false,
    }),
    "update-cve-cache": flags.boolean({
        char: "ucc",
        description: "Force update the local CVE cache",
        default: false,
    }),
});

module.exports = Flags;
