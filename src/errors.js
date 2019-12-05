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
});

module.exports = errors;
