const { aboutCommand } = require("../src/about");

describe("About command tests", () => {
    describe("Validate aboutCommand arguments", () => {
        it("should fail when the command key is missint", () => {
            expect(() => aboutCommand()).toThrowError(new Error("Missing command key"));
        });
    });
});
