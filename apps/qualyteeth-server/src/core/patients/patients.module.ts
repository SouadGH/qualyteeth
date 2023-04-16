import { Module } from '@nestjs/common';
import { PatientsService } from './patients.service';
import { PatientsController } from './patients.controller';
import { UtilsModule } from 'apps/qualyteeth-server/src/core/utils/utils.module';
import { UserModule } from 'apps/qualyteeth-server/src/core/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Patient } from 'libs/shared/src/lib/patient.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Patient]),
    UtilsModule,
    UserModule
  ],
  providers: [PatientsService],
  exports: [PatientsService],
  controllers: [PatientsController]
})
export class PatientsModule { }
