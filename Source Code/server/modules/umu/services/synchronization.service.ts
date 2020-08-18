import { Injectable } from '@nestjs/common';
import _ from 'lodash';

@Injectable()
export class SynchronizationService {
  constructor() // @InjectRepository(AdministratorEntity)
  // private readonly administratorRepository: Repository<AdministratorEntity>,
  // private readonly localSadService: LocalSadService,
  // private readonly employeeService: EmployeeService,
  // private readonly roleService: RoleService,
  // private readonly departmentService: DepartmentService,
  // private readonly costCenterService: CostCenterService,
  // private readonly synchronizationScheduleService: SynchronizationScheduleService,
  // private readonly synchronizationReportService: SynchronizationReportService,
  // private readonly mailService: MailService,
  {}

  private async getLocalSadEmployees() {
    // try {
    //   const { EMPLOYEE_COUNT: total } = await this.localSadService.getEmployeesAndCount();
    //   if (total === 0) {
    //     throw new Error('employee count is 0!');
    //   }
    //   const count = Math.ceil(total / 1000);
    //   const tasks: Promise<IEmployee[]>[] = [];
    //   for (let index = 0; index < count; index++) {
    //     const task = this.localSadService
    //       .getEmployeesAndCount(index + 1, 1000)
    //       .then((data) => data.EMPLOYEE_LIST);
    //     tasks.push(task);
    //   }
    //   const result = await Promise.all(tasks);
    //   const localSadEmployees = _.flatMap(result);
    //   return localSadEmployees;
    // } catch (error) {
    //   Logger.error(error, 'MeituanModule SynchronizationService Exception');
    //   this.mailService.sendLocalSadExceptionMail(error);
    //   throw error;
    // }
  }

  private async getAdministrators() {
    // const administrators = await this.administratorRepository.find({ isDeleted: false });
    // const employees: IEmployee[] = administrators.map((administrator) => {
    //   return {
    //     EMPLOYEE_GLOBAL_ID: administrator.globalId,
    //     EMPLOYEE_ACCOUNT: administrator.account,
    //     EMPLOYEE_NAME: administrator.name,
    //     EMPLOYEE_EMAIL: administrator.email,
    //     EMPLOYEE_CITY: administrator.city,
    //     DPRTMNT: administrator.departmentName,
    //     BU: administrator.buName,
    //     SALES_REGION: administrator.regionName,
    //     USER_ROLE: administrator.roleName,
    //     COST_CENTER: administrator.costCenterName,
    //     SUPERVISOR1_ACCOUNT: administrator.supervisorAccount,
    //     SUPERVISOR1_NAME: administrator.supervisorName,
    //     SUPERVISOR1_EMAIL: administrator.supervisorEmail,
    //     SUPERVISOR1_ROLE: administrator.supervisorRoleName,
    //   };
    // });
    // return employees;
  }

  public async synchronization(count?: number) {
    // const beginTime = moment();
    // const [
    //   todaySchedule,
    //   localSadEmployees,
    //   administratorEmployees,
    //   employees,
    //   departments,
    //   roles,
    //   costCenters,
    // ] = await Promise.all([
    //   this.synchronizationScheduleService.getTodaySchedule(),
    //   this.getLocalSadEmployees(),
    //   this.getAdministrators(),
    //   this.employeeService.getEmployees(),
    //   this.departmentService.getDepartments(),
    //   this.roleService.getRoles(),
    //   this.costCenterService.getCostCenters(),
    // ]);
    // const lillyEmployees =
    //   process.env.DEBUG_ADMINISTRATOR === 'true'
    //     ? administratorEmployees
    //     : count === undefined
    //     ? localSadEmployees.concat(administratorEmployees)
    //     : localSadEmployees.concat(administratorEmployees).splice(0, count);
    // const localSadDepartments = this.departmentService.getLocalSadDepartments(lillyEmployees);
    // const localSadRoles = this.roleService.getLocalSadRoles(lillyEmployees);
    // const localSadCostCenters = this.costCenterService.getLocalSadCostCenters(lillyEmployees);
    // const [newestDepartments, newestRoles, newestCostCenters] = await Promise.all([
    //   this.departmentService.synchronizationDepartments(
    //     localSadDepartments,
    //     departments,
    //     todaySchedule,
    //   ),
    //   this.roleService.synchronizationRoles(localSadRoles, roles, todaySchedule),
    //   this.costCenterService.synchronizationCostCenters(
    //     localSadCostCenters,
    //     costCenters,
    //     todaySchedule,
    //   ),
    // ]);
    // const result = await this.employeeService.synchronizationEmployees(
    //   count === undefined ? lillyEmployees : lillyEmployees.splice(0, count),
    //   employees,
    //   newestDepartments,
    //   newestRoles,
    //   newestCostCenters,
    //   todaySchedule,
    // );
    // const endTime = moment();
    // this.synchronizationReportService.report(todaySchedule);
    // Logger.log(
    //   `synchronization begin ${beginTime.format('YYYY-MM-DD HH:mm:ss')}, end ${endTime.format(
    //     'YYYY-MM-DD HH:mm:ss',
    //   )}, during ${endTime.diff(beginTime, 'seconds')} seconds`,
    //   'MeituanModule SynchronizationService',
    // );
  }
}
