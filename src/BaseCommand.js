const { Command } = require("@oclif/command");
const Sentry = require("@sentry/node");

class BaseCommand extends Command {
    catch(err) {
        const sentry_issue_id = Sentry.captureException(err);
        this.log(err);
        this.log(`Sentry Issue ID: ${sentry_issue_id}`);
    }
}

module.exports = BaseCommand;
