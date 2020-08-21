import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ schema: 'dbo', name: 'employees' })
export class EmployeeEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  // GLBL_EMPLY_ID -> "2123456"
  @Column('nvarchar', { nullable: true, name: 'GLBL_EMPLY_ID' })
  public glblEmplyId: string;

  // ACNT_NAME -> "C123456"
  @Column('nvarchar', { nullable: true, name: 'ACNT_NAME' })
  public acntName: string;

  // CHINESE_NAME -> "李XX"
  @Column('nvarchar', { nullable: true, name: 'CHINESE_NAME' })
  public chineseName: string;

  // EMAIL -> "MA_SHUAI@LILLY.COM"
  @Column('nvarchar', { nullable: true, name: 'EMAIL' })
  public email: string;

  // CMPNY -> "Affiliate"
  @Column('nvarchar', { nullable: true, name: 'CMPNY' })
  public cmpny: string;

  // DPRTMNT -> "ONC National"
  @Column('nvarchar', { nullable: true, name: 'DPRTMNT' })
  public dprtmnt: string;

  // SUB_DPRTMNT -> "ONC Elunate South"
  @Column('nvarchar', { nullable: true, name: 'SUB_DPRTMNT' })
  public subDprtmnt: string;

  // TITLE -> "DM"
  @Column('nvarchar', { nullable: true, name: 'TITLE' })
  public title: string;

  // JOB_FAMILIY_GROUP -> "Sales (JFG)"
  @Column('nvarchar', { nullable: true, name: 'JOB_FAMILIY_GROUP' })
  public jobFamilyGroup: string;

  // JOB_FAMILIY -> "Sales"
  @Column('nvarchar', { nullable: true, name: 'JOB_FAMILIY' })
  public jobFamily: string;

  // STTS_IND -> "1"
  @Column('nvarchar', { nullable: true, name: 'STTS_IND' })
  public sttsInd: string;

  // WORKER_TYPE -> "Employee"
  @Column('nvarchar', { nullable: true, name: 'WORKER_TYPE' })
  public workerType: string;

  // WORKER_SUB_TYPE -> "Regular"
  @Column('nvarchar', { nullable: true, name: 'WORKER_SUB_TYPE' })
  public workerSubType: string;

  // PAYLEVEL -> "S6"
  @Column('nvarchar', { nullable: true, name: 'PAYLEVEL' })
  public payLevel: string;

  // HIREDATE -> "12/1/2017 12:00:00 AM"
  @Column('nvarchar', { nullable: true, name: 'HIREDATE' })
  public hireDate: string;

  // SPRVSR_GLBL_ID -> "212456"
  @Column('nvarchar', { nullable: true, name: 'SPRVSR_GLBL_ID' })
  public sprvsrGlblId: string;

  // SPRVSR_CHINESE_NAME -> "Chen xxx"
  @Column('nvarchar', { nullable: true, name: 'SPRVSR_CHINESE_NAME' })
  public sprvsrChineseName: string;

  // SPRVSR_MAIL -> "CHEN_xxx@LILLY.COM"
  @Column('nvarchar', { nullable: true, name: 'SPRVSR_MAIL' })
  public sprvsrMail: string;

  // PRODUCT_SLEEVE -> ""，暂时没使用的属性
  @Column('nvarchar', { nullable: true, name: 'PRODUCT_SLEEVE' })
  public productSleeve: string;

  @Column('datetime2', { nullable: true, name: 'EMPLOYEE_CREATEDATE' })
  public createDate: Date;

  @Column('datetime2', { nullable: true, name: 'EMPLOYEE_UPDATEDATE' })
  public updateDate: Date;

  @Column('bit', { nullable: true, name: 'IS_UPLOAD_TO_UMU' })
  public isUploadToUMU: boolean;

  @BeforeInsert()
  public beforeInsertEvent() {
    this.createDate = new Date();
  }

  @BeforeUpdate()
  public beforeUpdate() {
    this.updateDate = new Date();
  }
}
