const axios = require("axios");

const getCVEListPageUrl = (search_query) => (
    `https://cve.mitre.org/cgi-bin/cvekey.cgi?keyword=${encodeURI(search_query)}`
);

const fetchCVEListPage = (search_query) => {
    const page_url = getCVEListPageUrl(search_query);
    return axios.get(page_url);
};

module.exports = {
    getCVEListPageUrl,
    fetchCVEListPage,
};
