const chai = require("chai"),
    expect = chai.expect,
    should = chai.should(); // eslint-disable-line

describe("Configuration object flags tests", () => {

    const Config = require("../src/Config");

    beforeEach(() => {
        Config.resetFlags();
    });

    it("should initialize with empty props", () => {
        Config.flags.should.be.empty;
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
        Config.flags.should.be.empty;
    });
});

describe("Configuration tool config tests", () => {

    const Config = require("../src/Config");

    beforeEach(() => {
        Config.resetToolConfiguration();
    });

    it("should initialize with empty props", () => {
        Config.tool_config.should.be.empty;
    });

    it("should set configuration", () => {
        Config.setToolConfiguration({ allow_data_reporting: true });
        expect(Config.tool_config).to.deep.equal({ allow_data_reporting: true });

        Config.setToolConfiguration({ allow_caching_overriding: false });
        expect(Config.tool_config).to.deep.equal({ allow_caching_overriding: false });
    });

    it("should reset flags", () => {
        Config.setToolConfiguration({ allow_data_reporting: true });
        Config.resetToolConfiguration();
        Config.tool_config.should.be.empty;
    });
});
