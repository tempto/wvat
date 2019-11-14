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

/**
 * Parses a date from a Local cache CVE entry
 * @param {Array} cve_entry CVE entry from Local cache
 * @returns {String} Date string, undefined if invalid format
 */
const parseDateFromCVEEntry = (cve_entry) => {
    const date = cve_entry[4];
    const date_start_index = date.indexOf("(");

    if (date_start_index === -1) {
        return undefined;
    } else {
        return `${date.substr(date_start_index + 7, 2)}-${date.substr(date_start_index + 5, 2)}-${date.substr(date_start_index + 1, 4)}`;
    }
};

module.exports = {
    URL_REGEX,
    HTTPS_REGEX,
    isValidCVE,
    isValidURL,
    buildRegexFromSearchQuery,
    parseDateFromCVEEntry,
};
