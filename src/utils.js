/**
 * Regex to test urls
 */
const URL_REGEX = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w.-]+)+[\w\-._~:/?#[\]@!$&'()*+,;=.]+$/;

/**
 * Regex to test CVEs in the format CVE-XXXX-YYYY...
 */
const CVE_REGEX = /^(CVE-)?\d{4}-\d{4,}$/;

const COMPLETE_CVE_REGEX = /^CVE-\d{4}-\d{4,}$/;
const NUM_ONLY_CVE_REGEX = /^\d{4}-\d{4,}$/;

const HTTPS_REGEX = /^http(s)?/;
const DOMAIN_REGEX = /^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\\/\n?]+)/i;

const PARSE_SEARCH_QUERY_REGEX = /[:_.-\s]+/;
const WORD_SEPARATOR = "[:_.-\\s]+";

const HTTP_STATUS_CODE_REGEX = /^\d{3}$/;

/**
 * Verifies if a given url candidate is valid
 * @param {string} url_candidate Url to verify validity
 * @returns {boolean} true if the url is valid, false otherwise
 */
const isValidURL = (url_candidate) => URL_REGEX.test(url_candidate);

const isCompleteCVE = (cve_candidate) => COMPLETE_CVE_REGEX.test(cve_candidate);

const isNumOnlyCVE = (cve_candidate) => NUM_ONLY_CVE_REGEX.test(cve_candidate);

/**
 * Verifies if a given CVE candidate is valid
 * @param {string} cve_candidate CVE to verify validity
 * @returns {boolean} true if the CVE is valid, false otherwise
 */
const isValidCVE = (cve_candidate) => CVE_REGEX.test(cve_candidate);

/**
 *
 * @param {String} search_query Search query string
 * @returns {RegExp} Regex to match various word separators
 */
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

/**
 * Extracts the domain from a given url
 * @param {string} url Url to extract domain
 * @returns {string} extracted domain from url
 */
const extractDomainFromUrl = (url) => (
    url.match(DOMAIN_REGEX)[1]
);

/**
 * Verifies if a given url belongs to a specific domain
 * @param {string} url url candidate
 * @param {string} domain target domain
 * @returns {boolean} true if url is from domain, false otherwise
 */
const isUrlFromDomain = (url, domain) => (
    url.indexOf(extractDomainFromUrl(domain)) >= 0
);

const isHttpStatusCode = (candidate) => (
    HTTP_STATUS_CODE_REGEX.test(candidate)
);

/**
 * Adds '/' in the end of the url if it does not end with it
 * @param {string} url url
 * @returns {string} url that ends with '/'
 */
const addURLEndSlash = (url) => url + (url.endsWith("/") ? "" : "/");

module.exports = {
    URL_REGEX,
    HTTPS_REGEX,
    isValidCVE,
    isCompleteCVE,
    isNumOnlyCVE,
    isValidURL,
    buildRegexFromSearchQuery,
    parseDateFromCVEEntry,
    extractDomainFromUrl,
    isUrlFromDomain,
    isHttpStatusCode,
    addURLEndSlash,
};
