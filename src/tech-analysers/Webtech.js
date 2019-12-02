const TechAnalyser = require("../TechAnalyser");
const spawn = require("await-spawn");
const { isValidURL, addURLEndSlash } = require("../utils");

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
     * Parses webpage url technologies analysis results
     * @param {string} url Webpage url
     * @param {Array} tech Technology array from analyseWebPage array following this format
     * @returns {Array} Array with found technologies
     */
    static parseAnalysisResults(url, tech) {
        const str = tech.toString(), lines = str.split(/(\r?\n)/g);
        const techs = [];
        for (let i = 4; i < lines.length; i += 2) {
            if (lines[i] !== "") {
                techs.push(lines[i].slice(3, -1));
            }
        }

        const version = null;

        return techs.map((name) => ({
            name,
            version,
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

    static getBinaryFile() {
        let slash = "/";
        const path = `.${slash}bin${slash}webtech${slash}`;
        switch (process.platform) {
            case "win32":
                slash = "\\";
                return `${path}webtech-windows.exe`;
            case "linux":
                return `${path}webtech-linux`;
            case "darwin":
                return `${path}webtech-macos`;
            default:
                throw Error("Unsopported OS");
        }
    }
}

module.exports = Webtech;
