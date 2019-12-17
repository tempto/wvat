const fs = require("fs");
const path = require("path");
const ToolbarNetcraft = require("../../src/tech-analysers/ToolbarNetcraft");

describe("ToolbarNetcraft tests", () => {
    describe("Validate getWebpageTechnologies arguments", () => {
        it("should fail when the url is missing", () => {
            expect.assertions(1);
            ToolbarNetcraft.getWebpageTechnologies().catch((e) => {
                expect(e).toEqual(new Error("Missing Webpage url"));
            });
        });
        it("should fail when the given url is not valid", () => {
            expect.assertions(1);
            ToolbarNetcraft.getWebpageTechnologies("hppts://www.gitlab.com/").catch((e) => {
                expect(e).toEqual(new Error("Invalid url"));
            });
        });
    });
    describe("Parse results", () => {
        it("should fail when the page is missing", () => {
            expect(() => ToolbarNetcraft.parseAnalysisResults()).toThrow("Missing page");
        });
        it("should properly parse the technologies", () => {
            const file_path = path.join(__dirname, "ToolbarNetcraft.html");
            const page = fs.readFileSync(file_path, "utf-8");

            expect(ToolbarNetcraft.parseAnalysisResults(page)).toEqual([
                { name: "XML", version: null },
                { name: "SSL", version: null },
                { name: "JavaScript", version: null },
            ]);
        });
    });
});
