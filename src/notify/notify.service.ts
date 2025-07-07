import { Injectable } from '@nestjs/common';
import { FirebaseService } from '../firebase/firebase.service';
import { SchedulerRegistry } from '@nestjs/schedule';
import { NotifyScheduleDto } from './dto/notify-schedule.dto';

@Injectable()
export class NotifyService {
  constructor(
    private readonly firebaseService: FirebaseService,
    private readonly schedulerRegistry: SchedulerRegistry,
  ) {}

  async sendToOne(token: string, title: string, body: string) {
    const payload = { notification: { title, body } };
    return this.firebaseService.sendToOne(token, payload);
  }
  async sendToMany(tokens: string[], title: string, body: string) {
    const payload = {
      notification: { title, body },
    };

    return this.firebaseService.sendToMany(tokens, payload);
  }

  async scheduleNotification(dto: NotifyScheduleDto) {
    const date = new Date(dto.scheduleAt);
    if (date <= new Date()) {
      throw new Error('scheduleAt must be a future datetime');
    }

    const timeout = date.getTime() - Date.now();

    const timeoutId = `notification_${Date.now()}`;

    const timeoutRef = setTimeout(async () => {
      await this.firebaseService.sendToMany(dto.tokens, {
        notification: { title: dto.title, body: dto.body },
      });
      this.schedulerRegistry.deleteTimeout(timeoutId);
    }, timeout);

    this.schedulerRegistry.addTimeout(timeoutId, timeoutRef);

    return {
      message: `Notification scheduled for ${date.toISOString()}`,
      id: timeoutId,
    };
  }
}
