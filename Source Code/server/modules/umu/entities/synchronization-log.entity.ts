import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ schema: 'dbo', name: 'synchronization-logs' })
export class SynchronizationLogEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column('int')
  public scheduleId: number;

  @Column('int')
  public sequence: number;

  @Column('nvarchar')
  public action: string;

  @Column('nvarchar', { length: 'MAX' })
  public content: string;

  @Column('nvarchar')
  public step: string;

  @Column('nvarchar')
  public status: string;

  @Column('nvarchar', { length: 'MAX' })
  public message: string;

  @CreateDateColumn()
  public createdDate: Date;
}
