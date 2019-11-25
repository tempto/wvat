class TechAnalyser {
    /**
     * Stub method to be implemented in derived classes -> Analyses webpage technologies using Wappalyzer
     * @throws {Error} Not implemented
     */
    analyseWebPage() {
        throw new Error("Not implemented!");
    }

    /**
     * Stub method to be implemented in derived classes -> Parses webpage url technologies analysis results
     * @throws {Error} Not implemnted
     */
    parseAnalysisResults() {
        throw new Error("Not implemented!");
    }

    /**
     * Stub method to be implemented in derived classes -> Obtains webpage technologies
     * @throws {Error} Not implemnted
     */
    getWebpageTechnologies() {
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
}

module.exports = {
    TechAnalyser,
};
