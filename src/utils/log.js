const fs = require("fs");
const path = require("path");

const logFile = path.join(__dirname, "../logs/app.log");

// ensure logs folder exists
const logDir = path.dirname(logFile);
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

const writeLog = (level, message) => {
  const time = new Date().toISOString();
  const log = `[${time}] [${level.toUpperCase()}] ${message}\n`;

  console.log(log);

  fs.appendFileSync(logFile, log);
};

const logger = {
  info: (msg) => writeLog("info", msg),
  warn: (msg) => writeLog("warn", msg),
  error: (msg) => writeLog("error", msg),
  debug: (msg) => writeLog("debug", msg),
};

module.exports = logger;