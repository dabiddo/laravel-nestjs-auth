import { Body, Controller, Get, Post, Request, UnauthorizedException, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { UsersService } from 'src/users/users.service';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import * as fs from 'fs';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService, private usersService: UsersService) {}


  /*@Post('login')
  async login(@Body() req) {
    return this.authService.login(req);
  }*/
  @Post('login')
  async login(@Body() req)
  {
    const response = await this.usersService.findOneByEmail(req.email);
    const hash = response.password.replace(/^\$2y(.+)$/i, '$2a$1');
    const match = await bcrypt.compare(req.password, hash);

    if(match === true) {
      const payload = { username: response.name, email: response.email, sub: response.id };
      const privateKey = fs.readFileSync('/app/laravel-auth/storage/oauth-private.key');
      return {
        access_token: jwt.sign(payload, privateKey, { algorithm: 'RS256', expiresIn: '1h' })
      };
    }
    else {
      throw new UnauthorizedException();
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async profile(@Request() request)
  {
    return request.user;
  }
}
