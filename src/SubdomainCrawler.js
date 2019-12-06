const fs = require("fs");
const { exec } = require("child_process");

const { isValidURL, extractDomainFromUrl, isUrlFromDomain } = require("./utils");

const Logger = require("./Logger");
const Config = require("./Config");

const DEFAULT_TIMEOUT_SECONDS = 30;

/**
 * @typedef {Object} OptionsObject
 * @property {number} timeout - Max crawling time, in secondss
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

    const cmd = `${Config.tool_config.amass_path} enum -d ${extractDomainFromUrl(domain)} -o ./amass-output `;

    const timeout = (!options || !options.timeout) ? DEFAULT_TIMEOUT_SECONDS : options.timeout;

    Logger.print(`Calling Amass to fetch ${domain} with timeout = ${timeout} second${timeout > 1 ? "s" : ""}`, true);

    const amass = exec(cmd, {
        timeout: 1000 * timeout,
    });

    amass.stdout.on("data", (data) => {
        if (data.includes("No names were discovered")) {
            resolve([]);
            return;
        }
        Logger.print(`Amass found subdomain(s): ${data}`, true);
    });

    amass.on("close", () => {
        resolve(getSubdomainsFromFile());
    });
});

const getSubdomainsFromFile = () => {
    const fileDataTxt = fs.readFileSync("./amass-output", "utf-8");
    // Using slice because the last element is an empty string
    const subdomains = fileDataTxt.split("\n").slice(0, -1);

    if (subdomains.length === 0) {
        Logger.warning("No subdomains were found.");
    }

    return subdomains;
};

const getCompatibleWhitelistedSubdomains = (whitelist_file, domain) => {

    try {
        fs.statSync(whitelist_file);
        const subdomains = fs.readFileSync(whitelist_file, "utf-8").split("\n");
        return subdomains.filter((e) => isUrlFromDomain(e, domain));
    } catch (e) {
        throw new Error(`File ${whitelist_file} not found.`);
    }

};

module.exports = {
    getSubdomainsList,
    getCompatibleWhitelistedSubdomains,
};
