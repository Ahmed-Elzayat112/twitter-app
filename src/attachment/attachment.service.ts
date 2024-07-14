import { Injectable } from '@nestjs/common';
import { CreateAttachmentInput } from './dtos/create-attachment.input';
import { UpdateAttachmentInput } from './dtos/update-attachment.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Attachment } from './entities/attachment.entity';
import { UserService } from 'src/user/user.service';
import { TweetService } from 'src/tweet/tweet.service';

@Injectable()
export class AttachmentService {
  constructor(
    @InjectRepository(Attachment)
    private attachmentRepository: Repository<Attachment>,
    private usersService: UserService,
    private tweetsService: TweetService,
  ) {}

  async create(
    createAttachmentInput: CreateAttachmentInput,
  ): Promise<Attachment> {
    const { tweet_id, user_id } = createAttachmentInput;

    const user = await this.usersService.findOne(user_id);

    if (!user) {
      throw new Error('User not found');
    }

    const tweet = await this.tweetsService.findOne(tweet_id);

    if (!tweet) {
      throw new Error('Tweet not found');
    }

    const attachment = this.attachmentRepository.create({
      user,
      tweet,
      ...createAttachmentInput,
    });
    return this.attachmentRepository.save(attachment);
  }

  findAll(): Promise<Attachment[]> {
    return this.attachmentRepository.find({ relations: ['tweet', 'user'] });
  }

  findOne(id: number) {
    return this.attachmentRepository.find({
      where: { id },
      relations: ['tweet', 'user'],
    });
  }

  async update(id: number, updateAttachmentInput: UpdateAttachmentInput) {
    const attachments = await this.attachmentRepository.findOneBy({ id });
    if (!attachments) {
      throw new Error('Attachment not found');
    }
    Object.assign(attachments, updateAttachmentInput);
    return this.attachmentRepository.save(attachments);
  }

  async remove(id: number): Promise<Attachment[]> {
    const attachment = await this.findOne(id);
    if (!attachment) {
      throw new Error('Attachment not found');
    }
    await this.attachmentRepository.remove(attachment);
    return attachment;
  }
}
