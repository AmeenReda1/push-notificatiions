import { ApiProperty } from '@nestjs/swagger';
export class topicNotificationInterface {
  @ApiProperty()
  title: string;
  @ApiProperty()
  body: string;
}