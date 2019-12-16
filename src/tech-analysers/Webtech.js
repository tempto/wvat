const TechAnalyser = require("../TechAnalyser");
const spawn = require("await-spawn");
const { isValidURL, addURLEndSlash } = require("../utils");
const Config = require("../Config");

const isCustomHeadersEntry = (line) => (
    line.indexOf("Detected the following interesting custom header") >= 0
);

class Webtech extends TechAnalyser {
    /**
     * Analyses webpage technologies using Webtech
     * @param {string} url Webpage url
     * @throws {Error} Could not access webpage
     * @returns {Array} Webtech analysis results
     */
    static async analyseWebPage(url) {
        const tech = await spawn(Config.tool_config.webtech_command, ["--urls", url]);
        return tech.toString();
    }

    /**
     * Parses Webtech results output
     * @param {string} tech Webtech command output
     * @returns {Array} Array with found technologies
     */
    static parseAnalysisResults(tech) {
        const lines = tech.split(/(\r?\n)/g);
        const techs = [];

        for (let i = 4; i < lines.length; i++) {
            if (lines[i].length < 4) continue;
            if (isCustomHeadersEntry(lines[i])) break;

            techs.push(lines[i].slice(3, -1));
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
     * @throws {Error} Webtech disabled
     * @returns {Array} Webpage technologies
     */
    static async getWebpageTechnologies(url) {
        if (!url) throw new Error("Missing Webpage url");
        if (!isValidURL(url)) throw new Error("Invalid url");
        if (!Config.tool_config.webtech_command) throw Error ("Webtech disabled");

        const fixed_url = addURLEndSlash(url);

        const tech = await this.analyseWebPage(fixed_url);
        return this.parseAnalysisResults(tech);
    }
}

module.exports = Webtech;
