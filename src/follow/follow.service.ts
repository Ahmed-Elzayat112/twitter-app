import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { Follow } from './entities/follow.entity';
import { CreateFollowInput } from './dtos/create-follow.input';
import { UpdateFollowInput } from './dtos/update-follow.input';
import { User } from 'src/entities';

@Injectable()
export class FollowService {
  constructor(
    @InjectRepository(Follow)
    private followsRepository: Repository<Follow>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createFollowInput: CreateFollowInput): Promise<Follow> {
    const { follower_id, following_id } = createFollowInput;
    const follower = await this.usersRepository.findOne({
      where: { id: follower_id },
    });
    const following = await this.usersRepository.findOne({
      where: { id: following_id },
    });

    if (!follower || !following) {
      throw new Error('Follower or following user not found');
    }

    const newFollow = this.followsRepository.create({
      follower,
      following,
      ...createFollowInput,
    });

    return this.followsRepository.save(newFollow);
  }

  findAll(): Promise<Follow[]> {
    return this.followsRepository.find({
      relations: ['follower', 'following'],
    });
  }

  findOne(id: number): Promise<Follow> {
    return this.followsRepository.findOne({ where: { id } });
  }

  async update(
    id: number,
    updateFollowInput: UpdateFollowInput,
  ): Promise<Follow> {
    const updatedFollow = await this.followsRepository.findOneBy({ id });
    if (!updatedFollow) {
      throw new Error('Follow not found');
    }
    Object.assign(updatedFollow, updateFollowInput);
    return this.followsRepository.save(updatedFollow);
  }

  async remove(id: number): Promise<Follow> {
    const follow = await this.findOne(id);
    if (!follow) {
      throw new Error('Follow not found');
    }
    await this.followsRepository.remove(follow);
    return follow;
  }
}
