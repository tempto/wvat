const getCVEListPageUrl = (search_query) => (
    `https://cve.mitre.org/cgi-bin/cvekey.cgi?keyword=${encodeURI(search_query)}`
);

module.exports = {
    getCVEListPageUrl,
};
