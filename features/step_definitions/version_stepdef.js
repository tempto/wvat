const assert = require("assert");
const { When, Then } = require("cucumber");
const util = require("util");
const exec = util.promisify(require("child_process").exec);

const VERSION_REGEX = /wvat\/\d\.\d\.\d/;
const TOOL_PATH = "bin/run";

const run_tool = async (args) => {
    const { stdout } = await exec(`${TOOL_PATH} ${args}`);
    return stdout;
};

When("the user invokes the tool with the {string} flag", async (flag) => {
    this.tool_version = await run_tool(flag);
});

Then("the user is informed with the tool's version", () => {
    assert(VERSION_REGEX.test(this.tool_version));
});
