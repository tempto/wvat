const initCommand = require("../src/initCommand");
const Logger = require("../src/Logger.js");

beforeEach(() => {
    Logger.instance = null;
});

describe("initCommand tests", () => {
    describe("Create singleton objects according to passed parameters", () => {
        it("should read flags parameter correctly", () => {
            const flags = { VERBOSE: true, TEST: false };

            const [Config, Log] = initCommand(flags);

            expect(Config.flags).toEqual(flags);
            Logger.instance = null;
            expect(Log).toStrictEqual(new Logger(flags).getLog());
        });
        it("should read level parameter correctly", () => {
            const flags = { VERBOSE: true, TEST: false };
            const level = "warn";

            const [, Log] = initCommand(flags, level);

            Logger.instance = null;
            expect(Log.level).toStrictEqual(new Logger(flags, level).getLog().level);
        });
    });
});
