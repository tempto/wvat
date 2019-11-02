const Wappalyzer = require("wappalyzer");
const { isValidURL } = require("../src/utils");

const analyseWebPage = async (url) => {
    const wapp = new Wappalyzer(url);
    const res = await wapp.analyze();

    return res;
};

const parseAnalysisResults = (url, tech) => {
    if (tech.urls[url].status !== 200) throw new Error("Could not access webpage");

    return tech.applications;
};

const getWebpageTechnologies = async (url) => {
    if (!url) throw new Error("Missing Webpage url");
    if (!isValidURL(url)) throw new Error("Invalid url");

    const fixed_url = url + (url.endsWith("/") ? "" : "/");

    const tech = await analyseWebPage(fixed_url);
    return parseAnalysisResults(fixed_url, tech);
};

module.exports = {
    getWebpageTechnologies,
    parseAnalysisResults,
};
