import _ from 'lodash';
import { ConnectionOptions } from 'typeorm';
import { LoggerOptions } from 'typeorm/logger/LoggerOptions';
import { DatabaseLogger, Logger } from '../core';
import { isLocal } from '../utils';

const {
  DATABASE_HOST: host,
  DATABASE_INSTANCE: instanceName,
  DATABASE_PORT: port,
  DATABASE_NAME: database,
  DATABASE_USERNAME: username,
  DATABASE_PASSWORD: password,
  DATABASE_SYNCHRONIZE: synchronize,
} = process.env;
const logging: LoggerOptions = isLocal() ? false : ['schema', 'error', 'migration'];

const DATABASE_CONFIG: ConnectionOptions = {
  type: 'mssql',
  host: _.toString(host),
  port: _.toNumber(port),
  database: _.toString(database),
  username: _.toString(username),
  password: _.toString(password),
  entities: [
    `${__dirname}/../core/**/**.entity{.ts,.js}`,
    `${__dirname}/../framework/**/**.entity{.ts,.js}`,
    `${__dirname}/../modules/**/**.entity{.ts,.js}`,
  ],
  logger: new DatabaseLogger(logging),
  logging,
  extra: {
    instanceName: instanceName ? instanceName : undefined,
  },
  synchronize: synchronize === 'true',
};

if (isLocal()) {
  Logger.debug(DATABASE_CONFIG, 'Database Config');
}

export { DATABASE_CONFIG };
