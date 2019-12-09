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
    parse(command) {
        const { args, flags } = super.parse(command);

        Config.addFlags(flags);

        if (flags.verbose) {
            Logger.setVerboseMode();
        }

        // Remove listeners limit
        process.setMaxListeners(0);

        return { args, flags };
    }

    /**
     * Caputers all errors that occur in the commands execution, capturing them in Sentry (Error Middleware)
     * @param {Error} err Thrown error
     * @throws {Error} Captured error
     */
    catch(err) {
        Logger.error(err);
        if (Config.tool_config.allow_data_reporting) {
            const sentry_issue_id = Sentry.captureException(err);
            Logger.error(`Sentry Issue ID: ${sentry_issue_id}`);
        }
    }
}

module.exports = BaseCommand;
