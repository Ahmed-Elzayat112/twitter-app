import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CommentService } from './comment.service';
import { Comment } from './entities/comment.entity';
import { CreateCommentInput } from './dtos/create-comment.input';
import { UpdateCommentInput } from './dtos/update-comment.input';
import { GqlCommentResponse, GqlCommentsResponse } from './comment.res';

@Resolver(() => GqlCommentResponse)
export class CommentResolver {
  constructor(private readonly commentService: CommentService) {}

  @Mutation(() => GqlCommentResponse)
  createComment(
    @Args('createCommentInput') createCommentInput: CreateCommentInput,
  ) {
    return this.commentService.create(createCommentInput);
  }

  @Query(() => GqlCommentsResponse, { name: 'comments' })
  findAll() {
    return this.commentService.findAll();
  }

  @Query(() => GqlCommentResponse, { name: 'comment' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.commentService.findOne(id);
  }

  @Mutation(() => GqlCommentResponse)
  updateComment(
    @Args('updateCommentInput') updateCommentInput: UpdateCommentInput,
  ) {
    return this.commentService.update(
      updateCommentInput.id,
      updateCommentInput,
    );
  }

  @Mutation(() => GqlCommentResponse)
  removeComment(@Args('id', { type: () => Int }) id: number) {
    return this.commentService.remove(id);
  }
}
