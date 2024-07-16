import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { IDataloaders } from './data-loaders.interface';
import DataLoader from 'dataloader';
import { Tweet, User } from 'src/entities';
import { TweetService } from 'src/tweet/tweet.service';

@Injectable()
export class DataloaderService {
  constructor(
    private readonly userService: UserService,
    private readonly tweetService: TweetService,
  ) {}

  createLoaders(): IDataloaders {
    const usersLoader = new DataLoader<number, User>(
      async (keys: readonly number[]) =>
        this.userService.findUsersByBatch(keys as number[]),
    );
    const tweetsLoader = new DataLoader<number, Tweet>(
      async (keys: readonly number[]) =>
        await this.tweetService.findTweetsByBatch(keys as number[]),
    );
    return {
      usersLoader,
      tweetsLoader,
    };
  }
}
