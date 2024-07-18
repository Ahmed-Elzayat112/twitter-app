import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { NotificationService } from './notification.service';
import { Notifications, User } from 'src/entities';
import { UserService } from 'src/user/user.service';
import { GqlNotificationResponse } from './notification.res';

@Resolver()
export class NotificationResolver {
  constructor(
    private readonly notificationService: NotificationService,
    private readonly userService: UserService,
  ) {}

  @Mutation(() => GqlNotificationResponse)
  async sendPush(
    @Args('userId') userId: number,
    @Args('title') title: string,
    @Args('body') body: string,
  ): Promise<Notifications> {
    const user = await this.userService.findOne(userId);
    if (!user) {
      throw new Error('User not found');
    }

    return await this.notificationService.sendPush(user, title, body);
  }
}
