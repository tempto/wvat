const Wappalyzer = require("wappalyzer");

const isValidURL = (url) => /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/.test(url);

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

    let fixedURL = url;

    if (!url.endsWith("/"))
        fixedURL += "/";

    const tech = await analyseWebPage(fixedURL);
    return parseAnalysisResults(fixedURL, tech);
};

module.exports = {
    getWebpageTechnologies,
};
