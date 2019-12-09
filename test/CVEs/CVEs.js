const fs = require("fs");
const path = require("path");
const fc = require("fast-check");
const { getCVEListPageUrl, parseRawCVE, scrapePage } = require("../../src/CVEs");
const { parseNoCacheCVEEntries, parseLocalCacheCVEEntries, parseCVEsFile } = require("../../src/CVEs");
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

        expect(reactnative_cve_list[0].id).to.equal("CVE-2019-12164");
        // eslint-disable-next-line max-len
        expect(reactnative_cve_list[0].description).to.equal("ubuntu-server.js in Status React Native Desktop before v0.57.8_mobile_ui allows Remote Code Execution.");
        expect(reactnative_cve_list[0].exploits[0]).to.equal("https://www.exploit-db.com/search?cve=2019-12164");
        expect(reactnative_cve_list[0].exploits[1]).to.equal("https://www.rapid7.com/db/?q=CVE-2019-12164&type=nexpose");
        expect(reactnative_cve_list[0].exploits[2]).to.equal("https://search.circl.lu/?q=2019-12164");

        expect(reactnative_cve_list[1].id).to.equal("CVE-2017-16028");
        // eslint-disable-next-line max-len
        expect(reactnative_cve_list[1].description).to.equal("react-native-meteor-oauth is a library for Oauth2 login to a Meteor server in React Native. The oauth Random Token is generated using a non-cryptographically strong RNG (Math.random()).");
        expect(reactnative_cve_list[1].exploits[0]).to.equal("https://www.exploit-db.com/search?cve=2017-16028");
        expect(reactnative_cve_list[1].exploits[1]).to.equal("https://www.rapid7.com/db/?q=CVE-2017-16028&type=nexpose");
        expect(reactnative_cve_list[1].exploits[2]).to.equal("https://search.circl.lu/?q=2017-16028");

        expect(reactnative_cve_list[2].id).to.equal("CVE-2016-10697");
        // eslint-disable-next-line max-len
        expect(reactnative_cve_list[2].description).to.equal("react-native-baidu-voice-synthesizer is a baidu voice speech synthesizer for react native. react-native-baidu-voice-synthesizer downloads resources over HTTP, which leaves it vulnerable to MITM attacks. It may be possible to cause remote code execution (RCE) by swapping out the requested resources with an attacker controlled copy if the attacker is on the network or positioned in between the user and the remote server.");
        expect(reactnative_cve_list[2].exploits[0]).to.equal("https://www.exploit-db.com/search?cve=2016-10697");
        expect(reactnative_cve_list[2].exploits[1]).to.equal("https://www.rapid7.com/db/?q=CVE-2016-10697&type=nexpose");
        expect(reactnative_cve_list[2].exploits[2]).to.equal("https://search.circl.lu/?q=2016-10697");

        const apollojs_file_path = path.join(__dirname, "cve_list_page_apollojs.html");
        const apollojs_page_data = fs.readFileSync(apollojs_file_path, "utf-8");
        const apollojs_cve_list = await scrapePage(apollojs_page_data);

        expect(apollojs_cve_list).to.be.empty;
    });

    it("should fail when the page data is missing", () => {
        expect(scrapePage).to.throw("Missing page data");
    });
});

describe("Fetched CVE entry parsing", () => {
    it("should correctly parse fetched cve entries", () => {

        // eslint-disable-next-line max-len
        const [parsed_entry1, parsed_entry2, parsed_entry3] = parseNoCacheCVEEntries([["CVE-1111-1111", "Description 1"], ["CVE-2222-2222", "Description 2"], ["CVE-3333-3333", "Description 3"]]);

        expect(parsed_entry1.id).to.equal("CVE-1111-1111");
        expect(parsed_entry1.description).to.equal("Description 1");
        // eslint-disable-next-line max-len
        expect(parsed_entry1.exploits[0]).to.equal("https://www.exploit-db.com/search?cve=1111-1111");
        expect(parsed_entry1.exploits[1]).to.equal("https://www.rapid7.com/db/?q=CVE-1111-1111&type=nexpose");
        expect(parsed_entry1.exploits[2]).to.equal("https://search.circl.lu/?q=1111-1111");

        expect(parsed_entry2.id).to.equal("CVE-2222-2222");
        expect(parsed_entry2.description).to.equal("Description 2");
        // eslint-disable-next-line max-len
        expect(parsed_entry2.exploits[0]).to.equal("https://www.exploit-db.com/search?cve=2222-2222");
        expect(parsed_entry2.exploits[1]).to.equal("https://www.rapid7.com/db/?q=CVE-2222-2222&type=nexpose");
        expect(parsed_entry2.exploits[2]).to.equal("https://search.circl.lu/?q=2222-2222");

        expect(parsed_entry3.id).to.equal("CVE-3333-3333");
        expect(parsed_entry3.description).to.equal("Description 3");
        // eslint-disable-next-line max-len
        expect(parsed_entry3.exploits[0]).to.equal("https://www.exploit-db.com/search?cve=3333-3333");
        expect(parsed_entry3.exploits[1]).to.equal("https://www.rapid7.com/db/?q=CVE-3333-3333&type=nexpose");
        expect(parsed_entry3.exploits[2]).to.equal("https://search.circl.lu/?q=3333-3333");
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

        const [entry1, entry2, entry3] = parseLocalCacheCVEEntries(raw_data);

        expect(entry1.id).to.equal("CVE-1000-0001");
        expect(entry1.status).to.equal("Candidate");
        expect(entry1.description).to.equal("Description 1");
        expect(entry1.date).to.equal("10-01-2015");

        expect(entry2.id).to.equal("CVE-1000-0002");
        expect(entry2.status).to.equal("Candidate");
        expect(entry2.description).to.equal("Description 2");
        expect(entry2.date).to.equal("20-02-2016");

        expect(entry3.id).to.equal("CVE-1000-0003");
        expect(entry3.status).to.equal("Candidate");
        expect(entry3.description).to.equal("Description 3");
        expect(entry3.date).to.equal("30-03-2017");
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
