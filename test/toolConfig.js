const { initToolConfig } = require("../src/toolConfig");

describe("toolConfig tests", () => {
    it("should fail when the config file is not found", () => {
        expect.assertions(1);
        try {
            initToolConfig("invalid_path");
        }
        catch (e) {
            expect(e).toEqual(new Error("Failed to read tool configuration file"));
        }
    });
});
