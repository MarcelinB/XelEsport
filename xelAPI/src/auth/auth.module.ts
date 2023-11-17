import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { User } from 'src/user/user.entity';
import { UserModule } from 'src/user/user.module';
import { UserService } from 'src/user/user.service';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [TypeOrmModule.forFeature([
    User,
  ]), PassportModule, UserModule,  JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: {  },
    }),],
  providers: [AuthService, LocalStrategy, UserService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}