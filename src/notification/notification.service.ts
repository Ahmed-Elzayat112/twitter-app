import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Notifications } from './entities/notification.entity';
import { Repository } from 'typeorm';
import * as firebase from 'firebase-admin';
import * as path from 'path';
import { NotificationToken } from './entities/notification-token.entity';
import { CreateNotificationInput } from './dtos/create-notification.dto';
import { UpdateNotificationInput } from './dtos/update-notification.input';
import { User } from 'src/entities';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';

firebase.initializeApp({
  credential: firebase.credential.cert(
    path.join(__dirname, '..', '..', 'firebase-adminsdk.json'),
  ),
});

@Injectable()
export class NotificationService {
  constructor(
    @InjectRepository(Notifications)
    private readonly notificationsRepo: Repository<Notifications>,
    @InjectRepository(NotificationToken)
    private readonly notificationTokenRepo: Repository<NotificationToken>,
    @InjectQueue('notification') private readonly notificationQueue: Queue,
  ) {}

  acceptPushNotification = async (
    user: User,
    createNotificationInput: CreateNotificationInput,
  ): Promise<NotificationToken> => {
    await this.notificationTokenRepo.update(
      { user: { id: user.id } },
      {
        status: 'INACTIVE',
      },
    );
    // save to db
    const notification_token = await this.notificationTokenRepo.save({
      user: user,
      device_type: createNotificationInput.device_type,
      notification_token: createNotificationInput.notification_token,
      status: 'ACTIVE',
    });
    return notification_token;
  };

  disablePushNotification = async (
    user: User,
    updateNotificationInput: UpdateNotificationInput,
  ): Promise<NotificationToken> => {
    await this.notificationTokenRepo.update(
      {
        user: { id: user.id },
        device_type: updateNotificationInput.device_type,
      },
      {
        status: 'INACTIVE',
      },
    );

    const updatedNotification = await this.notificationTokenRepo.findOne({
      where: {
        user: { id: user.id },
        device_type: updateNotificationInput.device_type,
      },
    });

    if (!updatedNotification) {
      throw new Error('Notification token not found');
    }
    return updatedNotification;
  };

  getNotifications = async (): Promise<Notifications[]> => {
    return await this.notificationsRepo.find();
  };

  sendPush = async (
    user: User,
    title: string,
    body: string,
  ): Promise<Notifications> => {
    const notification = await this.notificationTokenRepo.findOne({
      where: { user: { id: user.id }, status: 'ACTIVE' },
    });
    if (notification) {
      const savedNotification = await this.notificationsRepo.save({
        notification_token: notification,
        title,
        body,
        status: 'ACTIVE',
        created_by: user.username,
      });

      await this.notificationQueue.add('sendNotification', {
        token: notification.notification_token,
        title,
        body,
      });
      return savedNotification;
    } else {
      throw new Error('No active push notification token found');
    }
  };
}
