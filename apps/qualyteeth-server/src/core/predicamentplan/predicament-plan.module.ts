
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PatientsModule } from 'apps/qualyteeth-server/src/core/patient/patients.module';
import { UserModule } from 'apps/qualyteeth-server/src/core/user/user.module';
import { UtilsModule } from 'apps/qualyteeth-server/src/core/utils/utils.module';
import { PractitionerModule } from '../practitioner/practitioner.module';

import { Practitioner } from '../practitioner/practitioner.entity';
import { Patient } from '../patient/patient.entity';
import { Intervention } from '../intervention/intervention.entity';
import { User } from '../user/user.entity';
import { PredicamentPlan } from './predicament-plan.entity';
import { PredicamentPlanController } from './predicament-plan.controller';
import { PredicamentPlanService } from './predicament-plan.service';
import { Act } from '../act/act.entity';
import { Category } from '../category/category.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([PredicamentPlan, Practitioner, Patient,User, Intervention]),
    UtilsModule,
    UserModule,
    PatientsModule,
    PractitionerModule
  ],
  controllers: [PredicamentPlanController],
  exports: [PredicamentPlanService],
  providers: [PredicamentPlanService]
})
export class PredicamentPlanModule { }
