module.exports = function(config) {
    config.set({
        packageManager: "npm",
        testRunner: "jest",
        mutator: "javascript",
        reporters: ["clear-text", "progress", "html"],
        mutate: [
            "src/**/*.js",
            "!src/index.js",  // index file is responsible for oclif setup and should be ignored
            "!src/commands/**/*.js",  // commands are oclif responsability, external modules should not be being tested
        ],
        jest: {
            projectType: "custom",
            config: require("./jest.config"),
            enableFindRelatedTests: true,
        },
        transpilers: [],
        coverageAnalysis: "off",
    });
};
