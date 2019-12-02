const util = require("util");
const exec = util.promisify(require("child_process").exec);
require("dotenv-flow").config();

const { TOOL_PATH } = process.env;

const run_tool = async (args) => {
    const { stdout } = await exec(`${TOOL_PATH} ${args}`);
    return stdout;
};

module.exports = run_tool;
