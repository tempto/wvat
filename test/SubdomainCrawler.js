const { getSubdomainsList } = require("../src/SubdomainCrawler");
const { getCompatibleWhitelistedSubdomains } = require("../src/commands/crawl");
const fs = require("fs");
const EventEmitter = require("events");
const child_process = require("child_process");
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

describe("Crawl Integration Test", () => {

    it("should read the crawled subdomains", async () => {

        const stdout_emitter = new EventEmitter();

        const amass = new EventEmitter();
        amass.stdout = stdout_emitter;

        fs.existsSync.mockImplementation(() => true);
        fs.readFileSync.mockImplementation(() => "domain1\ndomain2\n");
        child_process.exec.mockImplementation(() => amass);

        const subdomains = getSubdomainsList("test_domain.com", { timeout: 3 });
        stdout_emitter.emit("data", "test-data");
        amass.emit("close");

        expect(await subdomains).toEqual(["domain1", "domain2"]);

    });
});
