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
    noCrawlingCache: flags.boolean({
        char: "n",
        description: "crawl with no cache",
        default: false,
    }),
    noCveCache: flags.boolean({
        char: "j",
        description: "Search without using local CVE cache",
        default: false,
    }),
    updateCveCache: flags.boolean({
        char: "u",
        description: "Force update the local CVE cache",
        default: false,
    }),
    graph: flags.boolean({
        char: "g",
        description: "Generate a graph of subdomains",
        default: false,
    }),
});

module.exports = Flags;
