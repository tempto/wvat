const axios = require("axios");
const cheerio = require("cheerio");

/**
 * Gets the hyperlink of the CVEs list page for a given search query
 * @param {string} search_query Word(s) to search for CVEs
 * @throws {Error} Missing search query
 * @returns {string} Hyperlink to CVEs list
 */
const getCVEListPageUrl = (search_query) => {
    if (!search_query) throw new Error("Missing search query");

    return `https://cve.mitre.org/cgi-bin/cvekey.cgi?keyword=${encodeURI(search_query)}`;
};
/**
 * Parses a CVE from an input format to a numeric-type format
 * @param {string} raw_cve CVE in raw input format (e.g. CVE-2018-1234)
 * @throws {Error} Missing CVE string
 * @returns {string} Parsed CVE in numeric-type format (e.g. 2018-1234)
 */
const parseRawCVE = (raw_cve) => {
    if (!raw_cve) throw new Error("Missing CVE string");

    if (raw_cve.length < 3 || raw_cve.substr(0, 3) !== "CVE") throw new Error("Invalid CVE string");

    return raw_cve.substring(4);
};

/**
 * Fetches the CVE list page for a given search query
 * @param {string} search_query Word(s) to search for CVEs
 * @throws {Error} Missing search query
 * @returns {Promise} Promise resultant of fetching the CVEs list page
 */
const fetchCVEListPage = (search_query) => {
    if (!search_query) throw new Error("Missing search query");

    const page_url = getCVEListPageUrl(search_query);
    return axios.get(page_url);
};

/**
 * Scrapes a CVE list page to obtain all CVE codes present in the list
 * @param {string} page_data Page raw HTML
 * @throws {Error} Missing page data
 * @returns {Array} List of CVE codes
 */
const scrapePage = (page_data) => {
    if (!page_data) throw new Error("Missing page data");

    const $ = cheerio.load(page_data);
    const cve_entries = $("#TableWithRules table tbody tr td:first-child a");

    return cve_entries.toArray().map((entry) => (
        parseRawCVE(entry.children[0].data)
    ));
};

/**
 * Returns all the CVEs found for a given search query
 * @param {string} search_query Word(s) to search for CVEs
 * @returns {Array} List of CVE codes
 */
const getCVEList = async (search_query) => {
    const res = await fetchCVEListPage(search_query);
    return scrapePage(res.data);
};

module.exports = {
    getCVEListPageUrl,
    fetchCVEListPage,
    getCVEList,
    scrapePage,
    parseRawCVE,
};
