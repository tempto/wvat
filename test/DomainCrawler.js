const { getDomainList } = require("../src/DomainCrawler");

describe("Domain Crawler testes", () => {
    describe("Validate arguments", () => {
        it("should fail when the domain name is missing", () => {
            expect.assertions(1);
            getDomainList().catch((e) => {
                expect(e).toEqual(new Error("Missing Domain Name"));
            });
        });
        it("should fail when the depth level is not a positive integer number", () => {
            expect.assertions(1);
            getDomainList().catch((e) => {
                expect(e).toEqual(new Error("Depth Level must be a number"));
            });
        });
        it("should fail when the depth level is missing", () => {
            expect.assertions(1);
            getDomainList().catch((e) => {
                expect(e).toEqual(new Error("Depth Level must be a positive number"));
            });
        });
    });
});
