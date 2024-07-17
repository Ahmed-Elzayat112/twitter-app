import { GqlExecutionContext } from '@nestjs/graphql';
import { IDataloaders } from '../dataloader/dataloader.interface';
import { Request } from 'express';
import { User } from 'src/entities';

declare global {
  interface IGraphQLContext {
    loaders: IDataloaders;
  }
}

// declare global {
//   export interface GqlContextReq {
//     req: Request & { user?: User };
//   }
// }
