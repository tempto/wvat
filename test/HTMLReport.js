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

    .subdomains .title {
      font-size: 1.175em;
      font-weight: bold;
      margin-top: 0.25em;
    }

    .subdomains .subtitle {
      font-size: 1em;
      margin-top: 0.25em;
    }

    table {
      border-collapse: collapse;
      width: 100%;
      margin: 1em 0em;
    }

    th, td {
      padding: 8px;
      text-align: left;
      border-bottom: 1px solid #ddd;
    }

    tr.table-content:hover {
      background-color:#f5f5f5;
    }

    .hidden {
      display: none;
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
      <div class="title"><b>&#x2013;</b> Subdomains:</div>
      <div class="content">
        <div class="subdomain" id="randomdomain.com">
          <div class="subdomain-url">
            <div class="dot orange">&#9679;</div><b>randomdomain.com</b><a href="randomdomain.com"> &#128279;</a>
          </div>
          <div class="endpoints">
            <div class="title"><b>&#x2013;</b> Endpoints:</div>
            <div class="content">
              <div class="endpoint">
                <div class="endpoint-url">
                  <div class="dot red">&#9679;</div><b>randomdomain.com/page1</b><a href="randomdomain.com/page1"> &#128279;</a>
                </div>
                <div class="links">
                  <div class="title"><b>+</b> Links:</div>
                  <div class="content hidden">
                    <div class="link">
                      <div class="dot yellow">&#9679;</div><b>randomdomain.com/page2</b><a href="randomdomain.com/page2"> &#128279;</a>
                    </div>
                  </div>
                </div>
                <div class="technologies">
                  <div class="title"><b>+</b> Technologies:</div>
                  <div class="content hidden">
                    <table>
                      <tr>
                        <th>Name</th>
                        <th>Version</th>
                        <th>CVE</th>
                      </tr>
                      <tr class="table-content">
                        <td>Windows</td>
                        <td>10.0.0.1</td>
                        <td>
                          <div>CVE-2019-0001</div>
                        </td>
                      </tr>
                    </table>
                  </div>
                </div>
                <div class="cves">
                  <div class="title"><b>+</b> CVE:</div>
                  <div class="content hidden">
                    <table>
                      <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Date</th>
                        <th>URL</th>
                        <th>Exploits</th>
                      </tr>
                      <tr class="table-content">
                        <td>CVE-2019-0001</td>
                        <td>Example cve</td>
                        <td>2019-01-01</td>
                        <td><a href="example-cvedb.com/cve-2019-0001"> &#128279;</a></td>
                        <td>
                          <div>Example exploit</div>
                        </td>
                      </tr>
                    </table>
                  </div>
                </div>
                <div class="exploits">
                  <div class="title"><b>+</b> Exploits:</div>
                  <div class="content hidden">
                    <table>
                      <tr>
                        <th>Title</th>
                        <th>Date</th>
                        <th>URL</th>
                      </tr>
                      <tr class="table-content">
                        <td>Example exploit</td>
                        <td>2019-01-02</td>
                        <td><a href="example-exploitdb.com/exploit-1"> &#128279;</a></td>
                      </tr>
                    </table>
                  </div>
                </div>
              </div>
              <div class="endpoint">
                <div class="endpoint-url">
                  <div class="dot red">&#9679;</div><b>randomdomain.com/page2</b><a href="randomdomain.com/page2"> &#128279;</a>
                </div>
                <div class="links">
                  <div class="title"><b>+</b> Links:</div>
                  <div class="content hidden">
                  </div>
                </div>
                <div class="technologies">
                  <div class="title"><b>+</b> Technologies:</div>
                  <div class="content hidden">
                    <table>
                      <tr>
                        <th>Name</th>
                        <th>Version</th>
                        <th>CVE</th>
                      </tr>
                      <tr class="table-content">
                        <td>Windows</td>
                        <td>10.0.0.1</td>
                        <td>
                          <div>CVE-2019-0001</div>
                        </td>
                      </tr>
                      <tr class="table-content">
                        <td>RandomTech</td>
                        <td>1.1</td>
                        <td>
                          <div>CVE-2019-0002</div>
                        </td>
                      </tr>
                    </table>
                  </div>
                </div>
                <div class="cves">
                  <div class="title"><b>+</b> CVE:</div>
                  <div class="content hidden">
                    <table>
                      <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Date</th>
                        <th>URL</th>
                        <th>Exploits</th>
                      </tr>
                      <tr class="table-content">
                        <td>CVE-2019-0001</td>
                        <td>Example cve</td>
                        <td>2019-01-01</td>
                        <td><a href="example-cvedb.com/cve-2019-0001"> &#128279;</a></td>
                        <td>
                          <div>Example exploit</div>
                        </td>
                      </tr>
                      <tr class="table-content">
                        <td>CVE-2019-0002</td>
                        <td>Another cve</td>
                        <td>2019-10-01</td>
                        <td><a href="example-cvedb.com/cve-2019-0002"> &#128279;</a></td>
                        <td>
                          <div>Another exploit</div>
                        </td>
                      </tr>
                    </table>
                  </div>
                </div>
                <div class="exploits">
                  <div class="title"><b>+</b> Exploits:</div>
                  <div class="content hidden">
                    <table>
                      <tr>
                        <th>Title</th>
                        <th>Date</th>
                        <th>URL</th>
                      </tr>
                      <tr class="table-content">
                        <td>Example exploit</td>
                        <td>2019-01-02</td>
                        <td><a href="example-exploitdb.com/exploit-1"> &#128279;</a></td>
                      </tr>
                      <tr class="table-content">
                        <td>Another exploit</td>
                        <td>2019-10-02</td>
                        <td><a href="example-exploitdb.com/exploit-2"> &#128279;</a></td>
                      </tr>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="subdomain" id="sub1.randomdomain.com">
          <div class="subdomain-url">
            <div class="dot orange">&#9679;</div><b>sub1.randomdomain.com</b><a href="sub1.randomdomain.com"> &#128279;</a>
          </div>
          <div class="endpoints">
            <div class="title"><b>&#x2013;</b> Endpoints:</div>
            <div class="content">
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</body>

<script defer>
const titles = document.querySelectorAll(".report .title b");
const content = document.querySelectorAll(".report .content");

for(let i = 0; i < titles.length; i++)
  titles[i].addEventListener('click', (event) => {
    let icon = event.target.parentElement.parentElement.querySelector('.content').classList.toggle('hidden')? "+" : "&#x2013;";
    event.target.parentElement.querySelector('b').innerHTML = icon;
  });

for(let i = 0; i < content.length; i++)
  if(content[i].childNodes.length == 1)
    content[i].innerHTML = '<div class="subtitle">Nothing to show here</div>';
</script>

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
