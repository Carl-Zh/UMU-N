import { FactoryProvider, Provider } from '@nestjs/common/interfaces';
import _ from 'lodash';
import { IMailerOptions } from './interfaces';
import { MailerService } from './services';

export const getMailerServiceProvider = (mailerOptions: IMailerOptions, name: string): Provider => {
  const provider: FactoryProvider = {
    provide: getMailerServiceToken(name),
    inject: [],
    useFactory: () => {
      return new MailerService(mailerOptions);
    },
  };
  return provider;
};

export const getMailerServiceToken = (name = 'Default') => `${_.capitalize(name)}MailerService`;
