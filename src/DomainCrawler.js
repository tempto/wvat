const Crawler = require("js-crawler");

const domain = "https://www.github.com/";

const getDomainName = (url) => {
    const urlPattern = /^(?:https?:\/\/)?(?:w{3}\.)?([a-z\d-]+)\.(?:[a-z]{2,10})(?:[/\w-]*)*/;
    return url.match(urlPattern)[1];
};

const removeQueryParams = (url) => (
    url.split("?")[0]
);

const domains = [];

const crawler = new Crawler().configure({
    ignoreRelative: false,
    depth: 2,
    shouldCrawlLinksFrom: (url) => (
        url.indexOf(getDomainName(domain)) > 0
    ),
});

crawler.crawl({
    url: domain,
    success: (page) => {
        const url = removeQueryParams(page.url);
        if (!domains.includes(url)) {
            domains.push(url);
        }
    },
    failure: (page) => {
        domains.push(page.status);
    },
    finished: () => {
        domains.sort();
    },
});
