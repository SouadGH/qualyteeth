
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PatientsModule } from 'apps/qualyteeth-server/src/core/patient/patients.module';
import { UserModule } from 'apps/qualyteeth-server/src/core/user/user.module';
import { UtilsModule } from 'apps/qualyteeth-server/src/core/utils/utils.module';
import { Act } from 'libs/shared/src/lib/act.entity';
import { Category } from 'libs/shared/src/lib/category.entity';
import { Intervention } from 'libs/shared/src/lib/intervention.entity';
import { Patient } from 'libs/shared/src/lib/patient.entity';
import { Practitioner } from 'libs/shared/src/lib/practitioner.entity';
import { Predicament } from 'libs/shared/src/lib/predicament.entity';
import { PractitionerModule } from '../practitioner/practitioner.module';
import { PredicamentController } from './predicament.controller';
import { PredicamentService } from './predicament.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Predicament, Practitioner, Patient, Intervention, Act, Category]),
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
