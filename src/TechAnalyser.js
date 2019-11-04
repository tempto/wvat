const Wappalyzer = require("wappalyzer");
const { isValidURL } = require("./utils");

/**
 * Analyses webpage technologies using Wappalyzer
 * @param {string} url Webpage url
 * @returns {Array} Wappalyzer analysis results
 */
const analyseWebPage = async (url) => {
    const wapp = new Wappalyzer(url);
    const res = await wapp.analyze();

    return res;
};

/**
 * Parses webpage url technologies analysis results
 * @param {string} url Webpage url
 * @param {Array} tech Technology array from analyseWebPage array following this format
 * @returns {Array} Array with found technologies
 */
const parseAnalysisResults = (url, tech) => {
    if (tech.urls[url].status !== 200) throw new Error("Could not access webpage");

    return tech.applications;
};

/**
 * Obtains webpage technologies
 * @param {string} url Webpage url
 * @throws {Error} Missing webpage url
 * @throws {Error} Invalid url
 * @returns {Array} Webpage technologies
 */
const getWebpageTechnologies = async (url) => {
    if (!url) throw new Error("Missing Webpage url");
    if (!isValidURL(url)) throw new Error("Invalid url");

    const fixed_url = url + (url.endsWith("/") ? "" : "/");

    const tech = await analyseWebPage(fixed_url);
    return parseAnalysisResults(fixed_url, tech);
};

/**
 * Counts technologies with no version
 * @param {Array} tech Array with technologies
 * @throws {Error} Missing technologies
 * @returns {Number} Technologies with no version count
 */
const noVersionCount = (tech) => {
    if (!tech) throw new Error("Missing technologies");
    return tech.reduce((count, currElem) => count + (currElem.version === null ? 1 : 0), 0);
};

module.exports = {
    getWebpageTechnologies,
    parseAnalysisResults,
    noVersionCount,
};
