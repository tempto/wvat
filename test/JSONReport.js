const { exportJSONReport } = require("../src/JSONReport");
const chai = require("chai"),
    expect = chai.expect;

describe("JSON Report tests", () => {
    describe("Export the JSON report", () => {
        it("should fail when the report data is missing", () => {
            expect(exportJSONReport).to.throw("Missing report data");
        });
    });
});
