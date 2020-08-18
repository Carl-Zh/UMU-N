import path from 'path';

export const isLocal = () =>
  String(process.env.ENVIRONMENT).toUpperCase() === 'local'.toUpperCase();

export const isDevelopment = () =>
  String(process.env.ENVIRONMENT).toUpperCase() === 'development'.toUpperCase();

export const isQuality = () =>
  String(process.env.ENVIRONMENT).toUpperCase() === 'quality'.toUpperCase();

export const isProduction = () =>
  String(process.env.ENVIRONMENT).toUpperCase() === 'production'.toUpperCase();

export const getPath = (...paths: string[]) => {
  return path.join(__dirname, ...paths);
};

export const getRootPath = (...paths: string[]) => {
  return path.join(process.cwd(), ...paths);
};
