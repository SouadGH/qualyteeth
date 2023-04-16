import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { DbService } from 'apps/qualyteeth-server/src/core/utils/db.service';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { jwtConstants } from './constants';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1w' },
    }),
    UserModule,
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy, DbService],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule { }
