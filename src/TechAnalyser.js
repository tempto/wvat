const { isValidURL } = require("./utils");
const Logger = require("./Logger");

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
     * @throws {Error} Missing Webpage url
     * @throws {Error} Invalid url
     * @throws {Error} None of the technology analysers could be used
     * @returns {Array} Webpage technologies
     */
    static async findWebPageTechnologies(url) {
        if (!url) throw new Error("Missing Webpage url");
        if (!isValidURL(url)) throw new Error("Invalid url");

        const tech_finders = [require("./tech-analysers/Wappalyser"), require("./tech-analysers/Webtech")];
        const techs = [];

        await Promise.all(tech_finders.map(async (tech_finder) => {
            try {
                techs.push(await tech_finder.getWebpageTechnologies(url));
            } catch (e) {
                Logger.warning(`Not using ${new tech_finder().constructor.name} on webpage technology analysis`);
            }
        }));

        if (techs.length === 0) throw new Error("None of the technology analysers could be used");

        return TechAnalyser.concat_tech_finders_result(techs);
    }

    /**
     * Concatenates all the result arrays from each tech finder into a single array without repeats
     * Preserves the detected versions
     * @param {Array.<Array.<string>>} tech_results Array of lists of results from each tech finder
     * @returns {Array} Single list of all technologies detected
     */
    static concat_tech_finders_result(tech_results) {
        const final_result = [];

        tech_results.forEach((tech_result) => {
            tech_result.forEach((tech) => {
                const existing_tech = final_result.filter((tech_obj) => tech_obj.name === tech.name)[0];

                if (existing_tech && tech.version) existing_tech.version = tech.version;

                if (!existing_tech) final_result.push(tech);
            });
        });

        return final_result;
    }
}

module.exports = TechAnalyser;
