const { isValidCVE, isValidURL } = require("../src/utils");

describe("CVE validor util tests", () => {
    it("should validate correct CVEs", () => {
        expect(isValidCVE("CVE-2015-1234")).toEqual(true);
        expect(isValidCVE("2015-1234")).toEqual(true);
        expect(isValidCVE("CVE-2015-1234567")).toEqual(true);
        expect(isValidCVE("2015-1234567")).toEqual(true);
    });

    it("should not validate incorrect CVEs", () => {
        expect(isValidCVE("CVE-22015-1234")).toEqual(false);
        expect(isValidCVE("22015-1234")).toEqual(false);
        expect(isValidCVE("-2015-1234")).toEqual(false);
    });
});

describe("URL validor util tests", () => {
    it("should validate correct URLs", () => {
        expect(isValidURL("https://www.example.com")).toEqual(true);
        expect(isValidURL("http://www.example.com")).toEqual(true);
        expect(isValidURL("www.example.com")).toEqual(true);
        expect(isValidURL("example.com")).toEqual(true);
        expect(isValidURL("http://blog.example.com")).toEqual(true);
        expect(isValidURL("http://www.example.com/product")).toEqual(true);
        expect(isValidURL("http://www.example.com/products?id=1&page=2")).toEqual(true);
        expect(isValidURL("http://www.example.com#up")).toEqual(true);
        expect(isValidURL("http://255.255.255.255")).toEqual(true);
        expect(isValidURL("255.255.255.255")).toEqual(true);
        expect(isValidURL("http://www.site.com:8008")).toEqual(true);
    });

    it("should not validate incorrect URLs", () => {
        expect(isValidURL("http://invalid.com/perl.cgi?key= | http://web-site.com/cgi-bin/perl.cgi?key1=value1&key2")).toEqual(false);
        expect(isValidURL("http://example://example.com")).toEqual(false);
        expect(isValidURL("httpsftp://example.com")).toEqual(false);
    });
});
