const assert = require("assert");
const { Given, When, Then } = require("cucumber");
const run_tool = require("../run_tool");

Given("the webpage {string}", (webpage) => {
    this.url = webpage;
});

When("the user invokes the tool's inspect command", { timeout: 60 * 1000 }, async () => {
    this.technologies = await run_tool(`inspect ${this.url}`);
});

Then("the user is informed with webpage technologies", () => {
    const name = this.technologies.match(/[^"name":]/g);
    const versions = this.technologies.match(/[^"version":]/g);

    assert.notEqual(name, []);
    assert.notEqual(versions, []);
});
