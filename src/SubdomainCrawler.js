const commandExists = require("command-exists");
const fs = require("fs");
const exec = require("child_process").exec;

const isValidURL = require("./utils").isValidURL;
const Logger = require("./Logger");
const Config = require("./Config");

const Log = new Logger(Config.flags).getLog();

const checkGo = () => {
    commandExists("go")
        .catch(() => {
            throw new Error("Golang not found. It is required for this tool to work");
        });
};

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

    let cmd = `./amass enum -d ${domain} -o amass-output -json amass-output.json `;

    let timeout;
    if (!options || !options.timeout) timeout = DEFAULT_TIMEOUT_MINS;
    else timeout = options.timeout;

    cmd += `-timeout ${timeout} `;
    const amass = exec(cmd);

    amass.stdout.on("data", (data) => {
        Log.info(`AMASS: ${data}`);
    });
    amass.stderr.on("data", (data) => {
        Log.error(`AMASS: ${data}`);
    });

    amass.on("close", () => {
        const fileDataTxt = fs.readFileSync("../bin/amass-output", "utf-8");
        // Using splice because the last element is an empty string
        const subdomains = fileDataTxt.split("\n").slice(0, -1);

        Log.info(`Found the following subdomains for domain ${domain}:`);
        Log.info(subdomains);

        resolve(subdomains);

        // console.log("Extra-info");
        // const fileData = fs.readFileSync("amass-output.json", "utf-8");
        // console.log(fileData.split("\n").slice(0, -1).map(JSON.parse));
    });
});

module.exports = {
    getSubdomainsList,
};
