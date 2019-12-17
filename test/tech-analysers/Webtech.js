const Webtech = require("../../src/tech-analysers/Webtech");

describe("Webtech exists", () => {
    const Config = require("../../src/Config");

    beforeEach(() => {
        Config.resetToolConfiguration();
    });

    it("should fail when Webtech is disabled", () => {
        expect.assertions(1);
        Webtech.getWebpageTechnologies("https://www.gitlab.com/").catch((e) => {
            expect(e).toEqual(new Error("Webtech disabled"));
        });
    });

});

describe("Webtech tests", () => {
    describe("Validate getWebpageTechnologies arguments", () => {
        it("should fail when the url is missing", () => {
            expect.assertions(1);
            Webtech.getWebpageTechnologies().catch((e) => {
                expect(e).toEqual(new Error("Missing Webpage url"));
            });
        });
        it("should fail when the given url is not valid", () => {
            expect.assertions(1);
            Webtech.getWebpageTechnologies("hppts://www.gitlab.com/").catch((e) => {
                expect(e).toEqual(new Error("Invalid url"));
            });
        });
    });
    describe("Parse results", () => {
        it("should properly parse the technologies", () => {
            const tech = "Target URL: https://gitlab.com/\nDetected technologies:\n\t -Varnish \n\n";

            expect(Webtech.parseAnalysisResults(tech)).toEqual([{
                name: "Varnish",
                version: null,
            }]);
        });
    });
});
