const WhoIs = require("node-xwhois");
const DomainPing = require("domain-ping");
const Logger = require("./Logger");
const IpLocation = require("iplocation").default;

/**
 * Mapping node-xwhois results to meaningfull names
 */
const WHOIS_MAP = Object.freeze({
    ipv4: "A",
    ipv6: "AAAA",
    mx_records: "MX",
    txt_records: "TXT",
    srv_records: "SRV",
    ns_records: "NS",
    cname_records: "CNAME",
    soa_records: "SOA",
});

/**
 * Updates network data object's keys to meaningfull names
 * @param {Object} network_data Network data object
 */
const mapWhoIsInfo = (network_data, whois_data) => Object.keys(WHOIS_MAP).forEach(((entry) => {
    if (whois_data[WHOIS_MAP[entry]]) {
        network_data[entry] = whois_data[WHOIS_MAP[entry]];
        delete whois_data[WHOIS_MAP[entry]];
    }
}));

/**
 * Gets the network data for a given domain
 * @param {string} domain Domain to obtain network info
 * @returns {Object} Network data for a given domain
 */
const getNetworkInfo = async (domain) => {
    Logger.print(`Searching for ${domain} network information ...`, true);
    Logger.print("Running 'whois' the command to find domain network information", true);
    const network_data = {};

    try {
        const whois_data = await WhoIs.nslookup(domain);

        mapWhoIsInfo(network_data, whois_data);
    } catch (e) {
        Logger.error("Failed to fetch network data");
    }

    try {
        if (!network_data || !network_data.ipv4) {
            Logger.print("The 'whois' command failed to find domain network information", true);
            const network_data = {};
            const domain_ping_info = await DomainPing(domain);
            if (!domain_ping_info.error && domain_ping_info.success) {
                Logger.print("Command 'ping' was successful", true);
                network_data.ipv4 = domain_ping_info.ip;
            } else {
                Logger.print("The 'ping' command failed to find domain network information", true);
            }
        } else {
            Logger.print("Command 'whois' was successful", true);
        }
    } catch (e) {
        Logger.error("Failed to ping network");
    }

    try {
        if (network_data.ipv4) {
            Logger.print(`Searching for ${network_data.ipv4} location ...`, true);
            network_data.location = await IpLocation(network_data.ipv4);
            delete network_data.location.ip;
            Logger.print("IP Location found", true);
        }
    } catch (e) {
        Logger.error("Failed to find network location");
    }

    Logger.print("Finished searching for network information", true);
    return network_data;
};

module.exports = {
    getNetworkInfo,
    mapWhoIsInfo,
};
