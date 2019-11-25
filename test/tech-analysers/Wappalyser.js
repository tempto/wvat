const Wappalyser = require("../../src/tech-analysers/Wappalyser");

describe("Wappalyser tests", () => {
    describe("Validate getWebpageTechnologies arguments", () => {
        it("should fail when the url is missing", () => {
            expect.assertions(1);
            Wappalyser.getWebpageTechnologies().catch((e) => {
                expect(e).toEqual(new Error("Missing Webpage url"));
            });
        });
        it("should fail when the given url is not valid", () => {
            expect.assertions(1);
            Wappalyser.getWebpageTechnologies("hppts://www.gitlab.com/").catch((e) => {
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

            expect(() => Wappalyser.parseAnalysisResults("https://www.gitlab.com", tech)).toThrow("Could not access webpage");
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

            expect(Wappalyser.parseAnalysisResults("https://www.gitlab.com", tech)).toEqual([{
                name: "Varnish",
                version: null,
            }]);
        });
    });
});
