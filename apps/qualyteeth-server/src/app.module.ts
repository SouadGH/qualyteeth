import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AuthModule } from './core/auth/auth.module';
import { DocumentModule } from './core/document/document.module';
import { FeedbackModule } from './core/feedback/feedback.module';
import { InterventionModule } from './core/intervention/intervention.module';
import { PatientsModule } from './core/patient/patients.module';
import { PractitionerModule } from './core/practitioner/practitioner.module';
import { ToothModule } from './core/tooth/tooth.module';
import { UserModule } from './core/user/user.module';
import { UtilsModule } from './core/utils/utils.module';
import { UtilsService } from './core/utils/utils.service';
import { DatabaseModule } from './core/__database/database.module';

@Module({
  imports: [
    DatabaseModule,
    AuthModule,
    UserModule,
    ConfigModule.forRoot({ isGlobal: true }),
    UtilsModule,
    PatientsModule,
    PractitionerModule,
    ToothModule,
    DocumentModule,
    FeedbackModule,
    InterventionModule,
    PractitionerModule,
  ],
  controllers: [AppController],
  providers: [UtilsService],
})
export class AppModule { }
