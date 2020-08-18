import { DynamicModule, Module } from '@nestjs/common';
import { IMailerOptions } from './interfaces';
import { getMailerServiceProvider } from './mailer.utils';

@Module({})
export class MailerModule {
  public static forRoot(mailerOptions: IMailerOptions, name = 'Default'): DynamicModule {
    const providers = [getMailerServiceProvider(mailerOptions, name)];
    return {
      module: MailerModule,
      providers,
      exports: [...providers],
    };
  }
}
