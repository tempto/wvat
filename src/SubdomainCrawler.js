const commandExists = require("command-exists");
const Logger = require("./Logger");
const Config = require("./Config");

const Log = new Logger(Config.flags).getLog();

const checkGoExists = () => {
    commandExists("go")
        .catch(() => {
            Log.error("This tool requires Go, but wasn't found on this machine!");
            process.exit(0);
        });
};

const getSubdomainsList = () => {
    checkGoExists();
};

module.exports = {
    getSubdomainsList,
};
