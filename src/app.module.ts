import { Module } from '@nestjs/common';
import { NotifyModule } from './notify/notify.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [ScheduleModule.forRoot(), NotifyModule],
})
export class AppModule {}
