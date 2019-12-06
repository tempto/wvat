const fs = require("fs");
const Mustache = require("mustache");
const Logger = require("../Logger");
const template = "";
const { now } = require("../utils");

/**
 * Counts the number of CVEs per subdomain page, to present in the HTML structure
 * @param {Object} report_data Final JSON report
 */
const countCVEsPerPage = (report_data) => {
    for (const subdomain of report_data.subdomains) {
        for (const page of subdomain.pages) {
            page.num_cves = page.technologies.reduce((prev, curr) => prev + curr.cves.length, 0);
        }
    }
};

/**
 * Renders the final HTML report, using the Mustache template
 * @param  {Object} report_data Final JSON report
 * @throws {Error} Missing report data
 * @return {string} Final HTML report
 */
const buildHTMLReport = (report_data) => {
    if (!report_data) throw new Error("Missing report data");
    countCVEsPerPage(report_data);
    return Mustache.render(template, report_data);
};

/**
 * Saves the rendered HTML report into a file
 * @param  {[type]} html_data Final HTML report
 * @param  {[type]} date Report date of creation
 * @throws {Error} Missing HTML data
 * @throws {Error} Missing date
 */
const exportHTMLReport = (html_data) => {
    if (!html_data) throw new Error("Missing HTML data");
    const date = now();

    try {
        fs.writeFileSync(`security_analysis_report_${date}.html`, html_data);
    } catch (e) {
        Logger.error(`Error saving file: security_analysis_report_${date}.html`);
    }
};

module.exports = {
    buildHTMLReport, exportHTMLReport,
};
