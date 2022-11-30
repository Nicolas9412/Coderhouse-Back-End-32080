const log4js = require("log4js");

log4js.configure({
  appenders: {
    miLoggerConsole: { type: "console" },
    miLoggerWarnFile: { type: "file", filename: "logs/warn.log" },
    miLoggerErrorFile: { type: "file", filename: "logs/error.log" },
  },
  categories: {
    default: { appenders: ["miLoggerConsole"], level: "info" },
    archivoWarn: {
      appenders: ["miLoggerConsole", "miLoggerWarnFile"],
      level: "warn",
    },
    archivoError: {
      appenders: ["miLoggerConsole", "miLoggerErrorFile"],
      level: "error",
    },
  },
});

module.exports = log4js;
