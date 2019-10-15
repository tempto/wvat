const fs = require("fs");
const path = require("path");
const { getCVEListPageUrl, parseRawCVE, scrapePage } = require("../../src/CVEListFetcher");

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

    describe("CVE list page scraping", () => {
        it("should scrape the cves from the cve table", async () => {
            const reactnative_file_path = path.join(__dirname, "cve_list_page_reactnative.html");
            const reactnative_page_data = fs.readFileSync(reactnative_file_path, "utf-8");
            const reactnative_cve_list = await scrapePage(reactnative_page_data);

            expect(reactnative_cve_list).toEqual([
                "2019-12164",
                "2017-16028",
                "2016-10697",
            ]);

            const apollojs_file_path = path.join(__dirname, "cve_list_page_apollojs.html");
            const apollojs_page_data = fs.readFileSync(apollojs_file_path, "utf-8");
            const apollojs_cve_list = await scrapePage(apollojs_page_data);

            expect(apollojs_cve_list).toEqual([]);
        });

        it("should fail when the page data is missing", () => {
            expect(() => scrapePage()).toThrowError(new Error("Missing page data"));
        });
    });
});
