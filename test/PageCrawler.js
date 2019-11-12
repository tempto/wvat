const { getPagesList } = require("../src/PageCrawler");

describe("Domain Crawler tests", () => {
    describe("Validate arguments", () => {
        it("should fail when the domain name is missing", () => {
            expect.assertions(1);
            getPagesList().catch((e) => {
                expect(e).toEqual(new Error("Missing Domain Name"));
            });
        });
        it("should fail when the depth level is not a positive integer number", () => {
            expect.assertions(1);
            getPagesList("domain", -1).catch((e) => {
                expect(e).toEqual(new Error("Depth Level must be a number"));
            });
        });
    });
});
