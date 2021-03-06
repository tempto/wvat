const Command = require("../BaseCommand");
const { cli } = require("cli-ux");
const Errors = require("../errors");

class ErrorCodes extends Command {
    run() {
        cli.table(Object.values(Errors), {
            code: {
                minWidth: "8",
            },
            description: {},
        });
    }
}

ErrorCodes.description = "Displays the meaning of the possible error codes generated by the tool";

module.exports = ErrorCodes;
