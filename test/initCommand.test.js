const initCommand = require('../src/initCommand');
const Logger = require("../src/Logger.js");

describe('initCommand tests', () => {
  describe('Create singleton objects according to passed parameters',() => {
    it('should read flags parameter correctly', () => {
      let flags = {VERBOSE:true,TEST:false};

      Logger.delete();
      const [Config,Log] = initCommand(flags);

      expect(Config.flags).toEqual(flags);
      Logger.delete();
      expect(Log).toStrictEqual(Logger(flags).getLog());
    });
    it('should read level parameter correctly', () => {
      let flags = {VERBOSE:true,TEST:false};
      let level = "warn";

      Logger.delete();
      const [Config,Log] = initCommand(flags,level);

      Logger.delete();
      expect(Log.level).toStrictEqual(Logger(flags,level).getLog().level);
    });
  });
});
