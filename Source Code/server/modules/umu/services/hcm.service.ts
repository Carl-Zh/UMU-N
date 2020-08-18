import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import _ from 'lodash';
import { IEmployee, IEmployeesAndCount } from 'plugins/local-sad';
import { Repository } from 'typeorm';
import { LocalSadService } from '../../../plugins/local-sad/services/local-sad.service';
import { EmployeeEntity } from '../entities';
import { SynchronizationLogService } from './synchronization-log.service';

@Injectable()
export class HCMService {
  public originUsers: IEmployee[] = [];

  constructor(
    private readonly localSadService: LocalSadService,
    private readonly logService: SynchronizationLogService,
  ) {}

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

  // 开始从HCM同步数据
  public async syncEmployeeWithHCM(): Promise<IEmployee[]> {
    // TODO: 配置文件
    const pageSize = 999;
    const employeeAndCount = await this.localSadService.getEmployeesAndCount(1, pageSize);
    const totalEmployee = employeeAndCount.EMPLOYEE_COUNT;
    const repeatCount = totalEmployee > pageSize ? Math.ceil(totalEmployee / pageSize) : 0;
    this.originUsers = employeeAndCount.EMPLOYEE_LIST;
    if (repeatCount > 0) {
      const requestList: Promise<IEmployeesAndCount>[] = [];
      for (let i = 1; i < repeatCount; i++) {
        requestList.push(this.localSadService.getEmployeesAndCount(i + 1, pageSize));
      }
      // TODO: 顺序取
      const otherEmployeeAndCountList = await Promise.all(requestList);
      _.forEach(otherEmployeeAndCountList, (otherEmployeeAndCount) => {
        this.originUsers.push(...otherEmployeeAndCount.EMPLOYEE_LIST);
      });
    }

    // this.logService.createHCMFetchLogs(true, 'Fetch user from HCM success');
    return this.originUsers;
  }
}
