const Crawler = require("js-crawler");
const storage = require("node-persist");
const { HTTPS_REGEX, isUrlFromDomain, isHttpStatusCode } = require("./utils");
const Logger = require("./Logger");

const initStorage = () => (
    storage.init({
        dir: ".domainscache",
    })
);

const removeQueryParams = (url) => (
    url.split("?")[0]
);

const getCrawler = (domain, depth) => (new Crawler().configure({
    ignoreRelative: false,
    depth: depth,
    shouldCrawlLinksFrom: (url) => isUrlFromDomain(url, domain),
    shouldCrawl: (url) => isUrlFromDomain(url, domain),
}));

const crawl = (crawler, domain_name) => {
    const domain_list = [];
    return new Promise((resolve) => {
        crawler.crawl({
            url: domain_name,
            success: (page) => {
                const url = removeQueryParams(page.url);
                Logger.print(url, true);
                if (!domain_list.includes(url)) {
                    domain_list.push(url);
                }
            },
            failure: (page) => {
                domain_list.push(page.status);
            },
            finished: () => {
                domain_list.sort();
                resolve(removeBadEndpoints(domain_list));
            },
        });
    });

};

const getPagesList = async (domain_name, depth_level = 2, no_cache = false) => {
    if (!domain_name) throw new Error("Missing Domain Name");
    if (depth_level <= 0) throw new Error("Depth Level must be a positive number");

    if (!HTTPS_REGEX.test(domain_name)) {
        Logger.warning("Domains must have http(s)");
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
    } else {
        Logger.print("Cached version found. Using Cached version.", true);
    }

    return cached_list;
};

/**
 * Verifies if an endpoint is acceptable
 * @param {string} endpoint Endpoint candidate to test
 * @returns {boolean} true if acceptable, false otherwise
 */
const isGoodEndpoint = (endpoint) => (
    !isHttpStatusCode(endpoint)
);

const removeBadEndpoints = (endpoints) => (
    endpoints.filter(isGoodEndpoint)
);

module.exports = {
    getPagesList,
};
