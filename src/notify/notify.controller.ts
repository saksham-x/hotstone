import { Body, Controller, Post } from '@nestjs/common';
import { NotifyService } from './notify.service';
import { NotifyOneDto } from './dto/notify-one.dto';
import { NotifyManyDto } from './dto/notify-many.dto';
import { NotifyScheduleDto } from './dto/notify-schedule.dto';

@Controller('notify')
export class NotifyController {
  constructor(private readonly notifyService: NotifyService) {}

  @Post('one')
  sendToOne(@Body() dto: NotifyOneDto) {
    return this.notifyService.sendToOne(dto.token, dto.title, dto.body);
  }

  @Post('many')
  sendToMany(@Body() dto: NotifyManyDto) {
    return this.notifyService.sendToMany(dto.tokens, dto.title, dto.body);
  }

  @Post('schedule')
  async scheduleNotification(@Body() dto: NotifyScheduleDto) {
    return this.notifyService.scheduleNotification(dto);
  }
}
