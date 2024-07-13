import { Field, Int, ObjectType } from '@nestjs/graphql';
import { ClassType } from 'type-graphql';

export function generateGqlResponse<TItem extends object>(
  TItemClass: ClassType<TItem> | ClassType<TItem>[],
  isRaw: boolean = false,
) {
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

  if (Array.isArray(TItemClass)) {
    if (isRaw) {
      @ObjectType(`Gql${TItemClass[0].name}sResponse`)
      abstract class GqlResponse {
        // Runtime argument
        @Field((type) => [TItemClass[0]])
        data: TItem;

        @Field()
        status: string;

        @Field()
        message: string;
      }
      return GqlResponse;
    }
    @ObjectType(`Gql${TItemClass[0].name}PaginationResponse`)
    abstract class GqlResponse {
      @Field((type) => [TItemClass[0]])
      data: TItem;

      @Field(() => PageInfo)
      pageInfo: PageInfo;

      @Field(() => String)
      status: string;

      @Field(() => String)
      message: string;
    }

    return GqlResponse;
  } else {
    @ObjectType(`Gql${TItemClass.name}Response`)
    abstract class GqlResponse {
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

interface IPaginationResponse<T> {
  items: T[];
  pageInfo: IPageInfo;
}
