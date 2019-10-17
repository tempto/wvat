const Logger = require("../src/Logger.js");

describe('Logger tests', () => {
  describe('Creates the Logger singleton',() => {
    describe('Reads the flag setting',() => {
      it('should set adequate log level for verbose mode on', () => {
        let flags = {VERBOSE:true};

        Logger.delete();
        let Log = Logger(flags).getLog();
        expect(Log.level.levelStr).toEqual('ALL');
      });
      it('should set adequate log level for verbose mode off', () => {
        let flags = {VERBOSE:false};

        Logger.delete();
        let Log = Logger(flags).getLog();
        expect(Log.level.levelStr).toEqual('ERROR');
      });
    });
    describe('Reads the custom verbose log level parameter',() => {
      it('should keep default log level for verbose mode off', () => {
        let flags = {VERBOSE:false};
        let level = 'warn';

        Logger.delete();
        let Log = Logger(flags).getLog();
        expect(Log.level.levelStr).toEqual('ERROR');
      });
      it('should set custom log level for verbose mode on', () => {
        let flags = {VERBOSE:true};
        let level = 'warn';

        Logger.delete();
        let Log = Logger(flags,level).getLog();
        expect(Log.level.levelStr).toEqual('WARN');
      });
    });
  });
  describe('getLog',() => {
    it('should return the logger created with log4js', () => {
      let flags = {VERBOSE:false};

      Logger.delete();
      let LoggerObj = Logger(flags);
      let Log = LoggerObj.getLog();
      expect(Log).toBe(LoggerObj.log);
    });
  });
});
