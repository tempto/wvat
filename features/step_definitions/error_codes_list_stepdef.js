const assert = require("assert");
const { When, Then } = require("cucumber");
const run_tool = require("../run_tool");

When("the user invokes the tool's error-codes command", async () => {
    this.error_codes_list = await run_tool("error-codes");
});

Then("the user is informed with a list of the tool's possible error codes", () => {
    assert(this.error_codes_list.includes("Code"));
    assert(this.error_codes_list.includes("Description"));
});
