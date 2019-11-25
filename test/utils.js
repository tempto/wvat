const {
    isValidCVE, isValidURL, parseDateFromCVEEntry, buildRegexFromSearchQuery, isNumOnlyCVE, isCompleteCVE, addURLEndSlash,
} = require("../src/utils");

const chai = require("chai"),
    expect = chai.expect,
    should = chai.should(); // eslint-disable-line

describe("CVE validor util tests", () => {
    it("should validate correct CVEs", () => {
        isValidCVE("CVE-2015-1234").should.be.true;
        isValidCVE("2015-1234").should.be.true;
        isValidCVE("CVE-2015-1234567").should.be.true;
        isValidCVE("2015-1234567").should.be.true;
    });

    it("should not validate incorrect CVEs", () => {
        isValidCVE("CVE-22015-1234").should.be.false;
        isValidCVE("22015-1234").should.be.false;
        isValidCVE("-2015-1234").should.be.false;
    });

    it("should validate correct number-only-format CVES", () => {
        isNumOnlyCVE("2019-1234").should.be.true;
        isNumOnlyCVE("2019-12345").should.be.true;
        isNumOnlyCVE("2019-123456").should.be.true;
        isNumOnlyCVE("2019-1234567").should.be.true;
    });

    it("should not validate incorrect number-only-format CVES", () => {
        isNumOnlyCVE("CVE-2019-1234").should.be.false;
        isNumOnlyCVE("CVE-2019-12345").should.be.false;
        isNumOnlyCVE("CVE-2019-123456").should.be.false;
        isNumOnlyCVE("CVE-2019-1234567").should.be.false;
    });

    it("should validate correct full-format CVES", () => {
        isCompleteCVE("CVE-2019-1234").should.be.true;
        isCompleteCVE("CVE-2019-12345").should.be.true;
        isCompleteCVE("CVE-2019-123456").should.be.true;
        isCompleteCVE("CVE-2019-1234567").should.be.true;
    });

    it("should not validate incorrect full-format CVES", () => {
        isCompleteCVE("2019-1234").should.be.false;
        isCompleteCVE("2019-12345").should.be.false;
        isCompleteCVE("2019-123456").should.be.false;
        isCompleteCVE("2019-1234567").should.be.false;
    });
});

describe("URL validor util tests", () => {
    it("should validate correct URLs", () => {
        isValidURL("https://www.example.com").should.be.true;
        isValidURL("http://www.example.com").should.be.true;
        isValidURL("www.example.com").should.be.true;
        isValidURL("example.com").should.be.true;
        isValidURL("http://blog.example.com").should.be.true;
        isValidURL("http://www.example.com/product").should.be.true;
        isValidURL("http://www.example.com/products?id=1&page=2").should.be.true;
        isValidURL("http://www.example.com#up").should.be.true;
        isValidURL("http://255.255.255.255").should.be.true;
        isValidURL("255.255.255.255").should.be.true;
        isValidURL("http://www.site.com:8008").should.be.true;
    });

    it("should not validate incorrect URLs", () => {
        isValidURL("http://invalid.com/perl.cgi?key= | http://web-site.com/cgi-bin/perl.cgi?key1=value1&key2").should.be.false;
        isValidURL("http://example://example.com").should.be.false;
        isValidURL("httpsftp://example.com").should.be.false;
    });

    it("should correctly add a '/' to the end of a URL if needed", () => {
        expect(addURLEndSlash("https://www.gitlab.com")).to.deep.equal("https://www.gitlab.com/");
        expect(addURLEndSlash("https://www.gitlab.com/")).to.deep.equal("https://www.gitlab.com/");
    });
});

describe("Parser for CVE local cache entries", () => {
    it("should correctly parse well-built cve cache entries", () => {
        const CACHE_CVE_ENTRY = [
            "CVE-2017-16028",
            "Candidate",
            "Description...",
            "...",
            "Assigned (20171029)",
            "...",
            "...",
        ];

        const date = parseDateFromCVEEntry(CACHE_CVE_ENTRY);
        expect(date).to.equal("29-10-2017");
    });

    it("should correctly parse poorly-built cve cache entries", () => {
        const BAD_CACHE_CVE_ENTRY = [
            "CVE-2017-16028",
            "Candidate",
            "Description...",
            "...",
            "Bad field",
            "...",
            "...",
        ];

        const date = parseDateFromCVEEntry(BAD_CACHE_CVE_ENTRY);
        expect(date).to.be.undefined;
    });
});

describe("Regex builder from search queries", () => {
    it("should build regex expressions that accept all word separators for input search queries", () => {
        expect(buildRegexFromSearchQuery(" ")).to.deep.equal(/[:_.-\s]+/);
        expect(buildRegexFromSearchQuery("react")).to.deep.equal(/react/);

        expect(buildRegexFromSearchQuery("react native")).to.deep.equal(/react[:_.-\s]+native/);
        expect(buildRegexFromSearchQuery("react-native")).to.deep.equal(/react[:_.-\s]+native/);
        expect(buildRegexFromSearchQuery("react_native")).to.deep.equal(/react[:_.-\s]+native/);
        expect(buildRegexFromSearchQuery("react.native")).to.deep.equal(/react[:_.-\s]+native/);
        expect(buildRegexFromSearchQuery("react:native")).to.deep.equal(/react[:_.-\s]+native/);
        expect(buildRegexFromSearchQuery("react\tnative")).to.deep.equal(/react[:_.-\s]+native/);
        expect(buildRegexFromSearchQuery("react     native")).to.deep.equal(/react[:_.-\s]+native/);

        expect(buildRegexFromSearchQuery("node express js")).to.deep.equal(/node[:_.-\s]+express[:_.-\s]+js/);
        expect(buildRegexFromSearchQuery("node express.js")).to.deep.equal(/node[:_.-\s]+express[:_.-\s]+js/);
    });
});
