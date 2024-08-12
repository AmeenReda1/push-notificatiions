import { Injectable } from '@nestjs/common';
import * as firebase from 'firebase-admin';
import { Message } from 'firebase-admin/lib/messaging/messaging-api';
import { topicNotificationInterface } from './interfaces/topic-notification.interface';
@Injectable()
export class NotificationService {
  async sendPushToTopic(notification: topicNotificationInterface, topic: string) {
    try {
      const message = {
        notification: {
          title: notification.title,
          body: notification.body,
        },
        topic: topic,
        data: {},
        android: {
          priority: 'high',
          notification: {
            sound: 'default',
            channelId: 'default',
          },
        },
        apns: {
          headers: {
            'apns-priority': '10',
          },
          payload: {
            aps: {
              contentAvailable: true,
              sound: 'default',
            },
          },
        },
      };

      // Send the notification
      await firebase.messaging().send(message as Message);
      console.log('Notification sent successfully.');
    } catch (error) {
      console.error('Error sending notification:', error);
      throw error; // Re-throw if necessary or return a meaningful response
    }
  }


}
