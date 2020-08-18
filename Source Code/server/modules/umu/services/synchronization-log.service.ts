import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import _ from 'lodash';
import { ObjectLiteral, Repository } from 'typeorm';
import { SynchronizationLogEntity, SynchronizationScheduleEntity } from '../entities';
import {
  SYNCHRONIZATION_LOG_ACTION_ENUM,
  SYNCHRONIZATION_LOG_STATUS_ENUM,
  SYNCHRONIZATION_LOG_STEP_ENUM,
} from '../enums';

@Injectable()
export class SynchronizationLogService {
  constructor(
    @InjectRepository(SynchronizationLogEntity)
    private readonly synchronizationLogEntityRepository: Repository<SynchronizationLogEntity>,
  ) {}

  public createHCMFetchLogs(success: boolean, message: string) {
    this.synchronizationLogEntityRepository.create({
      action: SYNCHRONIZATION_LOG_ACTION_ENUM.FETCH,
      step: SYNCHRONIZATION_LOG_STEP_ENUM.HCM,
      status: success
        ? SYNCHRONIZATION_LOG_STATUS_ENUM.SUCCEEDED
        : SYNCHRONIZATION_LOG_STATUS_ENUM.FAILED,
      message,
    });
  }

  public createModel(
    todaySchedule: SynchronizationScheduleEntity,
    action: string,
    category: string,
    model: ObjectLiteral,
  ) {
    // let status =
    //   response.status === 0
    //     ? SYNCHRONIZATION_LOG_STATUS_ENUM.SUCCEEDED
    //     : SYNCHRONIZATION_LOG_STATUS_ENUM.FAILED;
    // const categoryCode =
    //   category === SYNCHRONIZATION_LOG_CATEGORY_ENUM.EMPLOYEE ||
    //   category === SYNCHRONIZATION_LOG_CATEGORY_ENUM.BIND_DEPARTMENT ||
    //   category === SYNCHRONIZATION_LOG_CATEGORY_ENUM.BIND_ROLE ||
    //   category === SYNCHRONIZATION_LOG_CATEGORY_ENUM.BIND_COST_CENTER
    //     ? model.account
    //     : model.code;
    // let message = response.msg;
    // if (category === SYNCHRONIZATION_LOG_CATEGORY_ENUM.EMPLOYEE) {
    //   status =
    //     ((response.data as unknown) as IMeituanEmployeeResponse[])[0].isSucc === 10
    //       ? SYNCHRONIZATION_LOG_STATUS_ENUM.SUCCEEDED
    //       : SYNCHRONIZATION_LOG_STATUS_ENUM.FAILED;
    //   message = ((response.data as unknown) as IMeituanEmployeeResponse[])[0].reason;
    // }
    // const logModel = this.synchronizationLogEntityRepository.create({
    //   scheduleId: todaySchedule.id,
    //   sequence: todaySchedule.executeNumber,
    //   action,
    //   category,
    //   categoryId: _.toString(model.id),
    //   categoryCode,
    //   content: JSON.stringify(model),
    //   status,
    //   message,
    // });
    // return logModel;
  }

  public async getTodaySynchronizationLogs(todaySchedule: SynchronizationScheduleEntity) {
    // const todaySynchronizationLogs = await this.synchronizationLogEntityRepository.find({
    //   where: {
    //     scheduleId: todaySchedule.id,
    //     sequence: todaySchedule.executeNumber,
    //   },
    // });
    // return todaySynchronizationLogs;
  }

  public async create(logs: SynchronizationLogEntity[]) {
    // await this.synchronizationLogEntityRepository.save(logs, { chunk: 100 });
  }
}
