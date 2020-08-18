import Express from 'express';

export interface IRequest extends Express.Request {
  [name: string]: any;
}
