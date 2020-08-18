import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { createResult } from '../../shared';

@Injectable()
export class ResultInterceptor implements NestInterceptor {
  constructor(private readonly reflector: Reflector) {}

  public intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const disableResult = this.reflector.get<boolean>('disableResult', context.getHandler());
    return next.handle().pipe(
      map((data) => {
        return !disableResult ? createResult(data) : data;
      }),
    );
  }
}
