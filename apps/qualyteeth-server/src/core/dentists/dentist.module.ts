import { Module } from '@nestjs/common';
import { DentistController } from './dentists.controller';
import { DentistService } from './dentist.service';
import { UtilsModule } from 'apps/qualyteeth-server/src/core/utils/utils.module';
import { UserModule } from 'apps/qualyteeth-server/src/core/user/user.module';
import { PatientsModule } from 'apps/qualyteeth-server/src/core/patients/patients.module';

@Module({
  imports: [UtilsModule, UserModule, PatientsModule],
  controllers: [DentistController],
  exports: [DentistService],
  providers: [DentistService]
})
export class DentistModule { }
