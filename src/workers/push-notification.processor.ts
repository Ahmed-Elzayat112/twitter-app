import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import * as firebase from 'firebase-admin';

@Processor('notification')
export class PushNotificationProcessor extends WorkerHost {
  async process(job: Job<{ token: string; title: string; body: string }>) {
    const { token, title, body } = job.data;
    console.log(`Push notification`);
    try {
      const message = await firebase.messaging().send({
        notification: { title, body },
        token,
        android: { priority: 'high' },
      });

      console.log(message);
    } catch (error) {
      console.error('Error sending push notification:', error);
    }
  }
}
