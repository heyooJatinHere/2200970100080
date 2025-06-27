export const Logger = {
  log: (level, message, metadata = {}) => {
    const log = {
      timestamp: new Date().toISOString(),
      level,
      message,
      ...metadata,
    };
    window.__logs = window.__logs || [];
    window.__logs.push(log);
  },
  info: (msg, meta) => Logger.log('INFO', msg, meta),
  warn: (msg, meta) => Logger.log('WARN', msg, meta),
  error: (msg, meta) => Logger.log('ERROR', msg, meta),
};
