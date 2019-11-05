const Sentry = require("@sentry/node");

module.exports = () => {
    Sentry.init({ dsn: "https://f4ef51b988a741f39046b628143ac46c@sentry.io/1808473" });
};
