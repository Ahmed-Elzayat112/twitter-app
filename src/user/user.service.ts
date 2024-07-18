import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, In, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dtos/create-user.input';
import { UpdateUserInput } from './dtos/update-user.input';
import { Role } from 'src/role/role.entity';
import { NotificationService } from 'src/notification/notification.service';
import { CreateNotificationInput } from 'src/notification/dtos/create-notification.dto';
import { UpdateNotificationInput } from 'src/notification/dtos/update-notification.input';
import { Notifications, NotificationToken } from 'src/entities';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private readonly notificationService: NotificationService,
  ) {}

  async create(createUserInput: CreateUserInput): Promise<User> {
    const newUser = this.usersRepository.create(
      createUserInput as DeepPartial<User>,
    );
    const user = await this.usersRepository.save(newUser);
    return user;
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id: number): Promise<User> {
    return this.usersRepository.findOne({ where: { id } });
  }

  findOneByEmail(email: string): Promise<User> {
    return this.usersRepository.findOne({ where: { email } });
  }

  async findUsersByBatch(usersIds: number[]): Promise<(User | null)[]> {
    // console.debug(`Loading ids ${usersIds}`);

    // Query to find users by batch
    const users = await this.usersRepository.findBy({ id: In(usersIds) });
    // console.log(users);

    // Map the results to maintain the order and handle missing users
    const mappedResults = usersIds.map(
      (id) => users.find((user) => user.id === id) || null,
    );

    // console.log(mappedResults);

    return mappedResults;
  }

  async update(id: number, updateUserInput: UpdateUserInput): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    Object.assign(user, updateUserInput);
    const userUpdated = await this.usersRepository.save(user);
    if (userUpdated) {
      // send push notification
      await this.notificationService
        .sendPush(
          userUpdated,
          'Profile update',
          'Your Profile have been updated successfully',
        )
        .catch((e) => {
          console.log('Error sending push notification', e);
        });
    }
    return userUpdated;
  }

  enablePush = async (
    user_id: number,
    createNotificationInput: CreateNotificationInput,
  ): Promise<NotificationToken> => {
    const user = await this.usersRepository.findOne({
      where: { id: user_id },
    });
    return await this.notificationService.acceptPushNotification(
      user,
      createNotificationInput,
    );
  };

  disablePush = async (
    user_id: number,
    updateNotificationInput: UpdateNotificationInput,
  ) => {
    const user = await this.usersRepository.findOne({
      where: { id: user_id },
    });
    return await this.notificationService.disablePushNotification(
      user,
      updateNotificationInput,
    );
  };

  getPushNotifications = async (): Promise<Notifications[]> => {
    return await this.notificationService.getNotifications();
  };

  async remove(id: number): Promise<User> {
    const user = await this.findOne(id);
    await this.usersRepository.remove(user);
    return user;
  }
}
