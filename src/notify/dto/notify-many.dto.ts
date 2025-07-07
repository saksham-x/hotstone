import { IsNotEmpty, IsString, IsArray, ArrayNotEmpty } from 'class-validator';

export class NotifyManyDto {
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
}
