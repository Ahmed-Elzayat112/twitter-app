import { Field, Int, ObjectType } from '@nestjs/graphql';
import { ClassType } from 'type-graphql';

@ObjectType()
abstract class PageInfo implements IPageInfo {
  @Field(() => Int)
  currentPage: number;

  @Field()
  hasNextPage: boolean;

  @Field()
  hasPreviousPage: boolean;

  @Field(() => Int)
  totalCount: number;

  @Field(() => Int)
  totalPages: number;
}

export function generateGqlResponse<TItem extends object>(
  TItemClass: ClassType<TItem> | ClassType<TItem>[],
  isRaw: boolean = false,
) {
  if (Array.isArray(TItemClass)) {
    if (isRaw) {
      @ObjectType(`Gql${TItemClass[0].name}sResponse`)
      abstract class GqlResponse {
        // Runtime argument
        @Field((type) => [TItemClass[0]])
        data: TItem[];

        @Field()
        status: string;

        @Field()
        message: string;
      }

      return GqlResponse;
    } else {
      @ObjectType(`Gql${TItemClass[0].name}ItemsResponse`)
      abstract class GqlPaginationRespone {
        @Field((type) => [TItemClass[0]])
        items: TItem[];

        @Field(() => PageInfo)
        pageInfo: PageInfo;
      }
      @ObjectType(`Gql${TItemClass[0].name}PaginationResponse`)
      abstract class GqlResponse {
        @Field((type) => GqlPaginationRespone)
        data: GqlPaginationRespone;

        @Field(() => String)
        status: string;

        @Field(() => String)
        message: string;
      }
      return GqlResponse;
    }
  } else {
    @ObjectType(`Gql${TItemClass.name}Response`)
    abstract class GqlResponse implements IRespone<TItem> {
      // Runtime argument
      @Field((type) => TItemClass)
      data: TItem;

      @Field()
      status: string;

      @Field()
      message: string;
    }
    return GqlResponse;
  }
}

interface IRespone<T> {
  status: string;
  message: string;
  data: T;
}

interface IPageInfo {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  currentPage: number;
  totalPages: number;
  totalCount: number;
}
