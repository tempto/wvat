const { Command } = require("@oclif/command");
const Sentry = require("@sentry/node");

/**
 * Base command that is extended by all the 'callable' tool's commands
 */
class BaseCommand extends Command {
    /**
     * Caputers all errors that occur in the commands execution, capturing them in Sentry (Error Middleware)
     * @param {Error} err Thrown error
     * @throws {Error} Captured error
     */
    catch(err) {
        const sentry_issue_id = Sentry.captureException(err);
        this.log(err);
        this.log(`Sentry Issue ID: ${sentry_issue_id}`);
    }
}

module.exports = BaseCommand;
