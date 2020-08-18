import { Body, Controller, Get, Post } from '@nestjs/common';
import { HCMService } from './../services/hcm.service';

@Controller('api/v1/umuDebug')
export class UmuDebugController {
  constructor(private readonly hcmService: HCMService) {}

  @Post('email')
  public sendEmailToUser(@Body('targetUser') user: string) {
    // TODO: 向指定用户发送邮件
    // TODO: 捕获判断email发送状态
    return { code: 200, message: 'complete' };
  }

  @Post('hcmall')
  public async getAllUsersFromHCM() {
    const employee = await this.hcmService.syncEmployeeWithHCM();
    // TODO: 调用service从HCM取数据
    return employee;
  }

  @Post('hcm')
  public getUsersFromHCM(@Body('pageNumber') pageNumber = 1, @Body('pageSize') pageSize = 100) {
    // TODO: 调用service从HCM取数据
    return { code: 200, message: 'complete' };
  }

  @Post('umuapi')
  public sendRequestToUmuAPI(@Body('operationType') operationType: string) {
    // TODO: 调用service与UMUAPI通信
    switch (operationType) {
      case 'getUser':
        // TODO: 发送获取用户信息的请求
        break;
      case 'createUser':
        // TODO: 发送创建用户信息的请求
        break;
      case 'updateUser':
        // TODO: 发送更新用户信息的请求
        break;
      case 'DeleteUser':
        // TODO: 发送删除用户信息的请求
        break;
      default:
        break;
    }
    return { code: 200, message: 'complete' };
  }
}
