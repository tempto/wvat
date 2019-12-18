/**
 * Errors constant object used to describe all of the app's error codes
 */
const errors = Object.freeze({
    NETWORK: {
        code: 1,
        description: "Network error",
    },
    FLAGS: {
        code: 2,
        description: "Input flags error",
    },
    NO_SUBDOMAINS_FOUND: {
        code: 3,
        description: "The crawler found no subdomains",
    },
    TIMEOUT: {
        code: 4,
        description: "Tool timeout reached.",
    },
    CVE_SCRAPING: {
        code: 10,
        description: "CVE Scrapping failure",
    },
    CVE_LOCAL_CACHE: {
        code: 11,
        description: "CVE Local Cache accessing error",
    },
    CVE_LOCAL_CACHE_UPDATE: {
        code: 12,
        description: "CVE Local Cache update error",
    },
    TOOL_CONFIG_WRITING_FAILED: {
        code: 20,
        description: "Failed to write tool config JSON file",
    },
    TOOL_CONFIG_READING_FAILED: {
        code: 21,
        description: "Failed to read tool config JSON file",
    },
    SUBDOMAINS_CRAWLING_FAILED: {
        code: 31,
        description: "Failed to perform subdomains crawling",
    },
    SUBDOMAINS_GRAPH_FAILED: {
        code: 32,
        description: "Failed to generate subdomains crawling graph",
    },
    PAGES_CRAWLING_FAILED: {
        code: 33,
        description: "Failed to perform pages crawling",
    },
    DOMAIN_NETWORK_INFO_FAILED: {
        code: 34,
        description: "Failed to obtain domain network information",
    },
    HTML_REPORT_FAILURE: {
        code: 35,
        description: "Failed to save HTML report",
    },
    JSON_REPORT_FAILURE: {
        code: 36,
        description: "Failed to save JSON report",
    },
});

module.exports = errors;
