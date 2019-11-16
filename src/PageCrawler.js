const Crawler = require("js-crawler");
const storage = require("node-persist");
const { URL_REGEX, HTTPS_REGEX } = require("./utils");
const Logger = require("./Logger");
const Config = require("./Config");

const Log = new Logger(Config.flags).getLog();

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
                Log.info(url);
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

const getPagesList = async (domain_name, depth_level = 2, no_cache = false) => {
    if (!domain_name) throw new Error("Missing Domain Name");
    if (depth_level <= 0) throw new Error("Depth Level must be a positive number");

    if (!HTTPS_REGEX.test(domain_name)) {
        Log.warn("Domains must have http(s)");
        return [];
    }

    const domain_key = `${domain_name}-${depth_level}`;

    await initStorage();
    const cached_list = await storage.getItem(domain_key);

    if (!cached_list || no_cache) {
        const crawler = getCrawler(domain_name, depth_level);
        const domain_list = await crawl(crawler, domain_name);
        storage.setItem(domain_key, domain_list);
        return domain_list;
    }

    return cached_list;
};

module.exports = {
    getPagesList,
};
