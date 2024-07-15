import DataLoader from 'dataloader';
import { Tweet, User } from 'src/entities';

export interface IDataloaders {
  usersLoader: DataLoader<number, User>;
  tweetsLoader: DataLoader<number, Tweet>;
  // add more loders here as you see fit
}
