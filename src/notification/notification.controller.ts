import { Controller, Post, Body, } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { topicNotificationInterface } from './interfaces/topic-notification.interface';

@Controller('notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}


  @Post("all-users")
  async sendPushToTopic(@Body() pushNotification: topicNotificationInterface) {
    return this.notificationService.sendPushToTopic(pushNotification,'all-user');
  }
  


}
