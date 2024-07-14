import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { Like } from './entities/like.entity';
import { CreateLikeInput } from './dtos/create-like.input';
import { UpdateLikeInput } from './dtos/update-like.input';
import { User } from 'src/entities';
import { UserService } from 'src/user/user.service';
import { TweetService } from 'src/tweet/tweet.service';

@Injectable()
export class LikeService {
  constructor(
    @InjectRepository(Like)
    private likesRepository: Repository<Like>,
    private usersService: UserService,
    private tweetsService: TweetService,
  ) {}

  async create(createLikeInput: CreateLikeInput): Promise<Like> {
    const { tweet_id, user_id } = createLikeInput;

    const user = await this.usersService.findOne(user_id);

    if (!user) {
      throw new Error('User not found');
    }

    const tweet = await this.tweetsService.findOne(tweet_id);

    if (!tweet) {
      throw new Error('Tweet not found');
    }

    const newLike = this.likesRepository.create({ user, tweet });
    return this.likesRepository.save(newLike);
  }

  findAll(): Promise<Like[]> {
    return this.likesRepository.find();
  }

  findOne(id: number): Promise<Like> {
    return this.likesRepository.findOne({ where: { id } });
  }

  async update(id: number, updateLikeInput: UpdateLikeInput): Promise<Like> {
    const updateLike = await this.likesRepository.findOneBy({ id });
    if (!updateLike) {
      throw new Error('Like not found');
    }
    Object.assign(updateLike, updateLikeInput);
    this.likesRepository.save(updateLike);
    return updateLike;
  }

  async remove(id: number): Promise<Like> {
    const like = await this.findOne(id);
    if (!like) {
      throw new Error('Like not found');
    }
    await this.likesRepository.remove(like);
    return like;
  }
}
