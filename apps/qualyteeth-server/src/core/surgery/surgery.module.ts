import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UtilsModule } from 'apps/qualyteeth-server/src/core/utils/utils.module';
import { SurgeryController } from './surgery.controller';
import { SurgeryService } from './surgery.service';
import { Practitioner } from '../practitioner/practitioner.entity';
import { PractitionerModule } from '../practitioner/practitioner.module';
import { Surgery } from './surgery.entity';
import { User } from '../user/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Surgery,Practitioner,User]),
    UtilsModule,
    PractitionerModule
  ],
  controllers: [SurgeryController],
  providers: [SurgeryService],
  exports: [SurgeryService],
})
export class SurgeryModule {}
