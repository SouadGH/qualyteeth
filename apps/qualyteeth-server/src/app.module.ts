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
import * as Joi from '@hapi/joi';
import { PredicamentModule } from './core/predicament/predicament.module';
import { CommentModule } from './core/comment/comment.module';
import { MaterialModule } from './core/material/material.module';
import { PredicamentPlanModule } from './core/predicamentplan/predicament-plan.module';
import { SurgeryModule } from './core/surgery/surgery.module';

@Module({
  imports: [
    DatabaseModule,
    AuthModule,
    UserModule,
    ConfigModule.forRoot({ isGlobal: true }),
   /* ConfigModule.forRoot({
      validationSchema: Joi.object({
        POSTGRES_HOST: Joi.string().required(),
        POSTGRES_PORT: Joi.number().required(),
        POSTGRES_USER: Joi.string().required(),
        POSTGRES_PASSWORD: Joi.string().required(),
        POSTGRES_DB: Joi.string().required(),
        PORT: Joi.number(),
      })
    }),*/
    UtilsModule,
    PatientsModule,
    PractitionerModule,   
    PredicamentModule,
    PredicamentPlanModule,
    DocumentModule,
    CommentModule,
    MaterialModule,
    SurgeryModule,
    ToothModule,       
    InterventionModule,
    FeedbackModule,

  ],
  controllers: [AppController],
  providers: [UtilsService],
})
export class AppModule { }
