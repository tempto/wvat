const { getSubdomainsList } = require("../src/SubdomainCrawler");

jest.mock("child_process");

describe("Subdomain Crawler tests", () => {
    describe("Validate arguments", () => {
        it("should fail when the domain name is missing", async () => {
            expect.assertions(1);
            await expect(getSubdomainsList())
                .rejects.toEqual(new Error("Invalid domain format, please use a valid URL."));
        });
        it("should fail when the domain has invalid format", async () => {
            expect.assertions(1);
            await expect(getSubdomainsList("domain"))
                .rejects.toEqual(new Error("Invalid domain format, please use a valid URL."));
        });
    });
});
