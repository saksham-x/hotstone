import {
  IsNotEmpty,
  IsString,
  IsArray,
  ArrayNotEmpty,
  IsDateString,
} from 'class-validator';

export class NotifyScheduleDto {
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  tokens: string[];

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  body: string;

  @IsDateString()
  @IsNotEmpty()
  scheduleAt: string;
}
