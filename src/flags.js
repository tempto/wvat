const { flags } = require("@oclif/command");

/**
 * Flags constant object used to describe all of the app's configuration flags
 */
const Flags = Object.freeze({
    global: {
        timeout: flags.string({
            char: "t",
            description: "Maximum application execution time (in seconds)",
        }),
        verbose: flags.boolean({
            char: "v",
            description: "Verbose Mode (outputs all messages to screen)",
            default: false,
        }),
        config: flags.string({
            char: "c",
            description: `Wvat config json file path
Imports a json file with the following fields:
    "allow_data_reporting"[default: false] - Allows us to collect information on error
    "webtech_command"[default: null] - How to call webtech
    "amass_path"[default: "bin/amass"] - path to amass executable
        `,
            default: null,
        }),
    },
    crawlingTimeout: flags.string({
        char: "k",
        description: "Subdomains crawling timeout",
    }),
    depth: flags.string({
        char: "d",
        description: "Maximum page crawling depth",
        default: 2,
    }),
    noCrawlingCache: flags.boolean({
        char: "n",
        description: "Perform page crawling without using cache",
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

    whitelist: flags.string({
        char: "w",
        description: "Text file with subdomains to analyze",
    }),
});

module.exports = Flags;
