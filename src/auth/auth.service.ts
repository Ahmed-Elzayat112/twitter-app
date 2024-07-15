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
import { I18nContext, I18nService } from 'nestjs-i18n';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly verificationCodeService: VerificationCodeService,
    private readonly configService: ConfigService,
    private readonly sessionService: SessionService,
    private readonly i18n: I18nService,
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

  async signup(createUserInput: CreateUserInput): Promise<User> {
    const { email } = createUserInput;
    const userExists = await this.userService.findOneByEmail(email);

    if (userExists && userExists.verified) {
      const message = this.i18n.t('errors.EXIST_EMAIL', {
        lang: I18nContext.current().lang,
      });
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

    const user = await this.userService.create(newUser);

    await this.verificationCodeService.create(user.id); // TODO: should we make this transaction? user can be created but not sending code
    return user;
  }

  async login(email: string, password: string) {
    const user = await this.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    if (!user.verified) {
      throw new UnauthorizedException('Account not verified');
    }

    return this.createJwtToken(user);
  }
}
