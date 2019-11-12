/**
 * Regex to test urls
 */
const URL_REGEX = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w.-]+)+[\w\-._~:/?#[\]@!$&'()*+,;=.]+$/;

/**
 * Regex to test CVEs in the format CVE-XXXX-YYYY...
 */
const CVE_REGEX = /^(CVE-)?\d{4}-\d{4,}$/;

const HTTPS_REGEX = /^http(s)?/;

const PARSE_SEARCH_QUERY_REGEX = /[:_.-\s]+/;
const WORD_SEPARATOR = "[:_.-\\s]+";

/**
 * Verifies if a given url candidate is valid
 * @param {string} url_candidate Url to verify validity
 * @returns {boolean} true if the url is valid, false otherwise
 */
const isValidURL = (url_candidate) => URL_REGEX.test(url_candidate);

/**
 * Verifies if a given CVE candidate is valid
 * @param {string} cve_candidate CVE to verify validity
 * @returns {boolean} true if the CVE is valid, false otherwise
 */
const isValidCVE = (cve_candidate) => CVE_REGEX.test(cve_candidate);

const buildRegexFromSearchQuery = (search_query) => {
    const tokens = search_query.split(PARSE_SEARCH_QUERY_REGEX);
    return new RegExp(tokens.join(WORD_SEPARATOR));
};

module.exports = {
    URL_REGEX,
    HTTPS_REGEX,
    isValidCVE,
    isValidURL,
    buildRegexFromSearchQuery,
};
