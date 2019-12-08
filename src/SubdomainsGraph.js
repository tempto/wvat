const fs = require("fs");
const { exec } = require("child_process");

const { extractDomainFromUrl, now } = require("./utils");
const Logger = require("./Logger");
const Config = require("./Config");

/**
 * Renames the generated graph file
 * @param {*} domain target domain
 */
const renameGraphFile = (domain) => {
    fs.rename("./amass_d3.html", `./${domain}_${now()}_graph.html`, (err) => {
        if (err) throw err;
    });
};

/**
 * @param {String} domain url for the domain to lookup
 */
const generateSubdomainsGraph = (domain) => {

    const domain_name = extractDomainFromUrl(domain);

    const cmd = `${Config.tool_config.amass_path} viz -d3 -d ${domain_name}`;

    Logger.print(`Generate subdomains graph from domain ${domain}`);
    const amass = exec(cmd);

    amass.stdout.on("data", (data) => {
        Logger.print(`AMASS_LOG: ${data}`, true);
    });

    amass.on("close", (exit_code) => {
        if (exit_code !== 0) {
            throw new Error("There was a problem trying to generate subdomains graph");
        } else {
            renameGraphFile(domain_name);
            Logger.print(`${domain_name}'s subdomain graph successfully generated`);
        }
    });
};

module.exports = {
    generateSubdomainsGraph,
};
