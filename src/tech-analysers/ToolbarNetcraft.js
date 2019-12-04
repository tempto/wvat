const TechAnalyser = require("../TechAnalyser");
const puppeteer = require("puppeteer");

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
}

module.exports = ToolbarNetcraft;
