const fs = require("fs");
const path = require("path");
const fc = require("fast-check");
const { getCVEListPageUrl, parseRawCVE, scrapePage } = require("../../src/CVEListFetcher");
const { isValidCVE, isValidURL } = require("../../src/utils");
const chai = require("chai"),
    expect = chai.expect,
    should = chai.should(); // eslint-disable-line

describe("CVE List Fetcher tests", () => {
    describe("CVE List page url", () => {
        it("should build the cve list website url", () => {
            const technology = "laravel";
            expect(getCVEListPageUrl(technology)).to.equal(
                `https://cve.mitre.org/cgi-bin/cvekey.cgi?keyword=${technology}`,
            );
        });

        it("should build the cve list website url, escaping characters in the technology search query", () => {
            const technology = "react native";
            expect(getCVEListPageUrl(technology)).to.equal(
                `https://cve.mitre.org/cgi-bin/cvekey.cgi?keyword=${encodeURI(technology)}`,
            );
        });

        it("should fail when the search query is empty", () => {
            expect(getCVEListPageUrl).to.throw("Missing search query");
        });

        it("should generate valid urls from valid CVEs", () => {
            fc.assert(
                fc.property(
                    fc.integer(1000, 9999), fc.integer(1000, 9999999), (cve_left_part, cve_right_part) => {
                        const cve = `${cve_left_part}-${cve_right_part}`;
                        return isValidCVE(cve) && isValidURL(getCVEListPageUrl(cve));
                    },
                ),
            );
        });
    });

    describe("CVE string parsing", () => {
        it("should extract the CVE code from a CVE string", () => {
            expect(parseRawCVE("CVE-2019-12164")).to.equal("2019-12164");
        });

        it("should fail when the CVE string is invalid", () => {
            expect(parseRawCVE).to.throw("Missing CVE string");
        });

        it("should fail when the CVE string is invalid", () => {
            expect(() => parseRawCVE("invalid")).to.throw("Invalid CVE string");
        });
    });

    describe("CVE list page scraping", () => {
        it("should scrape the cves from the cve table", async () => {
            const reactnative_file_path = path.join(__dirname, "cve_list_page_reactnative.html");
            const reactnative_page_data = fs.readFileSync(reactnative_file_path, "utf-8");
            const reactnative_cve_list = await scrapePage(reactnative_page_data);

            expect(reactnative_cve_list).to.deep.equal([
                "2019-12164",
                "2017-16028",
                "2016-10697",
            ]);

            const apollojs_file_path = path.join(__dirname, "cve_list_page_apollojs.html");
            const apollojs_page_data = fs.readFileSync(apollojs_file_path, "utf-8");
            const apollojs_cve_list = await scrapePage(apollojs_page_data);

            expect(apollojs_cve_list).to.be.empty;
        });

        it("should fail when the page data is missing", () => {
            expect(scrapePage).to.throw("Missing page data");
        });
    });
});
