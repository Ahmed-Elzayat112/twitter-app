import { Injectable } from '@nestjs/common';
import { CreateAttachmentInput } from './dtos/create-attachment.input';
import { UpdateAttachmentInput } from './dtos/update-attachment.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Attachment } from './entities/attachment.entity';

@Injectable()
export class AttachmentService {
  constructor(
    @InjectRepository(Attachment)
    private attachmentRepository: Repository<Attachment>,
  ) {}

  create(createAttachmentInput: CreateAttachmentInput): Promise<Attachment> {
    const attachment = this.attachmentRepository.create(createAttachmentInput);
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
    await this.attachmentRepository.update(id, updateAttachmentInput);
    return this.findOne(id);
  }

  async remove(id: number): Promise<Attachment[]> {
    const attachment = await this.findOne(id);
    await this.attachmentRepository.remove(attachment);
    return attachment;
  }
}
