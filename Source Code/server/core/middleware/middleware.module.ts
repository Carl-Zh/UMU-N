import { Module } from '@nestjs/common';
import { SetHostMiddleware } from './middlewares';

const middlewares = [SetHostMiddleware];
const providers = [...middlewares];

@Module({
  providers,
})
export class MiddlewareModule {}
