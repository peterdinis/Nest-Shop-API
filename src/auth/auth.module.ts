import { Module } from '@nestjs/common';
import {AuthController} from "./auth.controller";
import {AuthService} from "./auth.service";
import {UsersModule} from "../users/users.module"
import {JwtModule} from "@nestjs/jwt";
import {PassportModule} from "@nestjs/passport";
import { JwtStrategy } from './strategy/jwt-strategy';

@Module({
    imports: [
      UsersModule,
      PassportModule.register({
        defaultStrategy: 'jwt',
        property: 'user',
        session: false,
      }),
      JwtModule.register({
        secret: process.env.SECRETKEY,
        signOptions: {
          expiresIn: "7d"
        },
      }),
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy],
    exports: [PassportModule, JwtModule],
  })
  export class AuthModule {}