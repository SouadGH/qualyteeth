import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthModule } from './core/auth/auth.module';
import { UserModule } from './core/user/user.module';
import { ConfigModule } from '@nestjs/config';
import { AuthController } from './core/auth/auth.controller';
import { UtilsService } from './core/utils/utils.service';
import { UtilsModule } from './core/utils/utils.module';
import { PatientsModule } from './core/patients/patients.module';
import { DentistModule } from './core/dentists/dentist.module';
import { ToothModule } from './core/tooth/tooth.module';
import { TreatmentModule } from './core/treatment/treatment.module';
import { DocumentService } from './core/document/document.service';
import { DocumentController } from './core/document/document.controller';
import { DocumentModule } from './core/document/document.module';
import { CalendarService } from './core/calendar/calendar.service';
import { CalendarController } from './core/calendar/calendar.controller';
import { CalendarModule } from './core/calendar/calendar.module';
import { FeedbackService } from './core/feedback/feedback.service';
import { FeedbackModule } from './core/feedback/feedback.module';
import { SurgeryModule } from './core/surgery/surgery.module';
import { ServicingModule } from './core/servicing/servicing.module';
import { DiagnosticModule } from './core/diagnostic/diagnostic.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    ConfigModule.forRoot({ isGlobal: true }),
    UtilsModule,
    PatientsModule,
    DentistModule,
    ToothModule,
    TreatmentModule,
    DocumentModule,
    CalendarModule,
    FeedbackModule,
    SurgeryModule,
    ServicingModule,
    DiagnosticModule
  ],
  controllers: [AppController, AuthController, DocumentController, CalendarController],
  providers: [UtilsService, DocumentService, CalendarService, FeedbackService],
})
export class AppModule { }
