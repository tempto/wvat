const { buildHTMLReport, exportHTMLReport } = require("../src/HTMLReport");

const report_data = {
    "domain": "https://randomdomain.com",
    "date": "2019-11-23",
    "details": {
        "whois": "bla",
        "other": "...",
    },
    "subdomains": [
        {
            "path": "https://randomdomain.com",
            "endpoints": [
                {
                    "endpoint": "https://randomdomain.com/page1",
                    "links": [
                        "https://randomdomain.com/page2",
                    ],
                    "technologies": [
                        {
                            "name": "Windows",
                            "version": "10.0.0.1",
                            "cves": [
                                {
                                    "cve": "CVE-2019-0001",
                                    "title": "Example cve",
                                    "date": "2019-01-01",
                                    "url": "http://example-cvedb.com/cve-2019-0001",
                                    "exploits": [
                                        {
                                            "title": "Example exploit",
                                            "date": "2019-01-02",
                                            "url": "http://example-exploitdb.com/exploit-00000001",
                                        },
                                    ],
                                },
                            ],
                        },
                    ],
                },
                {
                    "endpoint": "https://randomdomain.com/page2",
                    "links": [],
                    "technologies": [
                        {
                            "name": "Windows",
                            "version": "10.0.0.1",
                            "cves": [
                                {
                                    "cve": "CVE-2019-0001",
                                    "title": "Example cve",
                                    "date": "2019-01-01",
                                    "url": "http://example-cvedb.com/cve-2019-0001",
                                    "exploits": [
                                        {
                                            "title": "Example exploit",
                                            "date": "2019-01-02",
                                            "url": "http://example-exploitdb.com/exploit-00000001",
                                        },
                                    ],
                                },
                            ],
                        },
                        {
                            "name": "RandomTech",
                            "version": "1.1",
                            "cves": [
                                {
                                    "cve": "CVE-2019-0002",
                                    "title": "Another cve",
                                    "date": "2019-10-01",
                                    "url": "http://example-cvedb.com/cve-2019-0002",
                                    "exploits": [
                                        {
                                            "title": "Another exploit",
                                            "date": "2019-10-02",
                                            "url": "http://example-exploitdb.com/exploit-00000002",
                                        },
                                    ],
                                },
                            ],
                        },
                    ],
                },
            ],
        },
        {
            "path": "https://sub1.randomdomain.com",
            "endpoints": [],
        },
    ],
};

describe("HTML Report tests", () => {
    describe("Create and save the HTML report given the fetched data", () => {

        it("should build when the report data is missing", () => {
            expect(buildHTMLReport(report_data)).toEqual(1);
        });

        it("should fail when the report data is missing", () => {
            expect(() => buildHTMLReport()).toThrowError(new Error("Missing report data"));
        });

        it("should fail when the HTML data is missing", () => {
            expect(() => exportHTMLReport()).toThrowError(new Error("Missing HTML data"));
        });

        it("should fail when the date is missing", () => {
            expect(() => exportHTMLReport(buildHTMLReport(report_data))).toThrowError(new Error("Missing date"));
        });

    });
});
