import { HttpModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MAILER_CONFIG } from '../../configs';
import { LocalSadModule } from '../../plugins/local-sad';
import { MailerModule } from '../../plugins/mailer';
import { UmuDebugController } from './controllers';
import {
  EmployeeEntity,
  SynchronizationLogEntity,
  SynchronizationScheduleEntity,
} from './entities';
import {
  EmployeeService,
  MailService,
  SynchronizationLogService,
  SynchronizationScheduleService,
  SynchronizationService,
  UMUService,
} from './services';
import { HCMService } from './services/hcm.service';

const entities = [EmployeeEntity, SynchronizationLogEntity, SynchronizationScheduleEntity];
const modules = [
  TypeOrmModule.forFeature(entities),
  MailerModule.forRoot(MAILER_CONFIG),
  LocalSadModule,
  HttpModule,
];
const controllers = [UmuDebugController];
const services = [
  EmployeeService,
  MailService,
  SynchronizationLogService,
  SynchronizationScheduleService,
  SynchronizationService,
  UMUService,
  HCMService,
];
const providers = [...services];

@Module({
  imports: [...modules],
  controllers,
  providers,
  exports: [...providers],
})
export class UMUModule {}
