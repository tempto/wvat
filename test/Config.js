const chai = require("chai"),
    expect = chai.expect,
    should = chai.should(); // eslint-disable-line

describe("Configuration state object tests", () => {

    const Config = require("../src/Config");

    beforeEach(() => {
        Config.resetFlags();
    });

    it("should initialize with empty props", () => {
        expect(Config.flags).to.be.empty;
    });

    it("should add flags", () => {
        Config.addFlags({ flag1: "flag1" });
        expect(Config.flags).to.deep.equal({ flag1: "flag1" });
        Config.addFlags({ flag2: "flag2" });
        expect(Config.flags).to.deep.equal({ flag1: "flag1", flag2: "flag2" });
    });

    it("should reset flags", () => {
        Config.addFlags({ flag1: "flag1" });
        Config.resetFlags();
        expect(Config.flags).to.be.empty;
    });
});
