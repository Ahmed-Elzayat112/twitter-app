import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tweet } from './entities/tweet.entity';
import { CreateTweetInput } from './dtos/create-tweet.input';
import { UpdateTweetInput } from './dtos/update-tweet.input';
import { UserService } from 'src/user/user.service';

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

  findAll(): Promise<Tweet[]> {
    return this.tweetsRepository.find();
  }

  findOne(id: number): Promise<Tweet> {
    return this.tweetsRepository.findOne({ where: { id } });
  }

  async update(id: number, updateTweetInput: UpdateTweetInput): Promise<Tweet> {
    await this.tweetsRepository.update(id, updateTweetInput);
    return this.tweetsRepository.findOne({ where: { id } });
  }

  async remove(id: number): Promise<Tweet> {
    const tweet = await this.findOne(id);
    await this.tweetsRepository.remove(tweet);
    return tweet;
  }
}
