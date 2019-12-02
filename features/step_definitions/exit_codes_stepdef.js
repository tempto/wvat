const assert = require("assert");
const { Given, When, Then } = require("cucumber");
const run_tool = require("../run_tool");

// Tool execution success

Given("the tool executed sucessfully", () => {});

When("the tool's execution finishes", async () => {
    try {
        await run_tool("");
        // When no exception is thrown, the error code is 0 (success)
        this.exit_code = 0;
    } catch (err) {
        this.exit_code = err.code;
    }
});

Then("the tool's return code is equal to {string}", (exit_code_str) => {
    const exit_code = parseInt(exit_code_str, 10);
    assert.equal(this.exit_code, exit_code);
});

// Tool execution failure

When("the tool's execution fails", async () => {
    try {
        await run_tool("error command");
        // When no exception is thrown, the error code is 0 (success)
        this.exit_code = 0;
    } catch (err) {
        this.exit_code = err.code;
    }
});

Then("the tool's return code is different than {string}", (exit_code_str) => {
    const exit_code = parseInt(exit_code_str, 10);
    assert.notEqual(this.exit_code, exit_code);
});
