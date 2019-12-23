const { Command } = require("@oclif/command");
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
    async parse(command) {
        const { args, flags } = super.parse(command);

        Config.addFlags(flags);

        if (flags.verbose) {
            Logger.setVerboseMode();
        }

        // Remove listeners limit
        process.setMaxListeners(0);

        await this.config.runHook("tool-config", { path: flags.config });

        return { args, flags };
    }

    /**
     * Caputers all errors that occur in the commands execution
     */
    catch(err) {
        Logger.error(err);
    }
}

module.exports = BaseCommand;
