const Logger = require("./Logger");
const ascii = require("asciiart-logo");
const { name, version } = require("../package.json");
const commands = {
    "crawl": require("./commands/crawl"),
    "cves": require("./commands/cves"),
    "error-codes": require("./commands/error-codes"),
    "exploits": require("./commands/exploits"),
    "inspect": require("./commands/inspect"),
    "update-cve-cache": require("./commands/update-cve-cache"),
    "whois": require("./commands/whois"),
};

/**
 * String literals used to print to the terminal on the about command
 */
const about = Object.freeze({
    description: "WVAT is a tool that analyses a domain for its endpoints, technologies used and its corresponding CVE and exploits",
});

/**
 * Main ASCII header for the about command
 */
const header = Object.freeze(
    ascii({
        name: name,
        font: "Big",
        lineChars: 4,
        padding: 5,
        margin: 2,
        borderColor: "grey",
        logoColor: "bold-green",
        textColor: "bold-green",
    })
        .emptyLine()
        .right(`version ${version}`),
);

/**
 * Prints to the terminal key information about WVAT including its version and description
 */
const aboutWVAT = () => {
    Logger.print(header
        .emptyLine()
        .center(about.description)
        .render());
};

/**
 * Prints to the terminal key information about a specified WVAT's command
 * @param {string} commandKey
 * @throws {Error} Missing command key
 */
const aboutCommand = (commandKey) => {
    if (!commandKey) throw new Error("Missing command key");

    const asciiResult = { ...header };

    asciiResult
        .emptyLine()
        .center(commandKey);

    if (commands[commandKey].description)
        asciiResult
            .emptyLine()
            .emptyLine()
            .left("Description:")
            .emptyLine()
            .left(commands[commandKey].description)
            .emptyLine();

    if (commands[commandKey].args) {
        asciiResult
            .emptyLine()
            .left("Arguments:")
            .emptyLine();

        for (let i = 0; i < commands[commandKey].args.length; i++)
            asciiResult
                .left(`${commands[commandKey].args[i].name}: ${commands[commandKey].args[i].description}`)
                .emptyLine();
    }

    if (commands[commandKey].flags) {
        asciiResult
            .emptyLine()
            .left("Flags:")
            .emptyLine();

        for (const flag of Object.keys(commands[commandKey].flags))
            asciiResult
                .left(`${flag} (--${commands[commandKey].flags[flag].char}): ${commands[commandKey].flags[flag].description}`)
                .emptyLine();
    }

    if (commands[commandKey].examples) {
        asciiResult
            .emptyLine()
            .left("Examples:")
            .emptyLine();

        for (let i = 0; i < commands[commandKey].examples.length; i++)
            asciiResult
                .left(commands[commandKey].examples[i])
                .emptyLine();
    }

    Logger.print(asciiResult.render());
};

const aboutError = () => {
    Logger.error("Error: Invalid command, please use a wvat command");

    for (const key of Object.keys(commands))
        Logger.print(`${key.padEnd(16)}  ${commands[key].description}`);
};

module.exports = {
    aboutWVAT,
    aboutCommand,
    aboutError,
    commands,
};
