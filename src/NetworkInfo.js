const WhoIs = require("node-xwhois");
const Logger = require("./Logger");
const Errors = require("./errors");

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

        Logger.print("Command 'whois' was successful", true);

        return network_data;
    } catch (e) {
        throw new Error(Errors.NETWORK.description);
    }
};

module.exports = {
    getNetworkInfo,
};
