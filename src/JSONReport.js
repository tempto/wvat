const fs = require("fs");
const Logger = require("./Logger");

/**
 * Builds the final report, parsing all the received data into a JSON object
 * @param {string} domain URL of the domain being analysed
 * @param {Object} details JSON object with the domain's details
 * @param {Object} paths JSON object with the domain's paths
 * @param {Object} endpoints JSON object with the domain's endpoints
 * @param {Object} technologies JSON object with the domain's technologies
 * @param {Object} cves JSON object with the domain's CVE
 * @throws {Error} Missing domain
 * @throws {Error} Missing details
 * @throws {Error} Missing paths
 * @throws {Error} Missing endpoints
 * @throws {Error} Missing technologies
 * @throws {Error} Missing CVE
 * @returns {Object} Final JSON report
 */
const buildJSONReport = (domain, details, paths, endpoints, technologies, cves) => {
    if (!domain) throw new Error("Missing domain");
    if (!details) throw new Error("Missing details");
    if (!paths) throw new Error("Missing paths");
    if (!endpoints) throw new Error("Missing endpoints");
    if (!technologies) throw new Error("Missing technologies");
    if (!cves) throw new Error("Missing CVE");

    const date = new Date().toISOString().slice(0, 10);

    const report_data = {
        domain,
        date,
        details,
        subdomains: createSubdomains(paths, endpoints, technologies, cves),
    };

    return report_data;
};

/**
 * Saves the final report into a JSON file
 * @param {Object} report_data Final report
 * @throws {Error} Missing report data
 */
const exportJSONReport = (report_data) => {
    if (!report_data) throw new Error("Missing report data");

    const data = JSON.stringify(report_data, null, 2);
    fs.writeFile(`security_analysis_report_${report_data.date}.json`, data, (err) => {
        if (err) {
            Logger.error(err);
            Logger.error(`Error saving file: security_analysis_report_${report_data.date}.json`);
        }
    });
};

/**
 * Creates the subdomains' JSON array
 * @param {Object} paths JSON object with the domain's paths
 * @param {Object} endpoints JSON object with the domain's endpoints
 * @param {Object} technologies JSON object with the domain's technologies
 * @param {Object} cves JSON object with the domain's CVE
 * @return {Array} final subdomains' JSON array
 */
const createSubdomains = (paths, endpoints, technologies, cves) => {
    const subdomainsJSON = [];

    for (const path of Object.keys(paths)) {
        subdomainsJSON.push(
            {
                path: path,
                endpoints: createEndpoints(paths[path].links, endpoints, technologies, cves),
            },
        );
    }

    return subdomainsJSON;
};

/**
 * Creates the endpoints' JSON array from its corresponding subdomain
 * @param {Array} links List of the subdomain's endpoints
 * @param {Object} endpoints JSON object with the domain's endpoints
 * @param {Object} technologies JSON object with the domain's technologies
 * @param {Object} cves JSON object with the domain's CVE
 * @return {Array} final endpoints' JSON array
 */
const createEndpoints = (links, endpoints, technologies, cves) => {
    const endpointsJSON = links.map((link) => {
        const endpoint = endpoints[link];
        const endpointJSON = {
            endpoint: link,
            links: endpoint.links,
            technologies: createTechnologies(endpoint.technologies, technologies, cves),
        };
        return endpointJSON;
    });

    return endpointsJSON;
};

/**
 * Creates the technologies' JSON array from its corresponding endpoint
 * @param {Array} techsList List of the endpoints's technologies
 * @param {Object} technologies JSON object with the domain's technologies
 * @param {Object} cves JSON object with the domain's CVE
 * @return {Array} final technologies' JSON array
 */
const createTechnologies = (techsList, technologies, cves) => {
    const technologiesJSON = techsList.map((technology) => {
        const tech = technologies[technology];
        const technologyJSON = {
            name: technology,
            version: tech.version,
            cves: createCVEs(tech.cves, cves),
        };
        return technologyJSON;
    });

    return technologiesJSON;
};

/**
 * Creates the CVE's JSON array from its corresponding technology
 * @param {Array} cvesList List of the technology's CVE
 * @param {Object} cves JSON object with the domain's CVE
 * @return {Array} final CVE's JSON array
 */
const createCVEs = (cvesList, cves) => {
    const cvesJSON = cvesList.map((cve) => {
        const cveJSON = {
            cve: cve,
            title: cves[cve].title,
            date: cves[cve].date,
            url: cves[cve].url,
            exploits: cves[cve].exploits,
        };
        return cveJSON;
    });

    return cvesJSON;
};

module.exports = {
    buildJSONReport, exportJSONReport,
};
