/**
 * Errors constant object used to describe all of the app's error codes
 */
const errors = Object.freeze({
    TEST: {
        code: 1,
        description: "This is just a test error",
    },
    FLAGS: {
        code: 2,
        description: "Input flags error",
    },
    NO_SUBDOMAINS_FOUND: {
        code: 3,
        description: "The crawler found no subdomains",
    },
});

module.exports = errors;
