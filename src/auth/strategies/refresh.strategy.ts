import { ExtractJwt, Strategy } from 'passport-jwt';
import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { SessionService } from 'src/session/session.service';
import { JwtPayload } from './jwt.strategy';

@Injectable()
export class RefreshJwtStrategy extends PassportStrategy(Strategy, 'refresh') {
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
    if (payload.type !== 'REFRESH') {
      throw new UnauthorizedException('Invalid token provided.');
    }

    const session = await this.sessionService.get(payload.id);
    if (!session) {
      throw new ForbiddenException('Invalid token provided.');
    }
    return session;
  }
}
