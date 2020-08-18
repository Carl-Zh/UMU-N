// tslint:disable-next-line: no-import-side-effect
import 'reflect-metadata';

import dotenv from 'dotenv';
dotenv.config();

import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { Logger } from './core';
import { ErrorExceptionFilter, ExceptionModule, HttpExceptionFilter } from './core/exception';
import { ExceptionLogInterceptor, InterceptorModule, ResultInterceptor } from './core/interceptor';
import { userMiddlewares } from './middlwares';
import { getPath, getRootPath } from './utils';

const bootstrap = async () => {
  try {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);
    const port = process.env.PORT ? Number(process.env.PORT) : 8080;

    app.set('trust proxy', true);

    userMiddlewares(app);

    app.useStaticAssets(getPath('client'));
    app.useStaticAssets(getRootPath('statics'));
    app.useStaticAssets(getRootPath('resources'), { prefix: '/resources' });

    app.useGlobalFilters(
      app.select(ExceptionModule).get(ErrorExceptionFilter),
      app.select(ExceptionModule).get(HttpExceptionFilter),
    );
    app.useGlobalInterceptors(
      app.select(InterceptorModule).get(ExceptionLogInterceptor),
      app.select(InterceptorModule).get(ResultInterceptor),
    );

    await app.listen(port);
  } catch (error) {
    Logger.error(error, 'ApplicationBootstrapError', error.stack);
    throw error;
  }
};

bootstrap();
