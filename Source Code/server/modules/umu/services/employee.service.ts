import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import _ from 'lodash';
import { Repository } from 'typeorm';
import { EmployeeEntity } from '../entities';
import { SynchronizationLogService } from './synchronization-log.service';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(EmployeeEntity)
    private readonly employeeRepository: Repository<EmployeeEntity>,
    private readonly synchronizationLogService: SynchronizationLogService,
  ) {}

  // 触发函数 - 开始从HCM同步数据
  private syncEmployeeWithHCM() {
    // TODO: 重复调用 getEmployeeFromHCM 函数，直到取完所有数据
    // TODO：记录操作log
  }

  // 从HCM分页同步数据
  private getEmployeeFromHCM(pageNumber = 1, pageSize = 100) {
    // TODO: 实现分页取数据
    // TODO：记录操作log
  }

  // 将从HCM获取的数据存入数据库
  private saveEmployee() {
    // TODO: 存入数据库
    // TODO：记录操作log
  }

  // 从数据库读取employee数据
  private getEmployee() {
    // TODO: 取出
    // TODO：记录操作log
  }

  // 比较employee数据
  private compareEmployee() {
    // TODO: 对比
    // TODO：记录操作log
  }
}
