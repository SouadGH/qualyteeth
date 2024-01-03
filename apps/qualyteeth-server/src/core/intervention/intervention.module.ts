
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PatientsModule } from 'apps/qualyteeth-server/src/core/patient/patients.module';
import { UserModule } from 'apps/qualyteeth-server/src/core/user/user.module';
import { UtilsModule } from 'apps/qualyteeth-server/src/core/utils/utils.module';
import { PractitionerModule } from '../practitioner/practitioner.module';
import { InterventionController } from './intervention.controller';
import { InterventionService } from './intervention.service';
import { Intervention } from './intervention.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Intervention]),
    UtilsModule,
   // UserModule,
   // PatientsModule,
    PractitionerModule
  ],
  controllers: [InterventionController],
  exports: [InterventionService],
  providers: [InterventionService]
})
export class InterventionModule { }
