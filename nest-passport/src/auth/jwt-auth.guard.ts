import { AuthGuard } from '@nestjs/passport';
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import * as fs from 'fs';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(
    private readonly jwtService: JwtService,
    private readonly reflector: Reflector,
  ) {
    super({
      jwtOptions: {
        algorithms: ['RS256'],
      },
    });
  }

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    try {
      const token = request.headers.authorization.split(' ')[1];
      const publicKey = fs.readFileSync('/app/laravel-auth/storage/oauth-public.key');
      const payload = this.jwtService.verify(token, { 
        secret: publicKey,
        algorithms: ['RS256']
      });
      request.user = payload;
      return true;
    } catch (error) {
      console.log(error);
      throw new UnauthorizedException('Invalid token');
    }
  }
  
}