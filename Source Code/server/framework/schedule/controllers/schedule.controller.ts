import { Controller, Get, Query } from '@nestjs/common';
import { ScheduleService } from '../services';

@Controller('api/v1/schedules')
export class ScheduleController {
  constructor(private readonly scheduleService: ScheduleService) {}

  @Get('synchronizationMeituan')
  public async get(@Query('nonce') nonce: string) {
    this.scheduleService.synchronizationMeituan(nonce);
  }
}
