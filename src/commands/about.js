const Command = require("../BaseCommand");

class AboutCommand extends Command {
    run() {
    }
}

AboutCommand.description = "Describes WVAT and its functionalities";

module.exports = AboutCommand;
