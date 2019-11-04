const { getWebpageTechnologies, parseAnalysisResults } = require("../src/TechAnalyser");

describe("Tech Analyser tests", () => {
    describe("Validate arguments", () => {
        it("should fail when the url is missing", () => {
            expect.assertions(1);
            getWebpageTechnologies().catch((e) => {
                expect(e).toEqual(new Error("Missing Webpage url"));
            });
        });
        it("should fail when the given url is not valid", () => {
            expect.assertions(1);
            getWebpageTechnologies("hppts://www.gitlab.com/").catch((e) => {
                expect(e).toEqual(new Error("Invalid url"));
            });
        });
    });
    describe("Parse results", () => {
        it("should fail when the webpage response is not 200", () => {
            const tech = {
                urls: {
                    "https://www.gitlab.com": {
                        status: 404,
                    },
                },
            };

            expect(() => parseAnalysisResults("https://www.gitlab.com", tech)).toThrow("Could not access webpage");
        });
        it("should properly parse the technologies", () => {
            const tech = {
                urls: {
                    "https://www.gitlab.com": {
                        status: 200,
                    },
                },
                applications: [
                    { name: "Varnish",
                        confidence: "100",
                        version: null,
                        icon: "Varnish.svg",
                        website: "http://www.varnish-cacher.org",
                        categories: [],
                    },
                ],
            };

            expect(parseAnalysisResults("https://www.gitlab.com", tech)).toEqual(tech.applications);
        });
    });
});
