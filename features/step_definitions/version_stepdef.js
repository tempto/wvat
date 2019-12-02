const assert = require("assert");
const { When, Then } = require("cucumber");
const run_tool = require("../run_tool");

const VERSION_REGEX = /wvat\/\d\.\d\.\d/;

When("the user invokes the tool with the {string} flag", async (flag) => {
    this.tool_version = await run_tool(flag);
});

Then("the user is informed with the tool's version", () => {
    assert(VERSION_REGEX.test(this.tool_version));
});
