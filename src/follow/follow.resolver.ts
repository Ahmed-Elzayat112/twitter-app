import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { FollowService } from './follow.service';
import { Follow } from './entities/follow.entity';
import { CreateFollowInput } from './dtos/create-follow.input';
import { UpdateFollowInput } from './dtos/update-follow.input';

@Resolver(() => Follow)
export class FollowResolver {
  constructor(private readonly followService: FollowService) {}

  @Mutation(() => Follow)
  createFollow(
    @Args('createFollowInput') createFollowInput: CreateFollowInput,
  ) {
    return this.followService.create(createFollowInput);
  }

  @Query(() => [Follow], { name: 'follows' })
  async findAll() {
    const res = await this.followService.findAll();
    console.log(res);
    return res;
  }

  @Query(() => Follow, { name: 'follow' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.followService.findOne(id);
  }

  @Mutation(() => Follow)
  updateFollow(
    @Args('updateFollowInput') updateFollowInput: UpdateFollowInput,
  ) {
    return this.followService.update(updateFollowInput.id, updateFollowInput);
  }

  @Mutation(() => Follow)
  removeFollow(@Args('id', { type: () => Int }) id: number) {
    return this.followService.remove(id);
  }
}
