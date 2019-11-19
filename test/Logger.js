const Logger = require("../src/Logger.js");

beforeEach(() => {
    Logger.instance = null;
});

describe("Logger tests", () => {
    describe("Creates the Logger singleton", () => {
        describe("Reads the flag setting", () => {
            it("should set adequate log level for verbose mode on", () => {
                const flags = { verbose: true };

                const Log = new Logger(flags).getLog();
                expect(Log.level.levelStr).toEqual("ALL");
            });
            it("should set adequate log level for verbose mode off", () => {
                const flags = { verbose: false };

                const Log = new Logger(flags).getLog();
                expect(Log.level.levelStr).toEqual("INFO");
            });
        });
    });
    describe("getLog", () => {
        it("should return the logger created with log4js", () => {
            const flags = { verbose: false };

            const LoggerObj = new Logger(flags);
            const Log = LoggerObj.getLog();
            expect(Log).toBe(LoggerObj.log);
        });
    });
});
