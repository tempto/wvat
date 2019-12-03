const TechAnalyser = require("../TechAnalyser");
const spawn = require("await-spawn");
const { isValidURL, addURLEndSlash } = require("../utils");
const Config = require("../Config");
const fs = require("fs");
const Errors = require("../errors");

class Webtech extends TechAnalyser {
    /**
     * Analyses webpage technologies using Webtech
     * @param {string} url Webpage url
     * @throws {Error} Could not access webpage
     * @returns {Array} Webtech analysis results
     */
    static async analyseWebPage(url) {
        const tech = await spawn(Webtech.getBinaryFile(), ["--urls", url]);
        return tech.toString();
    }

    /**
     * Parses Webtech results output
     * @param {string} tech Webtech command output
     * @returns {Array} Array with found technologies
     */
    static parseAnalysisResults(tech) {
        const str = tech.toString(), lines = str.split(/(\r?\n)/g);
        const techs = [];
        for (let i = 4; i < lines.length; i += 2) {
            if (lines[i] !== "") {
                techs.push(lines[i].slice(3, -1));
            }
        }

        return techs.map((name) => ({
            name,
            version: null,
        }));
    }

    /**
     * Obtains webpage technologies
     * @param {string} url Webpage url
     * @throws {Error} Missing webpage url
     * @throws {Error} Invalid url
     * @returns {Array} Webpage technologies
     */
    static async getWebpageTechnologies(url) {
        if (!url) throw new Error("Missing Webpage url");
        if (!isValidURL(url)) throw new Error("Invalid url");

        const fixed_url = addURLEndSlash(url);

        const tech = await this.analyseWebPage(fixed_url);
        return this.parseAnalysisResults(fixed_url, tech);
    }

    /**
     * Gets the adequate binary file to the current OS
     * @returns {string} Path to adequate binary file
     */
    static getBinaryFile() {
        let path = Config.tool_config.webtech_path;

        if (process.platform === "win32") {
            path = path.replace(new RegExp("/", "g"), "\\");
            path = `${path}.exe`;
        }

        if (!fs.existsSync(path)) {
            throw new Error(`${Errors.BINARY_FILE_NOT_FOUND.description} (${path})`);
        }

        return path;
    }
}

module.exports = Webtech;
