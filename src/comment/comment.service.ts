import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './entities/comment.entity';
import { CreateCommentInput } from './dtos/create-comment.input';
import { UpdateCommentInput } from './dtos/update-comment.input';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private commentsRepository: Repository<Comment>,
  ) {}

  create(createCommentInput: CreateCommentInput): Promise<Comment> {
    const newComment = this.commentsRepository.create(createCommentInput);
    return this.commentsRepository.save(newComment);
  }

  findAll(): Promise<Comment[]> {
    return this.commentsRepository.find();
  }

  findOne(id: number): Promise<Comment> {
    return this.commentsRepository.findOne({ where: { id } });
  }

  async update(
    id: number,
    updateCommentInput: UpdateCommentInput,
  ): Promise<Comment> {
    await this.commentsRepository.update(id, updateCommentInput);
    return this.commentsRepository.findOne({ where: { id } });
  }

  async remove(id: number): Promise<Comment> {
    const comment = await this.findOne(id);
    await this.commentsRepository.remove(comment);
    return comment;
  }
}
