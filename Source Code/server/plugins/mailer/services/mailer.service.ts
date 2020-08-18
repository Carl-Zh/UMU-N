import { Injectable } from '@nestjs/common';
import { createTransport, Transporter } from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';
import { IMailerOptions } from '../interfaces';

@Injectable()
export class MailerService {
  private readonly mailer: Transporter;
  constructor(options: IMailerOptions) {
    this.mailer = createTransport(options);
  }

  public send(options: Mail.Options) {
    return this.mailer.sendMail(options);
  }
}
