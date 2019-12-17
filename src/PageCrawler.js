const Crawler = require("js-crawler");
const storage = require("node-persist");
const { isUrlFromDomain, addURLEndSlash, stripDomain } = require("./utils");
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
                // console.log(page);
                Logger.error(`Failed to crawl page ${domain_name}.[HTTP STATUS CODE: ${page.status}]`);
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
 * Returns the crawl tree for a given list of subdomains
 * @param {Array} subdomains_list List of subdomains
 * @param {int} depth Target crawling max depth
 * @param {boolean} noCrawlingCache Flag indicating that no crawling cache should be used
 */
const getCrawlTree = async (subdomains_list, depth, noCrawlingCache) => {
    const crawl_tree = {};

    await Promise.all(subdomains_list.map(async (subdomain) => {
        // Logger.print(`Fetching pages for subdomain ${subdomain}`);

        const [https_pages, http_pages] = await Promise.all([
            getPagesList(`https://${addURLEndSlash(stripDomain(subdomain))}`, depth, noCrawlingCache),
            getPagesList(`http://${addURLEndSlash(stripDomain(subdomain))}`, depth, noCrawlingCache),
        ]);
        const results = new Set([...https_pages, ...http_pages]);
        crawl_tree[subdomain] = Array.from(results);

    }));

    return crawl_tree;
};

module.exports = {
    getPagesList,
    getCrawlTree,
};
