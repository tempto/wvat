const fs = require("fs");
const Mustache = require("mustache");
const Logger = require("./Logger");

const template =
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
    <div class="title"><b>Security analysis of {{{domain}}}</b><a href="{{{domain}}}"> &#128279;</a></div>
    <div class="description"><b>Report created on {{date}}</b></div>
    <div id="details">
      {{#details}}
        <div class="detail"><b>{{{tag}}}:</b> {{{content}}}</div>
      {{/details}}
    </div>
  </header>
  <div class="report">
    <div class="subdomains">
      <div class="title"><b>&#x2013;</b> Subdomains:</div>
      <div class="content">
        {{#subdomains}}
        <div class="subdomain" id="{{{path}}}">
          <div class="subdomain-url">
            <div class="dot orange">&#9679;</div><b>{{{path}}}</b><a href="{{{path}}}"> &#128279;</a>
          </div>
          <div class="endpoints">
            <div class="title"><b>&#x2013;</b> Endpoints:</div>
            <div class="content">
              {{#endpoints}}
              <div class="endpoint">
                <div class="endpoint-url">
                  <div class="dot red">&#9679;</div><b>{{{endpoint}}}</b><a href="{{{endpoint}}}"> &#128279;</a>
                </div>
                <div class="links">
                  <div class="title"><b>+</b> Links:</div>
                  <div class="content hidden">
                    {{#links}}
                    <div class="link">
                      <div class="dot yellow">&#9679;</div><b>{{{.}}}</b><a href="{{{.}}}"> &#128279;</a>
                    </div>
                    {{/links}}
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
                      {{#technologies}}
                      <tr class="table-content">
                        <td>{{name}}</td>
                        <td>{{version}}</td>
                        <td>
                          {{#cves}}
                          <div>{{cve}}</div>
                          {{/cves}}
                        </td>
                      </tr>
                      {{/technologies}}
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
                      {{#technologies}}
                      {{#cves}}
                      <tr class="table-content">
                        <td>{{cve}}</td>
                        <td>{{title}}</td>
                        <td>{{date}}</td>
                        <td><a href="{{{url}}}"> &#128279;</a></td>
                        <td>
                          {{#exploits}}
                          <div>{{title}}</div>
                          {{/exploits}}
                        </td>
                      </tr>
                      {{/cves}}
                      {{/technologies}}
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
                      {{#technologies}}
                      {{#cves}}
                      {{#exploits}}
                      <tr class="table-content">
                        <td>{{title}}</td>
                        <td>{{date}}</td>
                        <td><a href="{{{url}}}"> &#128279;</a></td>
                      </tr>
                      {{/exploits}}
                      {{/cves}}
                      {{/technologies}}
                    </table>
                  </div>
                </div>
              </div>
              {{/endpoints}}
            </div>
          </div>
        </div>
        {{/subdomains}}
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

/**
 * Renders the final HTML report, using the Mustache template
 * @param  {Object} report_data Final JSON report
 * @throws {Error} Missing report data
 * @return {string} Final HTML report
 */
const buildHTMLReport = (report_data) => {
    if (!report_data) throw new Error("Missing report data");
    return Mustache.render(template, updateDetailsStructure(report_data));
};

/**
 * Saves the rendered HTML report into a file
 * @param  {[type]} html_data Final HTML report
 * @param  {[type]} date Report date of creation
 * @throws {Error} Missing HTML data
 * @throws {Error} Missing date
 */
const exportHTMLReport = (html_data, date) => {
    if (!html_data) throw new Error("Missing HTML data");
    if (!date) throw new Error("Missing date");

    fs.writeFile(`security_analysis_report_${date}.html`, html_data, (err) => {
        if (err) {
            Logger.error(err);
            Logger.error(`Error saving file: security_analysis_report_${date}.html`);
        }
    });
};

/**
 * Clones the report data and updates the structure of the details from {tag: content} to [{tag: ..., content: ...}]
 * @param  {Object} report_data Final JSON report
 * @return {Object} updated JSON report
 */
const updateDetailsStructure = (report_data) => {
    const new_report_data = { ...report_data };
    const details = [];

    for (const key of Object.keys(report_data.details)) {
        details.push(
            {
                tag: key,
                content: report_data.details[key],
            },
        );
    }

    new_report_data.details = details;
    return new_report_data;
};

module.exports = {
    buildHTMLReport, exportHTMLReport,
};
