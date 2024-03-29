
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PatientsModule } from 'apps/qualyteeth-server/src/core/patient/patients.module';
import { UserModule } from 'apps/qualyteeth-server/src/core/user/user.module';
import { UtilsModule } from 'apps/qualyteeth-server/src/core/utils/utils.module';
import { Act } from 'apps/qualyteeth-server/src/core/act/act.entity';
import { Category } from 'apps/qualyteeth-server/src/core/category/category.entity';
import { PractitionerModule } from '../practitioner/practitioner.module';
import { PredicamentController } from './predicament.controller';
import { PredicamentService } from './predicament.service';
import { Predicament } from './predicament.entity';
import { Practitioner } from '../practitioner/practitioner.entity';
import { Patient } from '../patient/patient.entity';
import { Intervention } from '../intervention/intervention.entity';
import { User } from '../user/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Predicament, Practitioner, Patient,User, Intervention]),
    UtilsModule,
    UserModule,
    PatientsModule,
    PractitionerModule
  ],
  controllers: [PredicamentController],
  exports: [PredicamentService],
  providers: [PredicamentService]
})
export class PredicamentModule { }
