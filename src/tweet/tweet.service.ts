import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Tweet } from './entities/tweet.entity';
import { CreateTweetInput } from './dtos/create-tweet.input';
import { UpdateTweetInput } from './dtos/update-tweet.input';
import { UserService } from 'src/user/user.service';
import { paginate } from 'src/utils/pagination.utils';

@Injectable()
export class TweetService {
  constructor(
    @InjectRepository(Tweet)
    private tweetsRepository: Repository<Tweet>,
    private usersService: UserService,
  ) {}

  async create(createTweetInput: CreateTweetInput): Promise<Tweet> {
    const { content, user_id } = createTweetInput;

    const user = await this.usersService.findOne(user_id);

    if (!user) {
      throw new Error('User not found');
    }

    const newTweet = this.tweetsRepository.create({
      content,
      user,
    });
    return this.tweetsRepository.save(newTweet);
  }

  async findAll(page: number, limit: number) {
    const query = this.tweetsRepository.createQueryBuilder('tweet');
    return paginate(query, page, limit);
  }

  async findTweetsByBatch(tweetsIds: number[]): Promise<(Tweet | null)[]> {
    console.debug(`Loading ids ${tweetsIds}`);

    // Query to find tweets by batch
    const tweets = await this.tweetsRepository.findBy({ id: In(tweetsIds) });

    // Map the results to maintain the order and handle missing tweets
    const mappedResults = tweetsIds.map(
      (id) => tweets.find((tweet) => tweet.id === id) || null,
    );

    console.log(mappedResults);

    return mappedResults;
  }

  findOne(id: number): Promise<Tweet> {
    return this.tweetsRepository.findOne({ where: { id } });
  }

  async update(id: number, updateTweetInput: UpdateTweetInput): Promise<Tweet> {
    const tweet = await this.tweetsRepository.findOneBy({ id });
    if (!tweet) {
      throw new Error('Tweet not found');
    }

    Object.assign(tweet, updateTweetInput);
    await this.tweetsRepository.save(tweet);
    return tweet;
  }

  async remove(id: number): Promise<Tweet> {
    const tweet = await this.findOne(id);
    if (!tweet) {
      throw new Error('Tweet not found');
    }
    await this.tweetsRepository.remove(tweet);
    return tweet;
  }
}
