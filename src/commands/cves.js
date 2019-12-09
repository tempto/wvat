const Command = require("../BaseCommand");
const Flags = require("../flags");
const Logger = require("../Logger");
const Errors = require("../errors");
const {
    findCVEsWithoutCache, updateLocalCVECache, findCVEsWithCache, localCVECacheExists,
} = require("../CVEs");

class CVECommand extends Command {
    async run() {
        const { args, flags } = this.parse(CVECommand);

        const technology = args.technology;

        if (flags.noCveCache) {
            const cve_list = await findCVEsWithoutCache(technology);

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

            try {
                const results = await findCVEsWithCache(technology);
                Logger.print(
                    JSON.stringify(results, null, 2),
                );
            } catch (e) {
                Logger.error(Errors.CVE_LOCAL_CACHE.description);
                process.exit(Errors.CVE_LOCAL_CACHE.code);
            }
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
