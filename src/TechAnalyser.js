const { isValidURL } = require("./utils");

class TechAnalyser {
    /**
     * Stub method to be implemented in derived classes -> Analyses webpage technologies using Wappalyzer
     * @throws {Error} Not implemented
     */
    static analyseWebPage() {
        throw new Error("Not implemented!");
    }

    /**
     * Stub method to be implemented in derived classes -> Parses webpage url technologies analysis results
     * @throws {Error} Not implemnted
     */
    static parseAnalysisResults() {
        throw new Error("Not implemented!");
    }

    /**
     * Stub method to be implemented in derived classes -> Obtains webpage technologies
     * @throws {Error} Not implemnted
     */
    static getWebpageTechnologies() {
        throw new Error("Not implemented!");
    }

    /**
     * Counts technologies with no version
     * @param {Array} tech Array with technologies
     * @throws {Error} Missing technologies
     * @returns {Number} Technologies with no version count
     */
    static noVersionCount(tech) {
        if (!tech) throw new Error("Missing technologies");
        return tech.reduce((count, currElem) => count + (currElem.version === null ? 1 : 0), 0);
    }

    /**
     * Calls all tech finders and merges the results
     * @param {string} url Webpage url
     * @returns {Array} Webpage technologies
     */
    static async findWebPageTechnologies(url) {
        if (!url) throw new Error("Missing Webpage url");
        if (!isValidURL(url)) throw new Error("Invalid url");

        const tech_finders = [require("./tech-analysers/Wappalyser"), require("./tech-analysers/Webtech")];
        const tech = [];

        await Promise.all(tech_finders.map(async (tech_finder) => {
            tech.push(await tech_finder.getWebpageTechnologies(url));
        }));

        return TechAnalyser.concat_tech_finders_result(tech);
    }

    static concat_tech_finders_result(tech_results) {
        const final_result = [];

        tech_results.forEach((tech_result) => {
            tech_result.forEach((tech) => {
                let exists = false;

                final_result.forEach((existing_tech) => {
                    if (tech.name === existing_tech.name) {
                        exists = true;

                        if (existing_tech.version === null) {
                            existing_tech.version = tech.version;
                        }
                    }
                });

                if (!exists) {
                    final_result.push(tech);
                }
            });
        });

        return final_result;
    }
}

module.exports = TechAnalyser;
