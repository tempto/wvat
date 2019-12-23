const fs = require("fs");
const Logger = require("./Logger");
const { now } = require("./utils");

/**
 * Saves the final report into a JSON file
 * @param {Object} report_data Final report
 * @throws {Error} Missing report data
 */
const saveJSONReport = (report_data) => {
    if (!report_data) throw new Error("Missing report data");
    const date = now().replace(/:/g, "-");

    try {
        fs.writeFileSync(`security_analysis_report_${date}.json`, JSON.stringify(report_data, null, 2));
    } catch (e) {
        Logger.error(`Error saving file: security_analysis_report_${date}.json`);
    }
};

module.exports = {
    saveJSONReport,
};
