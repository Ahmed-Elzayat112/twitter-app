import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { IDataloaders } from './data-loaders.interface';
import DataLoader from 'dataloader';
import { User } from 'src/entities';

@Injectable()
export class DataloaderService {
  constructor(private readonly userService: UserService) {}

  createLoaders(): IDataloaders {
    const usersLoader = new DataLoader<number, User>(
      async (keys: readonly number[]) =>
        this.userService.findUsersByBatch(keys as number[]),
    );

    return {
      usersLoader, // return a new loader
    };
  }
}
