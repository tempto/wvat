const { getPagesList } = require("../src/PageCrawler");

describe("Page Crawler tests", () => {
    describe("Validate arguments", () => {
        it("should fail when the domain name is missing", async () => {
            expect.assertions(1);
            await expect(getPagesList()).rejects.toEqual(new Error("Missing Domain Name"));
        });
        it("should fail when the depth level is not a positive integer number", async () => {
            expect.assertions(1);
            await expect(getPagesList("domain", -1)).rejects.toEqual(new Error("Depth Level must be a positive number"));
        });
    });
});
