import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ schema: 'dbo', name: 'synchronization-logs' })
export class SynchronizationLogEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column('int', { nullable: true })
  public scheduleId: number;

  @Column('int', { nullable: true })
  public sequence: number;

  @Column('nvarchar', { nullable: true })
  public action: string;

  @Column('nvarchar', { length: 'MAX', nullable: true })
  public content: string;

  @Column('nvarchar', { nullable: true })
  public step: string;

  @Column('nvarchar', { nullable: true })
  public status: string;

  @Column('nvarchar', { length: 'MAX', nullable: true })
  public message: string;

  @CreateDateColumn()
  public createdDate: Date;
}
