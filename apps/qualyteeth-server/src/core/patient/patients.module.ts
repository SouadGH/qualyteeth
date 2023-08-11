
import { Module } from '@nestjs/common';
import { PatientsService } from './patients.service';
import { PatientsController } from './patients.controller';
import { UtilsModule } from 'apps/qualyteeth-server/src/core/utils/utils.module';
import { UserModule } from 'apps/qualyteeth-server/src/core/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Patient } from './patient.entity';
import { Practitioner } from '../practitioner/practitioner.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Patient, Practitioner]),
    UtilsModule,
    UserModule
  ],
  providers: [PatientsService],
  exports: [PatientsService],
  controllers: [PatientsController]
})
export class PatientsModule { }
