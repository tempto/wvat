const Logger = require("./Logger");
const ascii = require("asciiart-logo");
const { name, version } = require("../package.json");
const commands = ["crawl", "cves", "error-codes", "exploits", "inspect", "update-cve-cache", "whois"];

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

    const command = require(`./commands/${commandKey}`);

    const asciiResult = { ...header };

    asciiResult
        .emptyLine()
        .center(commandKey);

    if (command.description)
        asciiResult
            .emptyLine()
            .emptyLine()
            .left("Description:")
            .emptyLine()
            .left(command.description)
            .emptyLine();

    if (command.args) {
        asciiResult
            .emptyLine()
            .left("Arguments:")
            .emptyLine();

        for (let i = 0; i < command.args.length; i++)
            asciiResult
                .left(`${command.args[i].name}: ${command.args[i].description}`)
                .emptyLine();
    }

    if (command.flags) {
        asciiResult
            .emptyLine()
            .left("Flags:")
            .emptyLine();

        for (const flag of Object.keys(command.flags))
            asciiResult
                .left(`${flag} (--${command.flags[flag].char}): ${command.flags[flag].description}`)
                .emptyLine();
    }

    if (command.examples) {
        asciiResult
            .emptyLine()
            .left("Examples:")
            .emptyLine();

        for (let i = 0; i < command.examples.length; i++)
            asciiResult
                .left(command.examples[i])
                .emptyLine();
    }

    Logger.print(asciiResult.render());
};

const aboutError = () => {
    Logger.error("Error: Invalid command, please use a wvat command");

    for (let i = 0; i < commands.length; i++){
        const command = require(`./commands/${commands[i]}`);
        Logger.print(`${commands[i].padEnd(16)}  ${command.description}`);
    }
};

module.exports = {
    aboutWVAT,
    aboutCommand,
    aboutError,
    commands,
};

