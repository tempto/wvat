const axios = require("axios");
const cheerio = require("cheerio");

const getCVEListPageUrl = (search_query) => (
    `https://cve.mitre.org/cgi-bin/cvekey.cgi?keyword=${encodeURI(search_query)}`
);

const fetchCVEListPage = (search_query) => {
    const page_url = getCVEListPageUrl(search_query);
    return axios.get(page_url);
};

const parseRawCVE = (raw_cve) => raw_cve.substring(4);

const getCVEList = async (search_query) => {
    const res = await fetchCVEListPage(search_query);
    const $ = cheerio.load(res.data);
    const cve_entries = $("#TableWithRules table tbody tr td:first-child a");

    return cve_entries.toArray().map((entry) => (
        parseRawCVE(entry.children[0].data)
    ));
};

module.exports = {
    getCVEListPageUrl,
    fetchCVEListPage,
    getCVEList,
    parseRawCVE,
};
