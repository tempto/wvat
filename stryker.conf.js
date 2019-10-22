module.exports = function(config) {
    config.set({
        packageManager: "npm",
        testRunner: "jest",
        mutator: "javascript",
        reporters: ["clear-text", "progress"],
        mutate: ["src/**/*.js"],
        jest: {
            projectType: "custom",
            config: require("./jest.config"),
            enableFindRelatedTests: true,
        },
        transpilers: [],
        coverageAnalysis: "off",
    });
};
