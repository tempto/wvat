const TechAnalyser = require("../src/TechAnalyser");
const Wappalyser = require("../src/tech-analysers/Wappalyser");

describe("Tech Analyser tests", () => {
    describe("Abstract class", () => {
        it("should fail when calling abstract methods", () => {
            expect(() => TechAnalyser.analyseWebPage.toThrow("Not implemented!"));
            expect(() => TechAnalyser.parseAnalysisResults.toThrow("Not implemented!"));
            expect(() => TechAnalyser.getWebpageTechnologies.toThrow("Not implemented!"));
        });
    });
    describe("Derived classes", () => {
        it("should fail when a derived class does not implement a method", () => {
            class BadAnalyser extends TechAnalyser {};
            expect(() => BadAnalyser.analyseWebPage.toThrow("Not implemented!"));
            expect(() => BadAnalyser.parseAnalysisResults.toThrow("Not implemented!"));
            expect(() => BadAnalyser.getWebpageTechnologies.toThrow("Not implemented!"));
        });
        it("should properly use derived class implemented methods", () => {
            class XPTOAnalyser extends TechAnalyser {
                static analyseWebPage() {
                    return "analyseWebPage";
                }
                static parseAnalysisResults() {
                    return "parseAnalysisResults";
                }
                static getWebpageTechnologies() {
                    return "getWebpageTechnologies";
                }
            };
            expect(XPTOAnalyser.analyseWebPage()).toEqual("analyseWebPage");
            expect(XPTOAnalyser.parseAnalysisResults()).toEqual("parseAnalysisResults");
            expect(XPTOAnalyser.getWebpageTechnologies()).toEqual("getWebpageTechnologies");
        });
    });
    describe("Correctly count technologies without version", () => {
        it("should fail when technologies are missing", () => {
            expect(TechAnalyser.noVersionCount).toThrow("Missing technologies");
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
            expect(TechAnalyser.noVersionCount(tech)).toEqual(4);
        });
    });
    describe("Call Tech Finders", () => {
        it("should fail when the url is missing", () => {
            expect.assertions(1);
            TechAnalyser.findWebPageTechnologies().catch((e) => {
                expect(e).toEqual(new Error("Missing Webpage url"));
            });
        });
        it("should fail when the given url is not valid", () => {
            expect.assertions(1);
            TechAnalyser.findWebPageTechnologies("hppts://www.gitlab.com/").catch((e) => {
                expect(e).toEqual(new Error("Invalid url"));
            });
        });
        it("should correctly call tech-analysers", () => {
            jest.mock("../src/tech-analysers/Wappalyser", () => class WappMock {
                static getWebpageTechnologies() { 
                    return [{
                    name: "WVAT",
                    version : 1.0
                    }];
                }
            });

            expect(TechAnalyser.findWebPageTechnologies("https://www.gitlab.com/")).resolves.toEqual([[{
                name: "WVAT",
                version : 1.0
            }]]);
        });
    });
});
