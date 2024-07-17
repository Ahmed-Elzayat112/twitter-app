// src/config/graphql.config.ts
import { Injectable } from '@nestjs/common';
import { GqlOptionsFactory } from '@nestjs/graphql';
import { join } from 'path';
import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo';
import { DataloaderService } from '../dataloader/dataloader.service';
import { UserService } from '../user/user.service';
import { AuthService } from '../auth/auth.service';
import { GraphQLError, GraphQLFormattedError } from 'graphql';

@Injectable()
export class GraphqlConfigService implements GqlOptionsFactory {
  constructor(
    private readonly dataloaderService: DataloaderService,
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  async createGqlOptions(): Promise<ApolloDriverConfig> {
    return {
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      context: async ({ req, res }) => {
        let currentUser = null;

        const authHeader = req.headers.authorization;
        if (authHeader && authHeader.startsWith('Bearer ')) {
          const token = authHeader.substring(7); // Remove 'Bearer ' prefix

          try {
            const decodedToken = await this.authService.validateToken(token);
            if (decodedToken) {
              // Fetch user information based on decoded token
              currentUser = await this.userService.findOne(decodedToken.userId);
            }
          } catch (error) {
            console.error('Error verifying token:', error.message);
          }
        }
        return {
          req,
          res,
          loaders: this.dataloaderService.createLoaders(),
          user: currentUser,
        };
      },

      formatError: (error: GraphQLError): GraphQLFormattedError => {
        const graphQLFormattedError: GraphQLFormattedError = {
          message: error.message,
          locations: error.locations,
          path: error.path,
          extensions: {
            code: error.extensions?.code || 'INTERNAL_SERVER_ERROR',
            timestamp: new Date().toISOString(),
            path: error.path?.[0] || null,
          },
        };
        return graphQLFormattedError;
      },
    };
  }
}
