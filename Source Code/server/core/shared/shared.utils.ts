import { HttpException } from '@nestjs/common';
import { BusinessException } from '../exception';
import { HTTP_STATUS_CODE_ENUM } from './enums';
import { IResult } from './interfaces';

export function createResult(error?: Error | HttpException): IResult;
export function createResult(error?: Error | HttpException, code?: number): IResult;
export function createResult(content?: any): IResult;
export function createResult(content?: any, code?: number): IResult;
export function createResult(
  contentOrError: any = {},
  code: number = HTTP_STATUS_CODE_ENUM.OK,
): IResult {
  let content: any = {};
  let message = '';
  if (contentOrError instanceof BusinessException) {
    if (contentOrError.frontendMessage) {
      message = contentOrError.frontendMessage;
    }
  } else if (contentOrError instanceof HttpException) {
    code = contentOrError.getStatus();
  } else if (contentOrError instanceof Error) {
    code = HTTP_STATUS_CODE_ENUM.INTERNAL_SERVER_ERROR;
  } else {
    content = contentOrError;
  }
  const result: IResult = {
    content,
    code,
    message,
  };
  return result;
}
