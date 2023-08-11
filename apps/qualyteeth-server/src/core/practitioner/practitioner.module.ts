
import { Module } from '@nestjs/common';
import { PractitionerController } from './practitioner.controller';
import { PractitionerService } from './practitioner.service';
import { UtilsModule } from 'apps/qualyteeth-server/src/core/utils/utils.module';
import { UserModule } from 'apps/qualyteeth-server/src/core/user/user.module';
import { PatientsModule } from 'apps/qualyteeth-server/src/core/patient/patients.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Practitioner } from './practitioner.entity';
import { Patient } from '../patient/patient.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Practitioner, Patient]),
    UtilsModule,
    UserModule,
    PatientsModule
  ],
  controllers: [PractitionerController],
  exports: [PractitionerService],
  providers: [PractitionerService]
})
export class PractitionerModule { }
