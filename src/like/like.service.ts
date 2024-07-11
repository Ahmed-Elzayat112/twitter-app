import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { Like } from './entities/like.entity';
import { CreateLikeInput } from './dtos/create-like.input';
import { UpdateLikeInput } from './dtos/update-like.input';

@Injectable()
export class LikeService {
  constructor(
    @InjectRepository(Like)
    private likesRepository: Repository<Like>,
  ) {}

  create(createLikeInput: CreateLikeInput): Promise<Like> {
    const newLike = this.likesRepository.create(
      createLikeInput as DeepPartial<Like>,
    );
    return this.likesRepository.save(newLike);
  }

  findAll(): Promise<Like[]> {
    return this.likesRepository.find();
  }

  findOne(id: number): Promise<Like> {
    return this.likesRepository.findOne({ where: { id } });
  }

  async update(id: number, updateLikeInput: UpdateLikeInput): Promise<Like> {
    await this.likesRepository.update(id, updateLikeInput);
    return this.likesRepository.findOne({ where: { id } });
  }

  async remove(id: number): Promise<Like> {
    const like = await this.findOne(id);
    await this.likesRepository.remove(like);
    return like;
  }
}
