const assert = require("assert");
const { Given, When, Then } = require("cucumber");
const run_tool = require("../run_tool");

Given("the technology {string}", (technology) => {
    this.technology = technology;
});

When("the user invokes the tool's cves command", { timeout: 60 * 1000 }, async () => {
    this.cves = await run_tool(`cves ${this.technology} -j`);
});

Then("the user is informed with the technologies CVES", () => {
    const matches = this.cves.match(/\d{4}-\d{4}/g);

    assert.notEqual(matches, []);
});
