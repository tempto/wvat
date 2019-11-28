const WhoIs = require("node-xwhois");
const DomainPing = require("domain-ping");
const Logger = require("./Logger");
const Errors = require("./errors");
const IpLocation = require("iplocation").default;

const NAMESPACE_MAP = Object.freeze({
    ipv4: "A",
    ipv6: "AAAA",
});

const getNetworkInfo = async (domain) => {
    try {
        Logger.print("Running 'whois' the command to find domain network information", true);

        const network_data = await WhoIs.nslookup(domain);

        if (network_data[NAMESPACE_MAP.ipv4]) {
            network_data.ipv4 = network_data[NAMESPACE_MAP.ipv4];
            delete network_data[NAMESPACE_MAP.ipv4];
        }
        if (network_data[NAMESPACE_MAP.ipv6]) {
            network_data.ipv6 = network_data[NAMESPACE_MAP.ipv6];
            delete network_data[NAMESPACE_MAP.ipv6];
        }

        if (!network_data || !network_data.ipv4) {
            Logger.print("The 'whois' command failed to find domain network information", true);
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
            network_data.location = await IpLocation(network_data.ipv4);
            delete network_data.location.ip;
        }

        return network_data;
    } catch (e) {
        throw new Error(Errors.NETWORK.description);
    }
};

module.exports = {
    getNetworkInfo,
};
