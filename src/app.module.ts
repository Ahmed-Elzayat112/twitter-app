import { Inject, Module } from '@nestjs/common';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TweetModule } from './tweet/tweet.module';
import { CommentModule } from './comment/comment.module';
import { LikeModule } from './like/like.module';
import { FollowModule } from './follow/follow.module';
import { AttachmentModule } from './attachment/attachment.module';
import { AuthModule } from './auth/auth.module';
import { VerificationCodeModule } from './verification-code/verification-code.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import * as entities from './entities';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { SessionModule } from './session/session.module';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { TransformInterceptor } from './interceptors/response.interceptor';
import { GqlHttpExceptionFilter } from './filters/http-exception.filter';
import { DataloaderModule } from './dataloader/dataloader.module';
import { BullModule } from '@nestjs/bullmq';
import { MailProcessor } from './workers/mail.processor';
import { RoleModule } from './role/role.module';
import { GraphqlConfigService } from './configs/graphql.config';
import { NotificationModule } from './notification/notification.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), 'uploads'),
      serveRoot: '/uploads',
      serveStaticOptions: {
        extensions: ['jpg', 'jpeg', 'png', 'gif'],
        index: false,
      },
    }),

    BullModule.forRoot({
      connection: {
        host: 'localhost',
        port: 6379,
      },
    }),

    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env`,
    }),

    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => {
        return {
          type: 'postgres',
          host: config.get<string>('DB_HOST'),
          port: config.get<number>('DB_PORT'),
          username: config.get<string>('DB_USERNAME'),
          password: config.get<string>('DB_PASSWORD'),
          database: config.get<string>('DB_NAME'),
          entities: Object.values(entities),
          synchronize: true,
        };
      },
    }),

    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      imports: [DataloaderModule, UserModule, AuthModule],
      useClass: GraphqlConfigService,
      inject: [GraphqlConfigService],
    }),

    TypeOrmModule.forFeature(Object.values(entities)),
    UserModule,
    TweetModule,
    CommentModule,
    LikeModule,
    FollowModule,
    AttachmentModule,
    VerificationCodeModule,
    AuthModule,
    SessionModule,
    RoleModule,
    NotificationModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: GqlHttpExceptionFilter,
    },
    AppService,
    MailProcessor,
  ],
})
export class AppModule {}
