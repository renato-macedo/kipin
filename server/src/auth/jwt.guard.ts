import {
  Injectable,
  ExecutionContext,
  createParamDecorator,
  Inject,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import { ExtractJwt } from 'passport-jwt';
import { AuthService } from './auth.service';

export const User = createParamDecorator((data, req) => {
  return req.user;
});

@Injectable()
export class JWTAuthGuard extends AuthGuard('jwt') {
  constructor(
    @Inject('AuthService') private readonly authService: AuthService,
  ) {
    super();
  }
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    //const response = context.switchToHttp().getResponse();

    const token = ExtractJwt.fromAuthHeaderAsBearerToken()(request);
    const [success, decoded] = await this.authService.validateToken(token);

    if (success && decoded) {
      request.user = { userId: decoded.sub, email: decoded.email };
      return true;
    }
    console.log('\nInvalid auth token using refresh...');
    if (request.cookies.refresh_token) {
      const [success, decoded] = await this.authService.validateToken(token);
      if (success && decoded) {
        request.user = { userId: decoded.sub, email: decoded.email };
        return true;
      } else {
        throw new UnauthorizedException();
      }
    }

    throw new UnauthorizedException();
    //return false;

    //return validateRequest(request);
  }
  // handleRequest(err, user, info: Error) {
  //   console.log({ err, user, info });

  //   if (info.name === 'TokenExpiredError') {
  //
  //     return null;
  //   }
  //   return user;
  // }
}
