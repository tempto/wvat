const { getWebpageTechnologies, parseAnalysisResults, noVersionCount } = require("../src/TechAnalyser");

describe("Tech Analyser tests", () => {
    describe("Validate getWebpageTechnologies arguments", () => {
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
    describe("Correctly count technologies without version", () => {
        it("should fail when technologies are missing", () => {
            expect(noVersionCount).toThrow("Missing technologies");
        });
        it("should correctly count no-version technologies", () => {
            const tech = [
                { name: "Bootstrap",
                    confidence: "100",
                    version: "3.3.5",
                    icon: "Bootstrap.png",
                    website: "https://getbootstrap.com",
                    categories: [] },
                { name: "Google Analytics",
                    confidence: "100",
                    version: null,
                    icon: "Google Analytics.svg",
                    website: "http://google.com/analytics",
                    categories: [] },
                { name: "Marketo",
                    confidence: "100",
                    version: null,
                    icon: "Marketo.png",
                    website: "https://www.marketo.com",
                    categories: [] },
                { name: "Mermaid",
                    confidence: "100",
                    version: null,
                    icon: "default.svg",
                    website: "https://mermaidjs.github.io/",
                    categories: [] },
                { name: "TweenMax",
                    confidence: "100",
                    version: "1.20.3",
                    icon: "TweenMax.png",
                    website: "http://greensock.com/tweenmax",
                    categories: [] },
                { name: "Varnish",
                    confidence: "100",
                    version: null,
                    icon: "Varnish.svg",
                    website: "http://www.varnish-cache.org",
                    categories: [] },
                { name: "jQuery",
                    confidence: "100",
                    version: "2.2.1",
                    icon: "jQuery.svg",
                    website: "https://jquery.com",
                    categories: [] },
            ];
            expect(noVersionCount(tech)).toEqual(4);
        });
    });
});
