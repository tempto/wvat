const { buildHTMLReport, exportHTMLReport } = require("../src/HTMLReport");

const report_data = {
    "domain": "randomdomain.com",
    "date": "2019-11-23",
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
                                    "url": "example-cvedb.com/cve-2019-0001",
                                    "exploits": [
                                        {
                                            "title": "Example exploit",
                                            "date": "2019-01-02",
                                            "url": "example-exploitdb.com/exploit-1",
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
                                    "url": "example-cvedb.com/cve-2019-0001",
                                    "exploits": [
                                        {
                                            "title": "Example exploit",
                                            "date": "2019-01-02",
                                            "url": "example-exploitdb.com/exploit-1",
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
                                    "url": "example-cvedb.com/cve-2019-0002",
                                    "exploits": [
                                        {
                                            "title": "Another exploit",
                                            "date": "2019-10-02",
                                            "url": "example-exploitdb.com/exploit-2",
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
};

const html_data =
`<!DOCTYPE html>
<html>

<head>
  <style>
    :root {
      --orange: #f9812a;
      --red: #ff0800;
      --yellow: #ffc30b;
      --green: #33d96d;
      --pink: #fc4dac;
      --blue: #4286f4;
    }

    body {
      width: 100%;
      margin: 0;
    }

    div {
      font-family: sans-serif;
    }

    a {
      text-decoration: none;
      color: inherit;
    }

    header {
      background: var(--blue);
      padding: 1em;
    }

    header div {
      text-align: center;
      color: white;
    }

    header .title {
      font-size: x-large;
    }

    header .description {
      font-size: larger;
    }

    .report {
      padding: 2em;
    }

    .title {
      font-size: 75%
    }

    #details {
      color: white;
    }

    .detail {
      display: inline-block;
      padding: 0.33em;
      border-radius: 0.25em;
      background-color: rgba(1, 1, 1, 0.25);
      margin-top: 0.5em;
    }

    .dot {
      display: inline-block;
      margin-right: 5px;
    }

    .dot.orange {
      color: var(--orange);
    }

    .dot.red {
      color: var(--red);
    }

    .dot.yellow {
      color: var(--yellow);
    }

    .dot.green {
      color: var(--green);
    }

    .dot.pink {
      color: var(--pink);
    }

    .dot.blue {
      color: var(--blue);
    }

    .endpoints,
    .technologies,
    .cves,
    .links,
    .exploits {
      margin-left: 1em;
    }

    .subdomains .subtitle {
      font-size: 1.175em;
      font-weight: bold;
    }

    @media print {
      header {
        background: #c9c9c9;
      }

      header .description, header .title,  header .detail {
        color: black;
      }
    }
  </style>
</head>

<body>
  <header>
    <div class="title"><b>Security analysis of randomdomain.com</b><a href="randomdomain.com"> &#128279;</a></div>
    <div class="description"><b>Report created on 2019-11-23</b></div>
    <div id="details">
        <div class="detail"><b>whois:</b> bla</div>
        <div class="detail"><b>other:</b> ...</div>
    </div>
  </header>
  <div class="report">
    <div class="subdomains">
      <div class="subtitle">Subdomains:</div>
      <div class="subdomain" id="randomdomain.com">
        <div class="subdomain-url">
          <div class="dot orange">&#9679;</div><b>randomdomain.com</b><a href="randomdomain.com"> &#128279;</a>
        </div>
        <div class="endpoints">
          <div class="subtitle">Endpoints:</div>
          <div class="endpoint">
            <div class="endpoint-url">
              <div class="dot red">&#9679;</div><b>randomdomain.com/page1</b><a href="randomdomain.com/page1"> &#128279;</a>
            </div>
            <div class="links">
              <div class="subtitle">Links:</div>
              <div class="link">
                <div class="dot yellow">&#9679;</div><b>randomdomain.com/page2</b><a href="randomdomain.com/page2"> &#128279;</a>
              </div>
            </div>
            <div class="technologies">
              <div class="subtitle">Technologies:</div>
              <div class="technology">
                <div class="technology-name">
                  <div class="dot pink">&#9679;</div><b>Windows</b> (10.0.0.1)
                </div>
                <div class="cves">
                  <div class="subtitle">CVE:</div>
                  <div class="cve">
                    <div class="cve-name">
                      <div class="dot green">&#9679;</div><b>CVE-2019-0001</b><a href="example-cvedb.com/cve-2019-0001"> &#128279;</a>
                    </div>
                    <div class="cve-title">Example cve</div>
                    <div class="cve-date">2019-01-01</div>
                    <div class="exploits">
                      <div class="subtitle">Exploits:</div>
                      <div class="exploit">
                        <div class="exploit-title">
                          <div class="dot blue">&#9679;</div><b>Example exploit</b><a href="example-exploitdb.com/exploit-1"> &#128279;</a>
                        </div>
                        <div class="cve-date">2019-01-02</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="endpoint">
            <div class="endpoint-url">
              <div class="dot red">&#9679;</div><b>randomdomain.com/page2</b><a href="randomdomain.com/page2"> &#128279;</a>
            </div>
            <div class="links">
              <div class="subtitle">Links:</div>
              <div class="link">
              </div>
            </div>
            <div class="technologies">
              <div class="subtitle">Technologies:</div>
              <div class="technology">
                <div class="technology-name">
                  <div class="dot pink">&#9679;</div><b>Windows</b> (10.0.0.1)
                </div>
                <div class="cves">
                  <div class="subtitle">CVE:</div>
                  <div class="cve">
                    <div class="cve-name">
                      <div class="dot green">&#9679;</div><b>CVE-2019-0001</b><a href="example-cvedb.com/cve-2019-0001"> &#128279;</a>
                    </div>
                    <div class="cve-title">Example cve</div>
                    <div class="cve-date">2019-01-01</div>
                    <div class="exploits">
                      <div class="subtitle">Exploits:</div>
                      <div class="exploit">
                        <div class="exploit-title">
                          <div class="dot blue">&#9679;</div><b>Example exploit</b><a href="example-exploitdb.com/exploit-1"> &#128279;</a>
                        </div>
                        <div class="cve-date">2019-01-02</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="technology">
                <div class="technology-name">
                  <div class="dot pink">&#9679;</div><b>RandomTech</b> (1.1)
                </div>
                <div class="cves">
                  <div class="subtitle">CVE:</div>
                  <div class="cve">
                    <div class="cve-name">
                      <div class="dot green">&#9679;</div><b>CVE-2019-0002</b><a href="example-cvedb.com/cve-2019-0002"> &#128279;</a>
                    </div>
                    <div class="cve-title">Another cve</div>
                    <div class="cve-date">2019-10-01</div>
                    <div class="exploits">
                      <div class="subtitle">Exploits:</div>
                      <div class="exploit">
                        <div class="exploit-title">
                          <div class="dot blue">&#9679;</div><b>Another exploit</b><a href="example-exploitdb.com/exploit-2"> &#128279;</a>
                        </div>
                        <div class="cve-date">2019-10-02</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="subdomain" id="randomdomain.com">
        <div class="subdomain-url">
          <div class="dot orange">&#9679;</div><b>sub1.randomdomain.com</b><a href="sub1.randomdomain.com"> &#128279;</a>
        </div>
        <div class="endpoints">
          <div class="subtitle">Endpoints:</div>
        </div>
      </div>
    </div>
  </div>
</body>

</html>`;

describe("HTML Report tests", () => {
    describe("Create and save the HTML report given the fetched data", () => {

        it("should build the HTML report", () => {
            expect(buildHTMLReport(report_data)).toEqual(html_data);
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
