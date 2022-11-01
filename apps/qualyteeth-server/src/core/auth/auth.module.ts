import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { AuthController } from './auth.controller';
import { DentistService } from 'apps/qualyteeth-server/src/core/dentists/dentist.service';
import { DbService } from 'apps/qualyteeth-server/src/core/utils/db.service';
import { PatientsService } from 'apps/qualyteeth-server/src/core/patients/patients.service';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1w' },
    }),
    UserModule,
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy, DentistService, PatientsService, DbService],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule { }
