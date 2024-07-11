import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tweet } from './entities/tweet.entity';
import { CreateTweetInput } from './dtos/create-tweet.input';
import { UpdateTweetInput } from './dtos/update-tweet.input';

@Injectable()
export class TweetService {
  constructor(
    @InjectRepository(Tweet)
    private tweetsRepository: Repository<Tweet>,
  ) {}

  create(createTweetInput: CreateTweetInput): Promise<Tweet> {
    const newTweet = this.tweetsRepository.create(createTweetInput);
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
