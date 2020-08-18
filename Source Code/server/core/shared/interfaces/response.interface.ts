import Express from 'express';

export interface IResponse extends Express.Response {
  [name: string]: any;
}
