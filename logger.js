const log4js = require("log4js");

log4js.configure({
  appenders: {
    miLoggerConsole: { type: "console" },
    miLoggerWarnFile: { type: "file", filename: "warn.log" },
    miLoggerErrorFile: { type: "file", filename: "error.log" },
  },
  categories: {
    default: { appenders: ["miLoggerConsole"], level: "info" },
    archivoWarn: { appenders: ["miLoggerWarnFile"], level: "warn" },
    archivoError: { appenders: ["miLoggerErrorFile"], level: "error" },
  },
});

module.exports = log4js;
