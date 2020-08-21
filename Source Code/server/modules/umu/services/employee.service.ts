import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import _ from 'lodash';
import { DeepPartial, Repository } from 'typeorm';
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

  // 当获取到 HCM 的 Employee 数据后，与本地数据进行比较
  public async compareEmployee(hcmEmployees: IEmployee[]) {
    const existEmployees = await this.getExistEmployee();
    const newEmployees: IEmployee[] = [];
    const updateEmployees: IEmployee[] = [];
    const deleteEmployees: EmployeeEntity[] = [];

    _.forEach(hcmEmployees, (hcmEmployee) => {
      const existEmployee = _.find(existEmployees, (existEmployee) => {
        return existEmployee.glblEmplyId === hcmEmployee.GLBL_EMPLY_ID;
      });
      if (!existEmployee) {
        // 筛选新用户
        newEmployees.push(hcmEmployee);
      } else {
        _.remove(existEmployees, (user) => {
          return user.glblEmplyId === existEmployee.glblEmplyId;
        });
        if (this.checkSingleEmployeeUpdate(hcmEmployee, existEmployee)) {
          // 筛选更新过的用户
          updateEmployees.push(hcmEmployee);
        }
      }
    });

    // 筛选要删除的用户
    deleteEmployees.push(...existEmployees);

    await this.createEmployee(newEmployees);
  }

  // 创建 Employee
  public async createEmployee(newEmployees: IEmployee[]) {
    const newEmployeeEntities: any[] = [];
    _.forEach(newEmployees, (newEmployee) => {
      newEmployeeEntities.push(this.convertEmployeeToEntity(newEmployee, true));
    });

    const chunkNewEmployees = _.chunk(newEmployeeEntities, 25);
    const startDate = new Date();
    // const aaaa: any[] = [];
    console.log('begin');
    for (let i = 0; i < chunkNewEmployees.length; i++) {
      const beginDate = new Date();
      await this.employeeRepository.insert(chunkNewEmployees[i]);
      const endDate = new Date();
      const costTime = endDate.getTime() - beginDate.getTime();
      console.log(`index ${i} delays: ${costTime} ms`);
      // aaaa.push(this.employeeRepository.insert(chunkNewEmployees[i]));
    }
    // await Promise.all(aaaa);
    // await this.employeeRepository.insert(chunkNewEmployees[0]);
    const completeDate = new Date();
    console.log(
      `end insert employee, total cost ${completeDate.getTime() - startDate.getTime()} ms`,
    );
  }

  // 将从 HCM 获取的 Employee 信息转换为 EmployeeEntity
  public convertEmployeeToEntity(hcmEmployee: IEmployee, isCreate: boolean) {
    const employee = {
      glblEmplyId: hcmEmployee.GLBL_EMPLY_ID,
      acntName: hcmEmployee.ACNT_NAME,
      chineseName: hcmEmployee.CHINESE_NAME,
      email: hcmEmployee.EMAIL,
      cmpny: hcmEmployee.CMPNY,
      dprtmnt: hcmEmployee.DPRTMNT,
      subDprtmnt: hcmEmployee.SUB_DPRTMNT,
      title: hcmEmployee.TITLE,
      jobFamilyGroup: hcmEmployee.JOB_FAMILIY_GROUP,
      jobFamily: hcmEmployee.JOB_FAMILIY,
      sttsInd: hcmEmployee.STTS_IND,
      workerType: hcmEmployee.WORKER_TYPE,
      workerSubType: hcmEmployee.WORKER_SUB_TYPE,
      payLevel: hcmEmployee.PAYLEVEL,
      hireDate: hcmEmployee.HIREDATE,
      sprvsrGlblId: hcmEmployee.SPRVSR_GLBL_ID,
      sprvsrChineseName: hcmEmployee.SPRVSR_CHINESE_NAME,
      sprvsrMail: hcmEmployee.SPRVSR_MAIL,
      productSleeve: hcmEmployee.PRODUCT_SLEEVE,
    };
    if (isCreate) {
      _.assign(employee, { createDate: new Date() });
    } else {
      _.assign(employee, { updateDate: new Date() });
    }

    return employee;
  }

  // 从数据库读取 Employee 数据
  public async getExistEmployee() {
    const existEmployee = await this.employeeRepository.find({
      order: { glblEmplyId: 'ASC' },
    });
    return existEmployee;
  }

  // 检查用户是否需要更新
  public checkSingleEmployeeUpdate(hcmEmployee: IEmployee, existEmployee: EmployeeEntity): boolean {
    if (
      existEmployee.acntName !== hcmEmployee.ACNT_NAME ||
      existEmployee.chineseName !== hcmEmployee.CHINESE_NAME ||
      existEmployee.email !== hcmEmployee.EMAIL ||
      existEmployee.cmpny !== hcmEmployee.CMPNY ||
      existEmployee.dprtmnt !== hcmEmployee.DPRTMNT ||
      existEmployee.subDprtmnt !== hcmEmployee.SUB_DPRTMNT ||
      existEmployee.title !== hcmEmployee.TITLE ||
      existEmployee.jobFamilyGroup !== hcmEmployee.JOB_FAMILIY_GROUP ||
      existEmployee.jobFamily !== hcmEmployee.JOB_FAMILIY ||
      existEmployee.sttsInd !== hcmEmployee.STTS_IND ||
      existEmployee.workerType !== hcmEmployee.WORKER_TYPE ||
      existEmployee.workerSubType !== hcmEmployee.WORKER_SUB_TYPE ||
      existEmployee.payLevel !== hcmEmployee.PAYLEVEL ||
      existEmployee.hireDate !== hcmEmployee.HIREDATE ||
      existEmployee.sprvsrGlblId !== hcmEmployee.SPRVSR_GLBL_ID ||
      existEmployee.sprvsrChineseName !== hcmEmployee.SPRVSR_CHINESE_NAME ||
      existEmployee.sprvsrMail !== hcmEmployee.SPRVSR_MAIL ||
      existEmployee.productSleeve !== hcmEmployee.PRODUCT_SLEEVE
    ) {
      return true;
    } else {
      return false;
    }
  }
}
