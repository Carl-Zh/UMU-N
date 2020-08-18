import { Module } from '@nestjs/common';
import { UMUModule } from '../../modules/umu';
import { ScheduleController } from './controllers';
import { ScheduleService } from './services';

const modules = [UMUModule];
const controllers = [ScheduleController];
const services = [ScheduleService];
const providers = [...services];

@Module({
  imports: [...modules],
  controllers,
  providers,
})
export class ScheduleModule {}
