import DataLoader from 'dataloader';
import { User } from 'src/entities';

export interface IDataloaders {
  usersLoader: DataLoader<number, User>;
  // add more loders here as you see fit
}
