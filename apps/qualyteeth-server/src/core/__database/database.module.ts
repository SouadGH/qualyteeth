import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Act } from 'libs/shared/src/lib/act.entity';
import { DentistTimetable } from 'libs/shared/src/lib/dentist-timetable.entity';
import { Dentist } from 'libs/shared/src/lib/dentist.entity';
import { DiagnosticDefinition } from 'libs/shared/src/lib/diagnostic-definition.entity';
import { Feedback } from 'libs/shared/src/lib/feedback.entity';
import { Diagnostic } from 'libs/shared/src/lib/diagnostic.entity';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { Patient } from 'libs/shared/src/lib/patient.entity';
import { Service } from 'libs/shared/src/lib/service.entity';
import { ServiceCategory } from 'libs/shared/src/lib/service-category.entity';
import { ServiceDefinition } from 'libs/shared/src/lib/service-definition.entity';
import { Tooth } from 'libs/shared/src/lib/tooth.entity';
import { ToothPart } from 'libs/shared/src/lib/tooth-part.entity';
import { ToothIntervention } from 'libs/shared/src/lib/tooth-intervention.entity';
import { Treatment } from 'libs/shared/src/lib/treatment.entity';
import { TreatmentDefinition } from 'libs/shared/src/lib/treatment-definition.entity';
import { User } from 'libs/shared/src/lib/user.entity';
import { DatabaseLogger } from './databaseLogger';
import { Comment } from 'libs/shared/src/lib/comment.entity';
import { Visit } from 'libs/shared/src/lib/visit.entity';


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
          Dentist,
          DentistTimetable,
          Diagnostic,
          DiagnosticDefinition,
          Feedback,
          Patient,
          Service,
          ServiceCategory,
          ServiceDefinition,
          Tooth,
          ToothPart,
          ToothIntervention,
          Treatment,
          TreatmentDefinition,
          Comment,
          User,
          Visit,
        ],
        synchronize: configService.get('TYPEORM_SYNCHRONIZE') || false,
        namingStrategy: new SnakeNamingStrategy()
      }),
    }),
  ],
})
export class DatabaseModule { }
