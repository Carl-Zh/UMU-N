import { BadRequestException, Injectable } from '@nestjs/common';
import { SynchronizationService } from '../../../modules/umu';

@Injectable()
export class ScheduleService {
  constructor(private readonly synchronizationService: SynchronizationService) {}

  private checkNonce(name: string, nonce: string): void {
    if (nonce !== process.env.SCHEDULE_NONCE) {
      throw new BadRequestException(`The schedule "${name}" nonce invalid!`);
    }
  }

  public synchronizationMeituan(nonce: string) {
    this.checkNonce('takeMedicationReminderSchedule', nonce);
    this.synchronizationService.synchronization();
  }
}
