import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { TweetService } from './tweet.service';
import { Tweet } from './entities/tweet.entity';
import { CreateTweetInput } from './dtos/create-tweet.input';
import { UpdateTweetInput } from './dtos/update-tweet.input';
import {
  GqlTweetResponse,
  GqlTweetsResponse,
  TweetPaginationResponse,
} from './tweet.res';

@Resolver(() => Tweet)
export class TweetResolver {
  constructor(private readonly tweetService: TweetService) {}

  @Mutation(() => GqlTweetResponse)
  createTweet(@Args('createTweetInput') createTweetInput: CreateTweetInput) {
    return this.tweetService.create(createTweetInput);
  }

  @Query(() => TweetPaginationResponse)
  async tweets(
    @Args('page', { type: () => Int, defaultValue: 1 }) page: number,
    @Args('limit', { type: () => Int, defaultValue: 10 }) limit: number,
  ) {
    const { items, totalCount, totalPages } = await this.tweetService.findAll(
      page,
      limit,
    );

    console.log(items);

    return {
      items,
      pageInfo: {
        currentPage: page,
        hasNextPage: page < totalPages,
        hasPreviousPage: page > 1,
        totalCount,
        totalPages,
      },
    };
  }

  @Query(() => GqlTweetResponse, { name: 'tweet' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.tweetService.findOne(id);
  }

  @Mutation(() => GqlTweetResponse)
  updateTweet(@Args('updateTweetInput') updateTweetInput: UpdateTweetInput) {
    return this.tweetService.update(updateTweetInput.id, updateTweetInput);
  }

  @Mutation(() => GqlTweetResponse)
  removeTweet(@Args('id', { type: () => Int }) id: number) {
    return this.tweetService.remove(id);
  }
}
