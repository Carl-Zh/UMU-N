import { NestExpressApplication } from '@nestjs/platform-express';
import bodyParser from 'body-parser';
import compression from 'compression';
import history from 'connect-history-api-fallback-exclusions';
import cookie from 'cookie-parser';
import httpContext from 'express-http-context';
import rateLimit from 'express-rate-limit';
import session from 'express-session';
import helmet from 'helmet';
import { isLocal } from './utils';

export const userMiddlewares = (app: NestExpressApplication) => {
  const cookieSecret = String(process.env.COOKIE_SECRET);
  const sessionSecret = String(process.env.SESSION_SECRET);
  const rateLimitMax = Number(process.env.RATE_LIMIT_MAX);
  const historyExclusions = String(process.env.HISTORY_EXCLUSIONS).split(',');

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(compression());
  app.use(cookie(cookieSecret));
  app.use(helmet());
  app.use(
    session({
      secret: sessionSecret,
      resave: false,
      saveUninitialized: true,
      cookie: {
        secure: isLocal() ? false : true,
      },
    }),
  );
  app.use(rateLimit({ max: rateLimitMax }));
  app.use(httpContext.middleware);
  app.use(history({ exclusions: historyExclusions }));
};
