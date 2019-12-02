const assert = require("assert");
const { When, Then } = require("cucumber");
const run_tool = require("../run_tool");

When("the user invokes the tool using the {string} flag", async (flag) => {
    this.tool_help = await run_tool(flag);
});

Then("the user is informed with the tool's version, usage and available commands", () => {
    assert(this.tool_help.includes("VERSION"));
    assert(this.tool_help.includes("USAGE"));
    assert(this.tool_help.includes("COMMANDS"));
});
