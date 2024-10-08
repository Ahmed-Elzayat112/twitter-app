import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveField,
  Parent,
  Context,
} from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/common/guards/gql-auth.guard';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dtos/create-user.input';
import { UpdateUserInput } from './dtos/update-user.input';
import { GqlUserResponse, GqlUsersResponse } from './user.res';
import { Tweet } from 'src/entities';
import { IDataloaders } from 'src/dataloader/data-loaders.interface';
import { UpdateNotificationInput } from 'src/notification/dtos/update-notification.input';
import { CreateNotificationInput } from 'src/notification/dtos/create-notification.dto';
import {
  GqlNotificationTokenResponse,
  GqlNotificationTokensResponse,
} from 'src/notification/notification.res';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => GqlUserResponse)
  async createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    const user = await this.userService.create(createUserInput);
    // console.log(user);
    return user;
  }

  @Query(() => GqlUsersResponse, { name: 'users' })
  @UseGuards(GqlAuthGuard)
  findAll() {
    return this.userService.findAll();
  }

  @ResolveField(() => [Tweet], {
    name: 'tweets',
    description: 'tweets created by this user',
    nullable: true,
  })
  async getTweets(
    @Parent() user: User,
    @Context()
    { loaders }: { loaders: IDataloaders },
  ) {
    const { id: userId } = user;
    const tweets = await loaders.tweetsLoader.load(userId);
    return tweets;
  }

  @Query(() => GqlUserResponse, { name: 'user' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.userService.findOne(id);
  }

  @Mutation(() => GqlUserResponse)
  updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return this.userService.update(updateUserInput.id, updateUserInput);
  }

  @Mutation(() => GqlUserResponse)
  removeUser(@Args('id', { type: () => Int }) id: number) {
    return this.userService.remove(id);
  }

  // TODO: edit graphql response
  @Mutation(() => GqlNotificationTokenResponse)
  async enablePush(
    @Args('createNotificationInput')
    createNotificationInput: CreateNotificationInput,
    @Args('userId') userId: number,
  ) {
    return await this.userService.enablePush(userId, createNotificationInput);
  }

  @Mutation(() => GqlNotificationTokenResponse)
  async disablePush(
    @Args('id') user_id: number,
    @Args('updateNotificationInput')
    updateNotificationInput: UpdateNotificationInput,
  ) {
    return await this.userService.disablePush(user_id, updateNotificationInput);
  }

  @Query(() => GqlNotificationTokensResponse, { name: 'notifications' })
  async fetchPusNotifications() {
    return await this.userService.getPushNotifications();
  }
}
