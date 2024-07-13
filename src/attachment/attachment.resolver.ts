import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { AttachmentService } from './attachment.service';
import { Attachment } from './entities/attachment.entity';
import { CreateAttachmentInput } from './dtos/create-attachment.input';
import { UpdateAttachmentInput } from './dtos/update-attachment.input';
import * as GraphQLUpload from 'graphql-upload/GraphQLUpload.js';
import { IFile } from './file.type';
import { uploadFileStream } from 'src/utils/upload';
import {
  GqlattAchmentResponse,
  GqlattAchmentsResponse,
} from './attachment.res';

@Resolver(() => GqlattAchmentResponse)
export class AttachmentResolver {
  constructor(private readonly attachmentService: AttachmentService) {}

  @Mutation(() => GqlattAchmentResponse)
  createAttachment(
    @Args('createAttachmentInput') createAttachmentInput: CreateAttachmentInput,
  ) {
    return this.attachmentService.create(createAttachmentInput);
  }

  @Query(() => GqlattAchmentsResponse, { name: 'attachments' })
  findAll() {
    return this.attachmentService.findAll();
  }

  @Query(() => GqlattAchmentResponse, { name: 'attachment' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.attachmentService.findOne(id);
  }

  @Mutation(() => GqlattAchmentResponse)
  updateAttachment(
    @Args('updateAttachmentInput') updateAttachmentInput: UpdateAttachmentInput,
  ) {
    return this.attachmentService.update(
      updateAttachmentInput.id,
      updateAttachmentInput,
    );
  }

  @Mutation(() => Attachment)
  removeAttachment(@Args('id', { type: () => Int }) id: number) {
    return this.attachmentService.remove(id);
  }

  @Mutation(() => String)
  async uploadFile(@Args('file', { type: () => GraphQLUpload }) file: IFile) {
    return await uploadFileStream(
      file.createReadStream,
      'uploads',
      `${Date.now()}_${file.filename}`,
    );
  }
}
