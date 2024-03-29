
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Act } from 'apps/qualyteeth-server/src/core/act/act.entity';
import { Category } from 'apps/qualyteeth-server/src/core/category/category.entity';
import { Comment } from 'apps/qualyteeth-server/src/core/comment/comment.entity';
import { User } from 'apps/qualyteeth-server/src/core/user/user.entity';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { Document } from '../document/document.entity';
import { Feedback } from '../feedback/feedback.entity';
import { Intervention } from '../intervention/intervention.entity';
import { Material } from '../material/material.entity';
import { Patient } from '../patient/patient.entity';
import { Practitioner } from '../practitioner/practitioner.entity';
import { PredicamentPlan } from '../predicamentplan/predicament-plan.entity';
import { Predicament } from '../predicament/predicament.entity';
import { ToothPart } from '../tooth/tooth-part.entity';
import { Tooth } from '../tooth/tooth.entity';
import { DatabaseLogger } from './databaseLogger';
import { Surgery } from '../surgery/surgery.entity';


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
          // __dirname + '../../**/*.entity{.ts,.js}',
         //],
        entities: [
          Act,
          Category,
          Comment,
          Document,
          Feedback,
          Intervention,
          Material,
          Patient,
          Practitioner,
          Predicament,
          PredicamentPlan,
          Surgery,
          Tooth,
          ToothPart,
          User,
        ],
        synchronize: configService.get('TYPEORM_SYNCHRONIZE') || false,
        namingStrategy: new SnakeNamingStrategy()
      }),
    }),
  ],
})
export class DatabaseModule { }
