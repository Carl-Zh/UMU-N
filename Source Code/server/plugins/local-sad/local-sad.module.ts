import { Module } from '@nestjs/common';
import { LocalSadService } from './services/local-sad.service';

const services = [LocalSadService];
const providers = [...services];

@Module({
  providers,
  exports: [...services],
})
export class LocalSadModule {}
