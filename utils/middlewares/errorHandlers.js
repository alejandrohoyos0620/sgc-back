const Sentry = require("@sentry/node");
const { config: sentryConfig } = require("../../configuration/sentryConfig");

Sentry.init({ dsn: `${sentryConfig.sentryDns}${sentryConfig.sentryId}`});

function logErrors(err, req, res, next) {
    Sentry.captureException(err);
    console.error(err.stack);
    next(err);
}

function clientErrorHandler(err, req, res, next) {
    if (req.xhr) {
        res.status(500).json({err: err.message});
    } else {
        next(err);
    }
}

function errorHandler(err, req, res, next) {
    //catch errors while streaming
    
    if(res.headersSent) {
        next(err);
    }
    res.status(err.status || 500);
    res.json({err: err.message});
}
module.exports = {
    logErrors,
    clientErrorHandler,
    errorHandler
}