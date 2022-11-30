function getInfoProcess() {
  const info = {
    args: process.argv,
    cwd: process.cwd(),
    pid: process.pid,
    version: process.version,
    title: process.title,
    os: process.platform,
    memoryUsage: process.memoryUsage().rss,
  };
  return info;
}

module.exports = { getInfoProcess };
