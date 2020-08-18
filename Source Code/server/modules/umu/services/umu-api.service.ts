import { HttpService, Injectable } from '@nestjs/common';
import _ from 'lodash';

@Injectable()
export class UMUAPIService {
  constructor(private readonly httpService: HttpService) {}

  // 创建UMU用户
  private createUser() {
    // TODO:发送请求
    // TODO：记录操作log
  }

  // 更新UMU用户
  private updateUser() {
    // TODO:发送请求
    // TODO：记录操作log
  }

  // 查找UMU用户
  private getUser() {
    // TODO:发送请求
    // TODO：记录操作log
  }

  // 删除UMU用户
  private deleteUser() {
    // TODO:发送请求
    // TODO：记录操作log
  }
}
