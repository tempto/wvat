const { getCVEListPageUrl, parseRawCVE } = require("../../src/CVEListFetcher");

describe("CVE List Fetcher tests", () => {
    describe("CVE List page url", () => {
        it("should build the cve list website url", () => {
            const technology = "laravel";
            expect(getCVEListPageUrl(technology)).toEqual(
                `https://cve.mitre.org/cgi-bin/cvekey.cgi?keyword=${technology}`,
            );
        });

        it("should build the cve list website url, escaping characters in the technology search query", () => {
            const technology = "react native";
            expect(getCVEListPageUrl(technology)).toEqual(
                `https://cve.mitre.org/cgi-bin/cvekey.cgi?keyword=${encodeURI(technology)}`,
            );
        });

        it("should fail when the search query is empty", () => {
            expect(() => getCVEListPageUrl("")).toThrowError(new Error("Missing search query"));
        });
    });

    describe("CVE string parsing", () => {
        it("should extract the CVE code from a CVE string", () => {
            expect(parseRawCVE("CVE-2019-12164")).toEqual("2019-12164");
        });

        it("should fail when the CVE string is invalid", () => {
            expect(() => parseRawCVE("")).toThrowError(new Error("Missing CVE string"));
        });

        it("should fail when the CVE string is invalid", () => {
            expect(() => parseRawCVE("invalid")).toThrowError(new Error("Invalid CVE string"));
        });
    });
});
