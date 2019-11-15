const Command = require("../BaseCommand");
const Flags = require("../flags");
const Errors = require("../errors");
const {
    getCVEList, updateLocalCVECache, searchCVEsInLocalCache, parseLocalCacheCVEEntries, localCVECacheExists,
} = require("../CVEs");

class CVECommand extends Command {
    async run() {
        const { args, flags } = this.parse(CVECommand);
        const [, Logger] = require("../initCommand")(flags);

        const technology = args.technology;

        if (flags["no-cve-cache"]) {
            const cve_list = await getCVEList(technology);

            if (!cve_list) {
                Logger.info(Errors.CVE_SCRAPING.description);
                process.exit(Errors.CVE_SCRAPING.code);
            }

            this.log(JSON.stringify(cve_list, null, 2));
        } else {
            const cve_cache_exists = localCVECacheExists();

            if (flags["update-cve-cache"] || !cve_cache_exists) {
                this.log("Downloading CVEs database ...");

                try {
                    await updateLocalCVECache();
                } catch (e) {
                    Logger.info(Errors.CVE_LOCAL_CACHE_UPDATE.description);
                    process.exit(Errors.CVE_LOCAL_CACHE_UPDATE.code);
                }
            }

            this.log("Searching ...");

            searchCVEsInLocalCache(technology, (err, results) => {
                if (err) {
                    Logger.info(Errors.CVE_LOCAL_CACHE.description);
                    process.exit(Errors.CVE_LOCAL_CACHE.code);
                }

                this.log(
                    JSON.stringify(parseLocalCacheCVEEntries(results), null, 2),
                );
            });
        }
    }
}

CVECommand.description = "Searches CVEs for a given technology";

CVECommand.args = [
    {
        name: "technology",
        required: true,
        description: "technology to search CVEs",
        hidden: false,
    },
];

CVECommand.flags = {
    ...Flags,
};

CVECommand.examples  = [
    "cves \"React Native\" --no-cve-cache",
    "cves \"Windows Server\" --update-cve-cache",
];

module.exports = CVECommand;
