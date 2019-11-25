const TechAnalyser = require("../TechAnalyser");
const Wappalyzer = require("wappalyzer");
const { isValidURL, addURLEndSlash } = require("../utils");

class Wappalyser extends TechAnalyser {
    /**
     * Analyses webpage technologies using Wappalyzer
     * @param {string} url Webpage url
     * @returns {Array} Wappalyzer analysis results
     */
    static async analyseWebPage(url) {
        const wapp = new Wappalyzer(url);
        const res = await wapp.analyze();

        return res;
    }

    /**
     * Parses webpage url technologies analysis results
     * @param {string} url Webpage url
     * @param {Array} tech Technology array from analyseWebPage array following this format
     * @throws {Error} Could not access webpage
     * @returns {Array} Array with found technologies
     */
    static parseAnalysisResults(url, tech) {
        if (tech.urls[url].status !== 200) throw new Error("Could not access webpage");

        return tech.applications.map(({ name, version }) => ({
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
}

module.exports = Wappalyser;
