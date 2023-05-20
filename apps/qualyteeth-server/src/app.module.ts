import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthModule } from './core/auth/auth.module';
import { UserModule } from './core/user/user.module';
import { ConfigModule } from '@nestjs/config';
import { AuthController } from './core/auth/auth.controller';
import { UtilsService } from './core/utils/utils.service';
import { UtilsModule } from './core/utils/utils.module';
import { PatientsModule } from './core/patient/patients.module';
import { ToothModule } from './core/tooth/tooth.module';
import { DocumentService } from './core/document/document.service';
import { DocumentController } from './core/document/document.controller';
import { DocumentModule } from './core/document/document.module';
import { FeedbackService } from './core/feedback/feedback.service';
import { FeedbackModule } from './core/feedback/feedback.module';
import { DatabaseModule } from './core/__database/database.module';
import { PractitionerModule } from './core/practitioner/practitioner.module';

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
  ],
  controllers: [AppController, AuthController, DocumentController],
  providers: [UtilsService, DocumentService, FeedbackService],
})
export class AppModule { }
