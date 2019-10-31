const Crawler = require("js-crawler");

const getDomainName = (url) => {
    const urlPattern = /^(?:https?:\/\/)?(?:w{3}\.)?([a-z\d-]+)\.(?:[a-z]{2,10})(?:[/\w-]*)*/;
    return url.match(urlPattern)[1];
};

const removeQueryParams = (url) => (
    url.split("?")[0]
);

const getCrawler = (domain, depth) => (new Crawler().configure({
    ignoreRelative: false,
    depth: depth,
    shouldCrawlLinksFrom: (url) => (
        url.indexOf(getDomainName(domain)) > 0
    ),
}));

const crawl = (crawler, domain) => {
    const domain_list = [];
    return new Promise((resolve) => {
        crawler.crawl({
            url: domain,
            success: (page) => {
                const url = removeQueryParams(page.url);
                if (!domain_list.includes(url)) {
                    domain_list.push(url);
                }
            },
            failure: (page) => {
                domain_list.push(page.status);
            },
            finished: () => {
                domain_list.sort();
                resolve(domain_list);
            },
        });
    });

};

const getDomainList = async (domain_name, depth_level) => {
    if (!domain_name) throw new Error("Missing Domain Name");
    if (!depth_level) throw new Error("Missing Depth Level");
    if (Number.isNAN(depth_level)) throw new Error("Depth Level must be a number");

    const crawler = getCrawler(domain_name, depth_level);
    const domain_list = await crawl(crawler, domain_name);
    return domain_list;
};

module.exports = {
    getDomainList,
};
