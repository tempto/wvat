const Config = require("./Config");
const handleTimeout = require("./handleTimeout");

const initCommand = (flags) => {
    Config.addFlags(flags);

    if (flags.timeout) {
        handleTimeout(() => process.exit(1), flags.timeout);
    }

    return Config;
};

module.exports = initCommand;
