const TechAnalyser = require("../TechAnalyser");
const { isValidURL } = require("../utils");
const puppeteer = require("puppeteer");
const cheerio = require("cheerio");

class ToolbarNetcraft extends TechAnalyser {
    /**
     * Gets the url of the toolbar.netcraft site report page for a given webpage url
     * @param {string} url Webpage url
     * @throws {Error} Missing url
     * @returns {string} Hyperlink to CVEs list
     */
    static getSiteReportPageUrl(url) {
        if (!url) throw new Error("Missing url");

        return `https://toolbar.netcraft.com/site_report?url=${encodeURI(url)}`;
    }

    /**
     * Analyses webpage technologies using toolbar.netcraft
     * @param {String} url Webpage url
     * @throws {Error} Missing url
     * @throws {Error} Could not access toolbar.netcraft report webpage
     * @returns {Array} toolbar.netcraft analysis results
     */
    static async analyseWebPage(url) {
        if (!url) throw new Error("Missing url");

        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(this.getSiteReportPageUrl(url));

        const content = await page.evaluate(() => document.body.innerHTML);

        await browser.close();

        return content;
    }

    /**
     * Parses toolbar.netcraft report page
     * @param {String} page toolbar.netcraft report page HTML
     * @throws {Error} Missing page HTML
     * @returns {Array} Array with found technologies
     */
    static parseAnalysisResults(page) {
        if (!page) throw new Error("Missing page");

        const $ = cheerio.load(page);
        const tech = [];
        $(".technology_label").each((i, elem) => {
            tech.push({
                name: elem.firstChild.data.trim(),
                version: null,
            });
        });

        return tech;
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

        const tech = await this.analyseWebPage(url);
        return this.parseAnalysisResults(tech);
    }
}

module.exports = ToolbarNetcraft;
