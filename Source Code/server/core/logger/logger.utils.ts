import log4js from 'log4js';

export const logger = (category: string): log4js.Logger => {
  const folder = process.env.DEBUG_FOLDER || 'logs/';
  const pattern = process.env.DEBUG_PATTERN || 'yyyy-MM-dd.log';
  const level = process.env.DEBUG_LEVEL || 'all';
  log4js.configure({
    appenders: {
      app: {
        type: 'dateFile',
        filename: folder,
        pattern,
        alwaysIncludePattern: true,
      },
    },
    categories: {
      default: {
        appenders: ['app'],
        level,
      },
    },
  });
  return log4js.getLogger(category);
};
