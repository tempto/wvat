const commandExists = require("command-exists");
const Logger = require("./Logger");
const Config = require("./Config");

const Log = new Logger(Config.flags).getLog();

const checkGoExists = () => {
    commandExists("ls", (err) => {
        if (err) {
            Log.error(err);
        }
    });
};

const getSubdomainsList = () => {
    checkGoExists();
};

module.exports = {
    getSubdomainsList,
};
