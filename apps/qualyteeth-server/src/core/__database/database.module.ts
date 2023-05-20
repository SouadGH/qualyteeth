
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Act } from 'libs/shared/src/lib/act.entity';
import { Category } from 'libs/shared/src/lib/category.entity';
import { Comment } from 'libs/shared/src/lib/comment.entity';
import { Feedback } from 'libs/shared/src/lib/feedback.entity';
import { Intervention } from 'libs/shared/src/lib/intervention.entity';
import { Material } from 'libs/shared/src/lib/material.entity';
import { Patient } from 'libs/shared/src/lib/patient.entity';
import { Practitioner } from 'libs/shared/src/lib/practitioner.entity';
import { PredicamentPlan } from 'libs/shared/src/lib/predicament-plan.entity';
import { Predicament } from 'libs/shared/src/lib/predicament.entity';
import { ToothPart } from 'libs/shared/src/lib/tooth-part.entity';
import { Tooth } from 'libs/shared/src/lib/tooth.entity';
import { User } from 'libs/shared/src/lib/user.entity';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { DatabaseLogger } from './databaseLogger';


@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        logger: new DatabaseLogger(),
        host: configService.get('POSTGRES_HOST'),
        port: configService.get('POSTGRES_PORT'),
        username: configService.get('POSTGRES_USER'),
        password: configService.get('POSTGRES_PASSWORD'),
        database: configService.get('POSTGRES_DB'),
        // entities: [
        //   __dirname + '/../**/*.entity{.ts,.js}',
        // ],
        entities: [
          Act,
          Category,
          Comment,
          // Dentist,
          // PractitionerTimetable,
          // Diagnostic,
          // DiagnosticDefinition,
          Feedback,
          Intervention,
          Material,
          Patient,
          Practitioner,
          Predicament,
          PredicamentPlan,
          // Service,
          // ServiceCategory,
          // ServiceDefinition,
          Tooth,
          ToothPart,
          // ToothIntervention,
          // Treatment,
          // TreatmentDefinition,
          User,
          // Visit,
        ],
        synchronize: configService.get('TYPEORM_SYNCHRONIZE') || false,
        namingStrategy: new SnakeNamingStrategy()
      }),
    }),
  ],
})
export class DatabaseModule { }
