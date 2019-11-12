const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");
const egrep = require("@apexearth/egrep");

const CVE_LIST_CVE_URL = "https://cve.mitre.org/data/downloads/allitems.csv";
const LOCAL_CVE_FILE_NAME = "cves.txt";

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

/**
 * Downloads a CVE list file
 * @returns {Promise} Axios get promise
 */
const downloadCVEList = () => (
    axios.get(CVE_LIST_CVE_URL)
);

/**
 * Parses a downloaded CVE list file
 * @param {string} csvdata Downloaded CVE list file data
 * @throws {Error} Bad file format error, if parsing fails
 * @returns {Object} Json object featuring the parsed data, CVE list date and CVE list version
 */
const parseCVEsFile = (csvdata) => {
    const entries = csvdata.split("\n");

    const version = entries[0].match(/\d+/)[0];
    const date = entries[1].match(/\d+/)[0];

    for (const i in entries) {
        if (entries[i].substr(0, 3) === "CVE") {
            return {
                date,
                version,
                entries: entries.slice(i),
            };
        }
    }

    throw new Error("Bad file format");
};

/**
 * Stores a CVEs list in a local file
 * @param {Array} entries CVE entries array
 * @param {string} date CVE list date
 * @param {string} version CVE list version
 */
const storeCVEsFile = (entries, date, version) => {
    const date_string = `date: ${date}\n`;
    const version_string = `version: ${version}\n`;
    const data = date_string + version_string + entries.join("\n");

    fs.writeFile(LOCAL_CVE_FILE_NAME, data, (err) => {
        if (err) throw new Error("File storing failed");
    });
};

/**
 * Searches for CVE entries in the CVEs local file
 * @param {string} search_pattern Pattern to search for CVEs
 * @param {Function} callback Called after searching is done
 */
const searchCVEsInLocalFile = (search_pattern, callback) => egrep({
    pattern: search_pattern,
    files: [
        LOCAL_CVE_FILE_NAME,
    ],
    recursive: false,
    ignoreCase: true,
}, callback);

module.exports = {
    getCVEListPageUrl,
    fetchCVEListPage,
    getCVEList,
    scrapePage,
    parseRawCVE,
    downloadCVEList,
    parseCVEsFile,
    storeCVEsFile,
    searchCVEsInLocalFile,
};
