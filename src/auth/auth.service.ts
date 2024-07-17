import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcryptjs';
import { CreateUserInput } from 'src/user/dtos/create-user.input';
import { User } from 'src/entities';
import { VerificationCodeService } from 'src/verification-code/verification-code.service';
import { ConfigService } from '@nestjs/config';
import { SessionService } from 'src/session/session.service';
import { DataSource } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly verificationCodeService: VerificationCodeService,
    private readonly configService: ConfigService,
    private readonly sessionService: SessionService,
    private readonly dataSource: DataSource,
  ) {}

  async createJwtToken(user: User) {
    const refreshTokenExpiresIn = this.configService.get<string>(
      'JWT_REFRESH_TOKEN_EXPIRES_IN',
    );

    const session = await this.sessionService.create(user);

    const accessToken = await this.createAccessToken(session.id);
    const refreshToken = this.jwtService.sign(
      {
        id: session.id,
        type: 'REFRESH',
      },
      {
        expiresIn: refreshTokenExpiresIn,
      },
    );

    return {
      accessToken,
      refreshToken,
    };
  }

  async createAccessToken(sessionId: number) {
    const accessTokenExpiresIn = this.configService.get<string>(
      'JWT_ACCESS_TOKEN_EXPIRES_IN',
    );

    const payload = {
      id: sessionId,
      type: 'ACCESS',
    };
    const accessToken = this.jwtService.sign(payload, {
      expiresIn: accessTokenExpiresIn,
    });

    return accessToken;
  }

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userService.findOneByEmail(email);
    if (user && bcrypt.compare(user.password, pass)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async validateToken(token: string): Promise<{ userId: number } | null> {
    try {
      const payload = await this.jwtService.verifyAsync(token);
      // console.log('----------------------> payload', payload);
      const session = await this.sessionService.get(payload.id);
      const userId = session.user_id;
      // console.log('----------------->', userId);
      return { userId };
    } catch (error) {
      console.error('Error verifying token:', error.message);
      return null;
    }
  }

  async signup(createUserInput: CreateUserInput): Promise<User> {
    const { email } = createUserInput;
    const userExists = await this.userService.findOneByEmail(email);

    if (userExists && userExists.verified) {
      const message = 'EXIST_EMAIL';
      throw new BadRequestException({ message });
    }

    if (userExists && userExists.verified === false) {
      this.userService.remove(userExists.id);
    }

    const hashedPassword = await bcrypt.hash(createUserInput.password, 12);

    const newUser: CreateUserInput = {
      username: createUserInput.username,
      email: createUserInput.email,
      password: hashedPassword,
      verified: false,
    };

    // TODO: should we make this transaction? user can be created but not sending code

    return this.dataSource.manager.transaction(
      async (transactionalEntityManager) => {
        const user = await this.userService.create(newUser);
        await transactionalEntityManager.save(user);
        const verificationCode = await this.verificationCodeService.create(
          user.id,
        );
        await transactionalEntityManager.save(verificationCode);
        return user;
      },
    );
  }

  async login(email: string, password: string, context: any) {
    const user = await this.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    if (!user.verified) {
      throw new UnauthorizedException('Account not verified');
    }

    context.req.user = user; // Set the user in the request context
    console.log(context.req.user);

    return this.createJwtToken(user);
  }
}
