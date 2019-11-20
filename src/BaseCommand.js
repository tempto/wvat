const { Command } = require("@oclif/command");
const Sentry = require("@sentry/node");
const Config = require("./Config");
const Logger = require("./Logger");

/**
 * Base command that is extended by all the 'callable' tool's commands
 */
class BaseCommand extends Command {
    /**
     * Base command setup, performed by all oclif commands
     * @param {Object} flags Flags passed to the tool
     */
    setup(flags) {
        Config.addFlags(flags);

        if (flags.verbose) {
            Logger.setVerboseMode();
        }
    }

    /**
     * Caputers all errors that occur in the commands execution, capturing them in Sentry (Error Middleware)
     * @param {Error} err Thrown error
     * @throws {Error} Captured error
     */
    catch(err) {
        const sentry_issue_id = Sentry.captureException(err);
        Logger.error(err);
        Logger.error(`Sentry Issue ID: ${sentry_issue_id}`);
    }
}

module.exports = BaseCommand;
