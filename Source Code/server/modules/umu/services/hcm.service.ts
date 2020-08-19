import { Injectable } from '@nestjs/common';
import _ from 'lodash';
import { IEmployee, IEmployeesAndCount } from '../../../plugins/local-sad';
import { LocalSadService } from '../../../plugins/local-sad/services/local-sad.service';

@Injectable()
export class HCMService {
  public employeeInHCM: IEmployee[] = [];

  constructor(private readonly localSadService: LocalSadService) {}

  // 从 HCM 取 employee 数据.
  public async fetchEmployeeFromHCM(): Promise<IEmployee[]> {
    let users: IEmployee[] = [];
    const pageSize = _.toNumber(process.env.HCM_PER_REQUEST_COUNT);
    const employeesAndCount = await this.localSadService.getEmployeesAndCount(1, pageSize);
    const totalEmployees = employeesAndCount.EMPLOYEE_COUNT;
    const repeatCount = totalEmployees > pageSize ? Math.ceil(totalEmployees / pageSize) : 0;
    users = employeesAndCount.EMPLOYEE_LIST;
    if (repeatCount > 0) {
      const requestList: Promise<IEmployeesAndCount>[] = [];
      for (let i = 1; i < repeatCount; i++) {
        const otherEmployeesAndCount = await this.localSadService.getEmployeesAndCount(
          i + 1,
          pageSize,
        );
        users.push(...otherEmployeesAndCount.EMPLOYEE_LIST);
      }
    }

    return users;
  }
}
