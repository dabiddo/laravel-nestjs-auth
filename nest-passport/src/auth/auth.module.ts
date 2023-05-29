import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import * as fs from 'fs';


@Module({
  imports:[UsersModule, PassportModule, JwtModule.register({
    privateKey: fs.readFileSync('/app/laravel-auth/storage/oauth-private.key'),
    publicKey: fs.readFileSync('/app/laravel-auth/storage/oauth-public.key'),
    signOptions:{ expiresIn:'1h', algorithm:'RS256'}
  }),],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController]
})
export class AuthModule {}
