import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CreateUserInput } from 'src/user/dtos/create-user.input';
import { AuthService } from './auth.service';
import { User } from 'src/entities';
import { SignUserInput } from 'src/auth/dtos/signin-user.dto';
import { SignUserResponse } from './dtos/signin-res.dto';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => User)
  signup(@Args('createUserInput') createUserInput: CreateUserInput) {
    this.authService.signup(createUserInput);
  }

  @Mutation(() => SignUserResponse)
  async login(
    @Args('signUserInput') signUserInput: SignUserInput,
  ): Promise<SignUserResponse> {
    const { email, password } = signUserInput;
    return this.authService.login(email, password);
  }
}
