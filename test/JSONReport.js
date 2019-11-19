const { exportJSONReport, buildJSONReport } = require("../src/JSONReport");
const domain = "randomdomain.com";

const details = {
    whois: "bla",
    other: "...",
};

const paths = {
    "randomdomain.com": {
        links: ["randomdomain.com/page1", "randomdomain.com/page2"],
    },
    "sub1.randomdomain.com": {
        links: [],
    },
};

const endpoints = {
    "randomdomain.com/page1": {
        links: ["randomdomain.com/page2"],
        technologies: ["Windows"],
    },
    "randomdomain.com/page2": {
        links: [],
        technologies: ["Windows", "RandomTech"],
    },
};

const technologies = {
    "Windows": {
        version: "10.0.0.1",
        cves: ["CVE-2019-0001"],
    },
    "RandomTech": {
        version: "1.1",
        cves: ["CVE-2019-0002"],
    },
};

const cves = {
    "CVE-2019-0001": {
        title: "Example cve",
        date: "2019-01-01",
        url: "http://example-cvedb.com/cve-2019-0001",
        exploits: [
            {
                title: "Example exploit",
                date: "2019-01-02",
                url: "http://example-exploitdb.com/exploit-00000001",
            },
        ],
    },
    "CVE-2019-0002": {
        title: "Another cve",
        date: "2019-10-01",
        url: "http://example-cvedb.com/cve-2019-0002",
        exploits: [
            {
                title: "Another exploit",
                date: "2019-10-02",
                url: "http://example-exploitdb.com/exploit-00000002",
            },
        ],
    },
};

describe("JSON Report tests", () => {
    describe("Create and save the JSON report given the fetched data", () => {
        it("should build the JSON report", () => {
            const date = new Date().toISOString().slice(0, 10);
            expect(buildJSONReport(domain, details, paths, endpoints, technologies, cves)).toEqual(
                {
                    "domain": "randomdomain.com",
                    "date": date,
                    "details": {
                        "whois": "bla",
                        "other": "...",
                    },
                    "subdomains": [
                        {
                            "path": "randomdomain.com",
                            "endpoints": [
                                {
                                    "endpoint": "randomdomain.com/page1",
                                    "links": [
                                        "randomdomain.com/page2",
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
                                    "endpoint": "randomdomain.com/page2",
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
                            "path": "sub1.randomdomain.com",
                            "endpoints": [],
                        },
                    ],
                },
            );
        });

        it("should fail when the domain is missing", () => {
            expect(() => buildJSONReport()).toThrowError(new Error("Missing domain"));
        });

        it("should fail when the details are missing", () => {
            expect(() => buildJSONReport(domain)).toThrowError(new Error("Missing details"));
        });

        it("should fail when the paths are missing", () => {
            expect(() => buildJSONReport(domain, details)).toThrowError(new Error("Missing paths"));
        });

        it("should fail when the endpoints are missing", () => {
            expect(() => buildJSONReport(domain, details, paths)).toThrowError(new Error("Missing endpoints"));
        });

        it("should fail when the technologies are missing", () => {
            expect(() => buildJSONReport(domain, details, paths, endpoints)).toThrowError(new Error("Missing technologies"));
        });

        it("should fail when the cves are missing", () => {
            expect(() => buildJSONReport(domain, details, paths, endpoints, technologies)).toThrowError(new Error("Missing CVE"));
        });

        it("should fail when the report data is missing", () => {
            expect(() => exportJSONReport()).toThrowError(new Error("Missing report data"));
        });
    });
});
