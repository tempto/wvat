module.exports =
`<!DOCTYPE html>
<html>
    <head>
        <style>
            body {
                width: 100%;
                margin: 0;
            }

            body {
              font-family: sans-serif;
            }
        
            a {
              text-decoration: none;
              color: inherit;
              font-weight: bold;
            }

            a.link {
                font-weight: normal;
                margin-left: 0.2em;
                font-size: 1.1em;
            }

            .subdomains a.link:hover {
                text-decoration: none;
            }

            header {
                padding: 0.4em;
                color: white;
                text-align: center;
                padding-bottom: 1em;
            }

            header .wvat {
                font-size: 2em;
            }

            header .wvat::first-letter {
                color: #fcca03;
            }

            header .title {
                margin-top: 0.6em;
                font-size: 1.5em;
                margin-bottom: 0.35em;
            }

            header .title a {
                text-decoration: underline;
            }

            header .date {
                font-size: 1.3em;
            }

            .pl {
                padding-left: 1.5em;
            }

            .pll {
                padding-left: 2.5em;
            }

            .plll {
                padding-left: 3em;
            }

            .subdomain {
                padding-bottom: 0.7em;
            }

            header {
                background-color: #4f99d6;
            }

            .page-content {
                padding-left: 0.8em;
                line-height: 150%;
            }

            .subdomains a:hover {
                text-decoration: underline;
            }

            .hidden {
                display: none;
            }

            .toggler {
                margin-right: 0.3em;
                font-family: monospace;
                font-weight: bold;
                font-size: 1.2em;
            }

            .collapser {
                cursor: pointer;
                -webkit-touch-callout: none;
                -webkit-user-select: none;
                -khtml-user-select: none;
                -moz-user-select: none;
                -ms-user-select: none;
                user-select: none;
            }

            ul, li {
                margin: 0;
                padding: 0;
            }

            .technology:last-child, .cve:last-child, .exploit:last-child {
                margin-bottom: 0.5em;
            }

            .exploit a.url {
                font-weight: normal;
            }

            .network-info-item {
                margin-bottom: 0.45em;
                margin-top: 0.45em;
            }

            .not-availabe {
                color: #a0a0a0;
                font-style: italic;
            }

            .count-indicator:first-child {
                margin-left: 0.5em;
            }

            .count-indicator ~ .count-indicator {
                margin-left: 0.35em;
            }

            .num-pages {
                color: #215d8f;
            }

            .num-techs {
                color: #8f791f;
            }

            .num-cves {
                color: red;
            }
        </style>
    </head>

    <body>
        <header>
            <h1 class="wvat">WVAT - Web Vulnerability Assessment Tool</h1>
            <div class="title">Analysis of <a href="{{domain}}">{{domain}}</a></div>
            <div class="date">Report date: <strong>{{date}}</strong></div>
        </header>
        <div class="page-content">
            <div class="subdomains">
                <h2>Analysis Results</h2>
                {{#subdomains}}
                    <div class="subdomain" id="subdomain_{{name}}">
                        <div class="collapser">
                            <span class="toggler">-</span>
                            <span class="url">{{name}}</span>
                            <a class="link" href={{name}} target="_blank">
                                &#x1f517;
                            </a>
                            <span class="count-indicator num-pages">{{pages.length}} pages</span>
                        </div>
                        {{#pages}}
                            <div class="page pl collapsable" id="page_{{name}}">
                                <div class="collapser">
                                    <span class="toggler">+</span>
                                    <span class="url">{{name}}</span>
                                    <a class="link" href={{name}} target="_blank">
                                        &#x1f517;
                                    </a>
                                    <span>
                                        <span class="count-indicator num-techs">{{technologies.length}} technologies</span>
                                        <span class="count-indicator num-cves">{{num_cves}} cves</span>
                                    </span>
                                </div>
                                {{#technologies}}
                                    <div class="technology pl collapsable hidden" id="technology_{{name}}">
                                        <div class="collapser">
                                            <span class="toggler">+</span>
                                            <span>{{name}}</span>
                                        </div>
                                        {{#cves}}
                                            <div class="cve pl collapsable hidden" id="cve_{{id}}">
                                                <div class="collapser">
                                                    <span class="toggler">+</span>
                                                    <span>{{id}}</span>
                                                </div>
                                                <div class="cve-info pll collapsable hidden" id="cve_info_{{id}}">
                                                    {{#date}}
                                                        <div class="cve-info-date">
                                                            <strong>Date</strong>: {{date}}
                                                        </div>
                                                    {{/date}}
                                                    {{#status}}
                                                        <div class="cve-info-status">
                                                            <strong>Status</strong>: {{status}}
                                                        </div>
                                                    {{/status}}
                                                    <div class="cve-info-description">
                                                        <strong>Description</strong>: {{description}}
                                                    </div>
                                                    <div class="cve-info-exploits">
                                                        <strong>Exploits</strong>:
                                                        <ul class="cve-info-exploits-list pl">
                                                            {{#exploits}}
                                                                <li class="exploit">
                                                                    <a class="url" href="{{.}}" target="_blank">{{.}}</a>
                                                                    <a class="link" href="{{.}}" target="_blank">
                                                                        &#x1f517;
                                                                    </a>
                                                                </li>
                                                            {{/exploits}}
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        {{/cves}}
                                    </div>
                                {{/technologies}}
                            </div>
                        {{/pages}}
                    </div>
                {{/subdomains}}
            </div>
        </div>
    </body>

    <script defer>
        document.querySelectorAll(".link").forEach((link) => {
            link.addEventListener("click", (e) => {
                e.stopPropagation();
            });
        });

        const collapsers = document.querySelectorAll(".collapser");
        collapsers.forEach((collapser) => {
            collapser.addEventListener("click", (e) => {
                const toggler = collapser.querySelector(".toggler")
                toggler.textContent = toggler.textContent === "+" ? "-" : "+";
                collapser.parentNode.querySelectorAll(":scope > .collapsable").forEach((collapsable) => {
                    collapsable.classList.toggle('hidden');
                })

            })
        });
    </script>
</html>`;
