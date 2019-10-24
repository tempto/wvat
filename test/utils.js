const { isValidCVE, isValidURL } = require("../src/utils");

const chai = require("chai"),
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
});
