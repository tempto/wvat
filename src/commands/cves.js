const Command = require("../BaseCommand");
const Flags = require("../flags");
const Logger = require("../Logger");
const Errors = require("../errors");
const {
    getCVEList, updateLocalCVECache, searchCVEsInLocalCache, parseLocalCacheCVEEntries, localCVECacheExists,
} = require("../CVEs");

class CVECommand extends Command {
    async run() {
        const { args, flags } = this.parse(CVECommand);
        this.setup(flags);

        const technology = args.technology;

        if (flags.noCveCache) {
            const cve_list = await getCVEList(technology);

            if (!cve_list) {
                Logger.print(Errors.CVE_SCRAPING.description);
                process.exit(Errors.CVE_SCRAPING.code);
            }

            Logger.print(JSON.stringify(cve_list, null, 2));
        } else {
            const cve_cache_exists = localCVECacheExists();

            if (flags.updateCveCache || !cve_cache_exists) {
                Logger.print("Downloading CVEs database ...");

                try {
                    await updateLocalCVECache();
                } catch (e) {
                    Logger.print(Errors.CVE_LOCAL_CACHE_UPDATE.description);
                    process.exit(Errors.CVE_LOCAL_CACHE_UPDATE.code);
                }
            }

            Logger.print("Searching in local cache...", true);

            searchCVEsInLocalCache(technology, (err, results) => {
                if (err) {
                    Logger.print(Errors.CVE_LOCAL_CACHE.description);
                    process.exit(Errors.CVE_LOCAL_CACHE.code);
                }

                Logger.print(
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
    "cves \"React Native\" --noCveCache",
    "cves \"Windows Server\" --updateCveCache",
];

module.exports = CVECommand;
