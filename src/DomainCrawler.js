const Crawler = require("js-crawler");
const storage = require("node-persist");
const { URL_REGEX } = require("../src/utils");

const initStorage = () => (
    storage.init({
        dir: ".domainscache",
    })
);

const getDomainName = (url) => (
    url.match(URL_REGEX)[1]
);

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

const crawl = (crawler, domain_name) => {
    const domain_list = [];
    return new Promise((resolve) => {
        crawler.crawl({
            url: domain_name,
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

const getDomainList = async (domain_name, depth_level = 2) => {
    if (!domain_name) throw new Error("Missing Domain Name");
    if (isNaN(depth_level)) throw new Error("Depth Level must be a number");
    if (depth_level <= 0) throw new Error("Depth Level must be a positive number");

    const domain_key = `${domain_name}-${depth_level}`;

    await initStorage();
    const cached_list = await storage.getItem(domain_key);

    if (!cached_list) {
        const crawler = getCrawler(domain_name, depth_level);
        const domain_list = await crawl(crawler, domain_name);
        storage.setItem(domain_key, domain_list);
        return domain_list;
    }

    return cached_list;
};

module.exports = {
    getDomainList,
};
