import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CreateUserInput } from 'src/user/dtos/create-user.input';
import { AuthService } from './auth.service';
import { Session, User } from 'src/entities';
import { SignUserInput } from 'src/auth/dtos/signin-user.dto';
import { SignUserResponse } from './dtos/signin-res.dto';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { SessionParam } from 'src/decorators/session.decorator';
import { SessionService } from 'src/session/session.service';

@Resolver()
export class AuthResolver {
  constructor(
    private readonly authService: AuthService,
    private readonly sessionService: SessionService,
  ) {}

  @UseGuards(AuthGuard('refresh'))
  @Mutation(() => String)
  async refreshToken(@SessionParam() { id }: Session) {
    return this.authService.createAccessToken(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Mutation(() => Boolean)
  async logout(@SessionParam() { id }: Session) {
    return this.sessionService.delete(id);
  }

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
