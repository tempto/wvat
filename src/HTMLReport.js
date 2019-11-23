const fs = require("fs");
const Mustache = require("mustache");
// const Logger = require("./Logger");
// const Config = require("./Config");
// const Log = new Logger(Config.flags).getLog();

const buildHTMLReport = (report_data) => {
    if (!report_data) throw new Error("Missing report data");

    const template = `
    <!DOCTYPE html>
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
        <div class="title"><b>Security analysis of {{{domain}}}</b><a href="{{{domain}}}"> &#128279;</a></div>
        <div class="description"><b>Report created on {{date}}</b></div>
        <div id="details">
          {{#details}}
            <div class="detail"><b>{{detail}}:</b> {{detail}}</div>
          {{/details}}
        </div>
      </header>
      <div class="report">
        <div class="subdomains">
          <div class="subtitle">Subdomains:</div>
          {{#subdomains}}
          <div class="subdomain" id="randomdomain.com">
            <div class="subdomain-url">
              <div class="dot orange">&#9679;</div><b>{{{path}}}</b><a href="{{{path}}}"> &#128279;</a>
            </div>
            <div class="endpoints">
              <div class="subtitle">Endpoints:</div>
              {{#endpoints}}
              <div class="endpoint">
                <div class="endpoint-url">
                  <div class="dot red">&#9679;</div><b>{{{endpoint}}}</b><a href="{{{endpoint}}}"> &#128279;</a>
                </div>
                <div class="links">
                  <div class="subtitle">Links:</div>
                  <div class="link">
                    {{#links}}
                    <div class="dot yellow">&#9679;</div><b>{{{.}}}</b><a href="{{{.}}}"> &#128279;</a>
                    {{/links}}
                  </div>
                </div>
                <div class="technologies">
                  <div class="subtitle">Technologies:</div>
                  {{#technologies}}
                  <div class="technology">
                    <div class="technology-name">
                      <div class="dot pink">&#9679;</div><b>{{name}}</b> ({{version}})
                    </div>
                    <div class="cves">
                      <div class="subtitle">CVE:</div>
                      {{#cves}}
                      <div class="cve">
                        <div class="cve-name">
                          <div class="dot green">&#9679;</div><b>{{cve}}</b><a href="{{{url}}}"> &#128279;</a>
                        </div>
                        <div class="cve-title">{{title}}</div>
                        <div class="cve-date">{{date}}</div>
                        <div class="exploits">
                          <div class="subtitle">Exploits:</div>
                          {{#exploits}}
                          <div class="exploit">
                            <div class="exploit-title">
                              <div class="dot blue">&#9679;</div><b>{{title}}</b><a href="{{{url}}}"> &#128279;</a>
                            </div>
                            <div class="cve-date">{{date}}</div>
                          </div>
                          {{/exploits}}
                        </div>
                      </div>
                      {{/cves}}
                    </div>
                  </div>
                  {{/technologies}}
                </div>
              </div>
              {{/endpoints}}
            </div>
          </div>
          {{/subdomains}}
        </div>
      </div>
    </body>

    </html>
    `;

    exportHTMLReport(Mustache.to_html(template, report_data), report_data.date);
    // return html_data;
    return 1;
};

const exportHTMLReport = (html_data, date) => {
    if (!html_data) throw new Error("Missing HTML data");
    if (!date) throw new Error("Missing date");

    fs.writeFile(`security_analysis_report_${date}.html`, html_data, (err) => {
        if (err) {
            // Log.error(err);
            // Log.error(`Error saving file: security_analysis_report_${date}.html`);
        }
    });
};

module.exports = {
    buildHTMLReport, exportHTMLReport,
};
