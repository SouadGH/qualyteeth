
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { PatientsModule } from '../patient/patients.module';
import { PractitionerModule } from '../practitioner/practitioner.module';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';
<<<<<<< HEAD
import { ConfigModule, ConfigService } from '@nestjs/config';
=======
>>>>>>> c6740c8dc4e6e69e5f3be7ef55127ed511d52617

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
<<<<<<< HEAD
    JwtModule.register({}),   
    UserModule,
    PractitionerModule,
    PatientsModule,
    ConfigModule,

    
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_ACCESS_TOKEN_SECRET'),
       /* signOptions: {
          expiresIn: `${configService.get('JWT_EXPIRATION_TIME')}s`,
        },*/
      }),
    }),
=======
    JwtModule.register({}),
    UserModule,
    PractitionerModule,
    PatientsModule
>>>>>>> c6740c8dc4e6e69e5f3be7ef55127ed511d52617
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule { }
