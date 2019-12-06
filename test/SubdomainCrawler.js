const { getSubdomainsList } = require("../src/SubdomainCrawler");
const { getCompatibleWhitelistedSubdomains } = require("../src/commands/crawl");
const fs = require("fs");
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

jest.mock("fs");
describe("whitelist subdomains", () => {
    it("should only return subdomains of the specified domain", () => {
        fs.readFileSync.mockReturnValue("fe.up.pt\nni.fe.up.pt\nnotadomain\nnot.domain.pt");
        expect(new Set(getCompatibleWhitelistedSubdomains("doesnotmatter", "up.pt"))).toEqual(new Set(["ni.fe.up.pt", "fe.up.pt"]));
    });
});
