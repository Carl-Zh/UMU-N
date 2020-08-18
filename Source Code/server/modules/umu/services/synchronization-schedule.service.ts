import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import moment from 'moment';
import { Repository } from 'typeorm';
import { SynchronizationScheduleEntity } from '../entities';

@Injectable()
export class SynchronizationScheduleService {
  constructor(
    @InjectRepository(SynchronizationScheduleEntity)
    private readonly synchronizationScheduleRepository: Repository<SynchronizationScheduleEntity>,
  ) {}

  public async getTodaySchedule() {
    // const today = moment().format('YYYY-MM-DD');
    // const executeTime = moment().toDate();
    // const schedule = await this.synchronizationScheduleRepository.findOne({
    //   where: { executeDate: today },
    // });
    // const todaySchedule = schedule
    //   ? await this.synchronizationScheduleRepository.save(
    //       this.synchronizationScheduleRepository.merge(schedule, {
    //         executeNumber: schedule.executeNumber + 1,
    //         executeTime,
    //       }),
    //     )
    //   : await this.synchronizationScheduleRepository.save(
    //       this.synchronizationScheduleRepository.create({
    //         executeDate: today,
    //         executeNumber: 1,
    //         executeTime,
    //       }),
    //     );
    // return todaySchedule;
  }
}
