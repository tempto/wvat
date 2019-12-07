const { buildHTMLReport, exportHTMLReport, countCVEsPerPage } = require("../src/html-report/HTMLReport");
const chai = require("chai"),
    expect = chai.expect,
    should = chai.should(); // eslint-disable-line

const report_data = {
    "domain": "https://up.pt",
    "date": "10-06-2017",
    "network": {
        "ipv4": [
            "172.217.17.14",
            "156.218.16.15",
        ],
        "ipv6": [
            "2a00:1450:4003:802::200e",
        ],
        "mx_records": [
            {
                "exchange": "alt4.aspmx.l.google.com",
                "priority": 50,
            },
            {
                "exchange": "alt3.aspmx.l.google.com",
                "priority": 40,
            },
            {
                "exchange": "alt2.aspmx.l.google.com",
                "priority": 30,
            },
            {
                "exchange": "alt1.aspmx.l.google.com",
                "priority": 20,
            },
            {
                "exchange": "aspmx.l.google.com",
                "priority": 10,
            },
        ],
        "txt_records": [
            "facebook-domain-verification=22rm551cu4k0ab0bxsw536tlds4h95",
            "v=spf1 include:_spf.google.com ~all",
            "globalsign-smime-dv=CDYX+XFHUw2wml6/Gb8+59BsH31KzUr6c1l2BPvqKX8=",
            "docusign=05958488-4752-4ef2-95eb-aa7ba8a3bd0e",
            "docusign=1b0a6754-49b1-4db5-8540-d2c12664b289",
        ],
        "ns_records": [
            "ns3.google.com",
            "ns2.google.com",
            "ns4.google.com",
            "ns1.google.com",
        ],
        "soa_records": {
            "nsname": "ns1.google.com",
            "hostmaster": "dns-admin.google.com",
            "serial": 283937355,
            "refresh": 900,
            "retry": 900,
            "expire": 1800,
            "minttl": 60,
        },
        "location": {
            "country": "US",
            "countryCode": "US",
            "region": "New York",
            "regionCode": "",
            "city": "New York City",
            "postal": "10004",
            "latitude": 40.7143,
            "longitude": -74.006,
            "timezone": "America/New_York",
        },
    },
    "subdomains": [
        {
            "name": "up.pt",
            "pages": [
                {
                    "name": "up.pt/about",
                    "technologies": [
                        {
                            "name": "React Native",
                            "cves": [
                                {
                                    "id": "CVE-2018-2020",
                                    "date": "10-02-2018",
                                    "status": "Candidate",
                                    "description": "Lorem",
                                    "exploits": [
                                        "https://google.com",
                                        "https://youtube.com",
                                    ],
                                },
                                {
                                    "id": "CVE-2018-2020",
                                    "date": "10-02-2018",
                                    "status": "Candidate",
                                    "description": "Lorem",
                                    "exploits": [
                                        "https://google.com",
                                        "https://youtube.com",
                                    ],
                                },
                            ],
                        },
                        {
                            "name": "Bootstrap",
                            "cves": [
                                {
                                    "id": "CVE-2017-2020",
                                    "description": "Lorem",
                                    "exploits": [
                                        "https://google.com",
                                        "https://youtube.com",
                                    ],
                                },
                                {
                                    "id": "CVE-2017-2020",
                                    "description": "Lorem",
                                    "exploits": [
                                        "https://google.com",
                                        "https://youtube.com",
                                    ],
                                },
                                {
                                    "id": "CVE-2017-2020",
                                    "description": "Lorem",
                                    "exploits": [
                                        "https://google.com",
                                        "https://youtube.com",
                                    ],
                                },
                                {
                                    "id": "CVE-2017-2020",
                                    "description": "Lorem",
                                    "exploits": [
                                        "https://google.com",
                                        "https://youtube.com",
                                    ],
                                },
                                {
                                    "id": "CVE-2017-2020",
                                    "description": "Lorem",
                                    "exploits": [
                                        "https://google.com",
                                        "https://youtube.com",
                                    ],
                                },
                            ],
                        },
                    ],
                },
                {
                    "name": "up.pt/login",
                    "technologies": [
                        {
                            "name": "React Native",
                            "cves": [
                                {
                                    "id": "CVE-2018-2020",
                                    "date": "10-02-2018",
                                    "status": "Candidate",
                                    "description": "Lorem",
                                    "exploits": [
                                        "https://google.com",
                                        "https://youtube.com",
                                    ],
                                },
                            ],
                        },
                        {
                            "name": "Bootstrap",
                            "cves": [
                                {
                                    "id": "CVE-2018-2020",
                                    "date": "10-02-2018",
                                    "status": "Candidate",
                                    "description": "Lorem",
                                    "exploits": [
                                        "https://google.com",
                                        "https://youtube.com",
                                    ],
                                },
                            ],
                        },
                    ],
                },
            ],
        },
        {
            "name": "med.up.pt",
            "pages": [
                {
                    "name": "med.up.pt/about",
                    "technologies": [
                        {
                            "name": "React Native",
                            "cves": [
                                {
                                    "id": "CVE-2018-2020",
                                    "date": "10-02-2018",
                                    "status": "Candidate",
                                    "description": "Lorem",
                                    "exploits": [
                                        "https://google.com",
                                        "https://youtube.com",
                                    ],
                                },
                            ],
                        },
                        {
                            "name": "Bootstrap",
                            "cves": [
                                {
                                    "id": "CVE-2018-2020",
                                    "description": "Lorem",
                                    "exploits": [
                                        "https://google.com",
                                        "https://youtube.com",
                                    ],
                                },
                            ],
                        },
                    ],
                },
                {
                    "name": "med.up.pt/login",
                    "technologies": [
                        {
                            "name": "React Native",
                            "cves": [
                                {
                                    "id": "CVE-2018-2020",
                                    "date": "10-02-2018",
                                    "status": "Candidate",
                                    "description": "Lorem",
                                    "exploits": [
                                        "https://google.com",
                                        "https://youtube.com",
                                    ],
                                },
                            ],
                        },
                        {
                            "name": "Bootstrap",
                            "cves": [
                                {
                                    "id": "CVE-2018-2020",
                                    "date": "10-02-2018",
                                    "status": "Candidate",
                                    "description": "Lorem",
                                    "exploits": [
                                        "https://google.com",
                                        "https://youtube.com",
                                    ],
                                },
                                {
                                    "id": "CVE-2017-2020",
                                    "description": "Lorem",
                                    "exploits": [
                                        "https://google.com",
                                        "https://youtube.com",
                                    ],
                                },
                                {
                                    "id": "CVE-2017-2020",
                                    "description": "Lorem",
                                    "exploits": [
                                        "https://google.com",
                                        "https://youtube.com",
                                    ],
                                },
                            ],
                        },
                    ],
                },
            ],
        },
    ],
};

describe("HTML Report tests", () => {
    describe("Create and save the HTML report given the fetched data", () => {

        it("should build the HTML report", () => {
            buildHTMLReport(report_data).should.not.be.undefined;
        });

        it("should fail when the report data is missing", () => {
            expect(buildHTMLReport).to.throw("Missing report data");
        });

        it("should fail when the html data is missing", () => {
            expect(exportHTMLReport).to.throw("Missing HTML data");
        });

        it("should count the CVES per page", () => {
            countCVEsPerPage(report_data);
            report_data.subdomains[0].pages[0].num_cves.should.equal(7);
            report_data.subdomains[0].pages[1].num_cves.should.equal(2);
            report_data.subdomains[1].pages[0].num_cves.should.equal(2);
            report_data.subdomains[1].pages[1].num_cves.should.equal(4);
        });
    });
});
