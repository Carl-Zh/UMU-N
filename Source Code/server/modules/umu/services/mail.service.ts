import { Inject, Injectable } from '@nestjs/common';
import csvStringify from 'csv-stringify/lib/sync';
import _ from 'lodash';
import moment from 'moment';
import { Logger } from '../../../core';
import { getMailerServiceToken, MailerService } from '../../../plugins/mailer';
import { SynchronizationLogEntity } from '../entities';

@Injectable()
export class MailService {
  public senderEmail = String(process.env.SENDER_EMAIL);
  public receiverEmail = String(process.env.RECEIVER_EMAIL);

  constructor(
    @Inject(getMailerServiceToken())
    private readonly mailerService: MailerService,
  ) {}

  private getLogsCsv(logs: SynchronizationLogEntity[]) {
    const csvString = csvStringify(
      logs.map((log) => ({
        id: log.id,
        action: log.action,
        content: log.content,
        step: log.step,
        status: log.status,
        message: log.message,
        createdDate: moment(log.createdDate).format('YYYY-MM-DD hh:mm:ss'),
      })),
      { header: true },
    );
    return csvString.length === 0 ? '' : `\ufeff${csvString}`;
  }

  public async sendLocalSadExceptionMail(error: Error) {
    const result = await this.mailerService.send({
      from: this.senderEmail,
      subject: 'local sad exception',
      to: this.receiverEmail,
      html: error.message,
    });
    Logger.log(result, 'MeituanModule MailService Result');
    return result;
  }

  public async sendSynchronizationReport(logs: SynchronizationLogEntity[]) {
    const result = await this.mailerService.send({
      subject: 'synchronization report',
      from: this.senderEmail,
      to: this.receiverEmail,
      html: 'synchronization report',
      attachments: [{ filename: 'logs.csv', content: this.getLogsCsv(logs) }],
    });
    Logger.log(result, 'MeituanModule MailService Result');
    return result;
  }
}
