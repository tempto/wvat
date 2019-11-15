const fs = require("fs");
const path = require("path");
const fc = require("fast-check");
const { getCVEListPageUrl, parseRawCVE, scrapePage, parseLocalCacheCVEEntries, parseCVEsFile } = require("../../src/CVEs");
const { isValidCVE, isValidURL } = require("../../src/utils");
const chai = require("chai"),
    expect = chai.expect,
    should = chai.should(); // eslint-disable-line

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

describe("Local Cache CVE entry parsing", () => {
    it("should correctly parse local cache cve entries", () => {
        const raw_data = [
            {
                file: ".cvescache",
                line: "CVE-1000-0001,Candidate,\"Description 1\",\"...\",Assigned (20150110),\"...\",\"...\"",
            },
            {
                file: ".cvescache",
                line: "CVE-1000-0002,Candidate,\"Description 2\",\"...\",Assigned (20160220),\"...\",\"...\"",
            },
            {
                file: ".cvescache",
                line: "CVE-1000-0003,Candidate,\"Description 3\",\"...\",Assigned (20170330),\"...\",\"...\"",
            },
        ];

        const parsed_data = parseLocalCacheCVEEntries(raw_data);

        expect(parsed_data[0]).to.deep.equal({
            id: "CVE-1000-0001",
            status: "Candidate",
            description: "Description 1",
            date: "10-01-2015",
        });

        expect(parsed_data[1]).to.deep.equal({
            id: "CVE-1000-0002",
            status: "Candidate",
            description: "Description 2",
            date: "20-02-2016",
        });

        expect(parsed_data[2]).to.deep.equal({
            id: "CVE-1000-0003",
            status: "Candidate",
            description: "Description 3",
            date: "30-03-2017",
        });
    });
});

describe("CVE file parsing", () => {
    it("should correctly parse a CVE file buffer", () => {
        const file_buffer = "version: 20020530\ndate: 20151025\nCVE-1000-0001,Candidate,\"D1\",\"...\",Assigned (20150110),\"...\",\"...\"";

        const parsed_data = parseCVEsFile(file_buffer);

        parsed_data.date.should.be.equal("20151025");
        parsed_data.version.should.be.equal("20020530");

        parsed_data.entries.should.not.be.empty;
        parsed_data.entries.length.should.be.equal(1);
    });
});
