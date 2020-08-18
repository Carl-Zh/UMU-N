import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ schema: 'dbo', name: 'synchronization-schedule' })
export class SynchronizationScheduleEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column('varchar')
  public executeDate: string;

  @Column('int')
  public executeNumber: number;

  @Column('datetime2', { nullable: true })
  public executeTime: Date;
}
