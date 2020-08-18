import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DATABASE_CONFIG } from './configs';
import { ExceptionModule } from './core/exception';
import { InterceptorModule } from './core/interceptor';
import { SetHostMiddleware } from './core/middleware';
import { ScheduleModule } from './framework/schedule';
import { UMUModule } from './modules/umu';

const modules = [
  TypeOrmModule.forRoot(DATABASE_CONFIG),
  ExceptionModule,
  InterceptorModule,
  ScheduleModule,
  UMUModule,
];

@Module({
  imports: [...modules],
})
export class AppModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    const middlewares = [SetHostMiddleware];
    consumer.apply(...middlewares).forRoutes('*');
  }
}
