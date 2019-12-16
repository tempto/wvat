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

const CVE_AGE_THRESHOLD = 2;

/**
 * Verifies if a given url candidate is valid
 * @param {string} url_candidate Url to verify validity
 * @returns {boolean} true if the url is valid, false otherwise
 */
const isValidURL = (url_candidate) => URL_REGEX.test(url_candidate);

/**
 * Verifies if CVE candidate is in CVE-XXXX-YYYYYYY format
 * @param {String} cve_candidate CVE candidate
 * @returns Returns true if CVE is in CVE-XXXX-YYYYYYY, false otherwise
 */
const isCompleteCVE = (cve_candidate) => COMPLETE_CVE_REGEX.test(cve_candidate);

/**
 * Verifies if CVE candidate is in XXXX-YYYYYYY format
 * @param {String} cve_candidate CVE candidate
 * @returns Returns true if CVE is in XXXX-YYYYYYY, false otherwise
 */
const isNumOnlyCVE = (cve_candidate) => NUM_ONLY_CVE_REGEX.test(cve_candidate);

/**
 * Verifies if a given CVE candidate is valid
 * @param {string} cve_candidate CVE to verify validity
 * @returns {boolean} true if the CVE is valid, false otherwise
 */
const isValidCVE = (cve_candidate) => CVE_REGEX.test(cve_candidate);

/**
 * Prepares a string for being injected into a regex query (by escaping regex special characters)
 * @param {String} string String to prepare for regex injection
 * @returns {String} String with characters escaped for regex injection
 */
const escapeRegExp = (string) => (
    string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
);

/**
 *
 * @param {String} search_query Search query string
 * @returns {RegExp} Regex to match various word separators
 */
const buildRegexFromSearchQuery = (search_query) => {
    const tokens = search_query.split(PARSE_SEARCH_QUERY_REGEX).map(escapeRegExp);
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

/**
 * Verifies if a string corresponds to an HTTP status code
 * @param {String} candidate HTTP status code candidate
 * @returns {String} Returns true if the String is an HTTP status, false otherwise
 */
const isHttpStatusCode = (candidate) => (
    HTTP_STATUS_CODE_REGEX.test(candidate)
);

/**
 * Adds '/' in the end of the url if it does not end with it
 * @param {string} url url
 * @returns {string} url that ends with '/'
 */
const addURLEndSlash = (url) => url + (url.endsWith("/") ? "" : "/");

/**
 * Get current date (DD-MM-YYYY_hh:mm:ss format)
 * @returns {String} Current date in the DD-MM-YYYY_hh:mm:ss format
 */
const now = () => {
    const date = new Date();
    const day = date.getDay().toString().padStart(2, 0);
    const mon = date.getMonth().toString().padStart(2, 0);
    const year = date.getFullYear().toString().padStart(4, 0);
    const hour = date.getHours().toString().padStart(2, 0);
    const min = date.getMinutes().toString().padStart(2, 0);
    const sec = date.getSeconds().toString().padStart(2, 0);

    return `${day}-${mon}-${year}_${hour}:${min}:${sec}`;
};

const stripDomain = (domain) => extractDomainFromUrl(domain);

/**
 * Filters old CVEs from a CVEs list
 * @param {Array} cves CVEs list
 * @returns {Array} Recent CVEs list
 */
const filterOldCVEs = (cves) => {
    const current_year = new Date().getFullYear();

    return cves.filter((cve) => {
        const cve_year = parseInt(cve.id.substr(4, 4), 10);
        return Math.abs(current_year - cve_year) < CVE_AGE_THRESHOLD;
    });
};

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
    now,
    stripDomain,
    filterOldCVEs,
};
