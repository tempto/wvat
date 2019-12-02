const Logger = require("../src/Logger.js");
const chai = require("chai"),
    should = chai.should(); // eslint-disable-line

describe("Logger tests", () => {
    it("Should default to standard mode", () => {
        Logger.isStandardMode().should.be.true;
        Logger.isVerboseMode().should.be.false;
        Logger.getLoggerMode().should.equal("standard");
    });

    it("Should change to verbose mode", () => {
        Logger.setVerboseMode();
        Logger.getLoggerMode().should.equal("verbose");
        Logger.isStandardMode().should.be.false;
        Logger.isVerboseMode().should.be.true;
    });

    it("Should change to standard mode", () => {
        Logger.setStandardMode();
        Logger.getLoggerMode().should.equal("standard");
        Logger.isStandardMode().should.be.true;
        Logger.isVerboseMode().should.be.false;
    });
});
