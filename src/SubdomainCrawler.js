const fs = require("fs");
const { exec } = require("child_process");

const { isValidURL, extractDomainFromUrl } = require("./utils");
const Logger = require("./Logger");
const Config = require("./Config");

const DEFAULT_TIMEOUT_MINS = 1;

/**
 * @typedef {Object} OptionsObject
 * @property {number} timeout - Max crawling time, in minutes
 * @param {String} domain url for the domain to lookup
 * @param {OptionsObject} options [optional] options object
 */
const getSubdomainsList = (domain, options) => new Promise((resolve, reject) => {

    if (!isValidURL(domain)) {
        reject(new Error("Invalid domain format, please use a valid URL."));
    }

    if (!fs.existsSync(`${Config.tool_config.amass_path}`)) {
        reject(new Error("Amass not found"));
    }

    let cmd = `${Config.tool_config.amass_path} enum -d ${extractDomainFromUrl(domain)} -o ./amass-output `;

    const timeout = (!options || !options.timeout) ? DEFAULT_TIMEOUT_MINS : options.timeout;

    cmd += `-timeout ${timeout} `;

    Logger.print(`Calling Amass to fetch ${domain} with timeout = ${timeout}m`);
    const amass = exec(cmd);

    amass.stdout.on("data", (data) => {
        Logger.print(`AMASS_LOG: ${data}`, true);
    });

    amass.on("close", (exit_code) => {
        if (exit_code !== 0) {
            reject(new Error("There was a problem trying to fetch subdomains"));
        } else {
            const fileDataTxt = fs.readFileSync("./amass-output", "utf-8");
            // Using slice because the last element is an empty string
            const subdomains = fileDataTxt.split("\n").slice(0, -1);

            Logger.print(`Found the following subdomains for domain ${domain}:`, true);
            Logger.print(subdomains, true);

            resolve(subdomains);
        }
    });

});

module.exports = {
    getSubdomainsList,
};
