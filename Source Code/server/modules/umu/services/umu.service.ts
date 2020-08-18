import { HttpService, Injectable } from '@nestjs/common';
import _ from 'lodash';

@Injectable()
export class UMUService {
  constructor(private readonly httpService: HttpService) {}

  // 创建UMU用户
  public createUser() {
    // TODO:发送请求
    // TODO：记录操作log
  }

  // 更新UMU用户
  public updateUser() {
    // TODO:发送请求
    // TODO：记录操作log
  }

  // 查找UMU用户
  public getUser() {
    // TODO:发送请求
    // TODO：记录操作log
  }

  // 删除UMU用户
  public deleteUser() {
    // TODO:发送请求
    // TODO：记录操作log
  }
}
