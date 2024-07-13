import { ExtractJwt, Strategy } from 'passport-jwt';
import {
  Injectable,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { SessionService } from 'src/session/session.service';

export type JwtPayload = {
  id: number;
  iat: number;
  exp: number;
  type: 'ACCESS' | 'REFRESH';
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    configService: ConfigService,
    private sessionService: SessionService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get<string>('JWT_SECRET'),
      ignoreExpiration: false,
    });
  }

  public async validate(payload: JwtPayload) {
    try {
      if (payload.type !== 'ACCESS') {
        throw new UnauthorizedException('Invalid token provided.');
      }

      const session = await this.sessionService.get(payload.id);

      if (!session) {
        throw new UnauthorizedException('Invalid token provided.');
      }

      const { user } = session;
      if (!user.verified) {
        throw new UnauthorizedException('Please verify your email.');
      }

      return session;
    } catch {
      throw new UnauthorizedException('User is not authorized.');
    }
  }
}
