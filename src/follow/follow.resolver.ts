import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { FollowService } from './follow.service';
import { Follow } from './entities/follow.entity';
import { CreateFollowInput } from './dtos/create-follow.input';
import { UpdateFollowInput } from './dtos/update-follow.input';
import { GqlFollowResponse, GqlFollowsResponse } from './follow.res';

@Resolver(() => Follow)
export class FollowResolver {
  constructor(private readonly followService: FollowService) {}

  @Mutation(() => GqlFollowResponse)
  createFollow(
    @Args('createFollowInput') createFollowInput: CreateFollowInput,
  ) {
    return this.followService.create(createFollowInput);
  }

  @Query(() => GqlFollowsResponse, { name: 'follows' })
  async findAll() {
    const res = await this.followService.findAll();
    console.log(res);
    return res;
  }

  @Query(() => GqlFollowResponse, { name: 'follow' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.followService.findOne(id);
  }

  @Mutation(() => GqlFollowResponse)
  updateFollow(
    @Args('updateFollowInput') updateFollowInput: UpdateFollowInput,
  ) {
    return this.followService.update(updateFollowInput.id, updateFollowInput);
  }

  @Mutation(() => GqlFollowResponse)
  removeFollow(@Args('id', { type: () => Int }) id: number) {
    return this.followService.remove(id);
  }
}
