const WhoIs = require("node-xwhois");
const DomainPing = require("domain-ping");
const Logger = require("./Logger");
const Errors = require("./errors");
const IpLocation = require("iplocation").default;

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

const mapWhoIsInfo = (network_data) => Object.keys(WHOIS_MAP).forEach(((entry) => {
    if (network_data[WHOIS_MAP[entry]]) {
        network_data[entry] = network_data[WHOIS_MAP[entry]];
        delete network_data[WHOIS_MAP[entry]];
    }
}));

const getNetworkInfo = async (domain) => {
    try {
        Logger.print(`Searching for ${domain} network information ...`, true);
        Logger.print("Running 'whois' the command to find domain network information", true);

        const network_data = await WhoIs.nslookup(domain);

        mapWhoIsInfo(network_data);

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

        if (network_data.ipv4) {
            Logger.print(`Searching for ${network_data.ipv4} location ...`, true);
            network_data.location = await IpLocation(network_data.ipv4);
            delete network_data.location.ip;
            Logger.print("IP Location found", true);
        }

        Logger.print("Finished searching for network information", true);
        return network_data;
    } catch (e) {
        throw new Error(Errors.NETWORK.description);
    }
};

module.exports = {
    getNetworkInfo,
};
