import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import _ from 'lodash';
import { Repository } from 'typeorm';
import { IEmployee } from '../../../plugins/local-sad';
import { EmployeeEntity } from '../entities';
import { SynchronizationLogService } from './synchronization-log.service';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(EmployeeEntity)
    private readonly employeeRepository: Repository<EmployeeEntity>,
    private readonly synchronizationLogService: SynchronizationLogService,
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

  // 当获取到 HCM 的 Employee 数据后，与本地数据进行比较
  public async compareEmployee(originEmployee: IEmployee[]) {
    const existEmployee = await this.getExistEmployee();
    const newEmployee: IEmployee[] = [];
    const updateEmployee: IEmployee[] = [];
    const deleteEmployee: IEmployee[] = [];
    let countLevel1 = 0;
    let countLevel2 = 0;
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < originEmployee.length; i++) {
      countLevel1++;
      let isNew = true;
      for (let j = 0; j < existEmployee.length; j++) {
        countLevel2++;
        if (originEmployee[i].GLBL_EMPLY_ID === existEmployee[j].glblEmplyId) {
          isNew = false;
          existEmployee.splice(j, 1);
          j--;
          break;
        }
      }
      if (isNew) {
        newEmployee.push(originEmployee[i]);
      }
    }

    await this.employeeRepository.insert(newEmployee as any);
  }

  // 从数据库读取employee数据
  public async getExistEmployee() {
    const existEmployee = await this.employeeRepository.find({
      where: { isDeleted: false },
      order: { glblEmplyId: 'ASC' },
    });
    return existEmployee;
  }
}
