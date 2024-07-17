import { ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class GqlAuthGuard extends AuthGuard('jwt') {
  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context).getContext();
    return ctx.req;
  }
}

// import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
// import { GqlExecutionContext } from '@nestjs/graphql';
// import { AuthGuard } from '@nestjs/passport';
// import { JwtService } from '@nestjs/jwt';
// import { AuthService } from 'src/auth/auth.service';

// @Injectable()
// export class GqlAuthGuard extends AuthGuard('jwt') {
//   constructor(
//     private readonly jwtService: JwtService,
//     private readonly authService: AuthService,
//   ) {
//     super();
//   }

//   async canActivate(context: ExecutionContext): Promise<boolean> {
//     const ctx = GqlExecutionContext.create(context).getContext();
//     const req = ctx.req;
//     const token = req.headers.authorization?.split(' ')[1];

//     if (!token) {
//       throw new UnauthorizedException('Token not found');
//     }

//     try {
//       const payload = this.jwtService.verify(token);
//       const { user, session } = await this.authService.validateUser(payload);
//       req.user = user;
//       req.session = session;
//       return true;
//     } catch (error) {
//       throw new UnauthorizedException('Invalid token');
//     }
//   }

//   getRequest(context: ExecutionContext) {
//     const ctx = GqlExecutionContext.create(context).getContext();
//     return ctx.req;
//   }
// }
