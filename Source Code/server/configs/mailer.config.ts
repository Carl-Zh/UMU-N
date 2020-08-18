import _ from 'lodash';
import { Logger } from '../core';
import { IMailerOptions } from '../plugins/mailer';
import { isLocal } from '../utils';

const {
  MAILER_HOST: host,
  MAILER_PORT: port,
  MAILER_USERNAME: username,
  MAILER_PASSWORD: password,
} = process.env;

const MAILER_CONFIG: IMailerOptions = {
  host: _.toString(host),
  port: _.toNumber(port),
  secure: _.toNumber(port) === 465 ? true : false,
  auth:
    username && password
      ? {
          user: username,
          pass: password,
        }
      : undefined,
};

if (isLocal()) {
  Logger.debug(MAILER_CONFIG, 'Mailer Config');
}

export { MAILER_CONFIG };
