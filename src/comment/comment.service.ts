import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './entities/comment.entity';
import { CreateCommentInput } from './dtos/create-comment.input';
import { UpdateCommentInput } from './dtos/update-comment.input';
import { UserService } from 'src/user/user.service';
import { TweetService } from 'src/tweet/tweet.service';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private commentsRepository: Repository<Comment>,
    private usersService: UserService,
    private tweetsService: TweetService,
    // private attachmentRepository: AttachmentService,
  ) {}

  async create(createCommentInput: CreateCommentInput): Promise<Comment> {
    const { tweet_id, user_id } = createCommentInput;

    const user = await this.usersService.findOne(user_id);

    if (!user) {
      throw new Error('User not found');
    }

    const tweet = await this.tweetsService.findOne(tweet_id);

    if (!tweet) {
      throw new Error('Tweet not found');
    }

    const newComment = this.commentsRepository.create({
      user,
      tweet,
      ...createCommentInput,
    });
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
