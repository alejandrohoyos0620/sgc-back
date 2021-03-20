require("dotenv").config();

const config = {
  sentryDns: process.env.SENTRY_DNS,
  sentryId: process.env.SENTRY_ID
};

module.exports = { config: config };