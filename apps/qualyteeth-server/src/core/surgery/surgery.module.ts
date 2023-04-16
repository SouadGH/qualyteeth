import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UtilsModule } from 'apps/qualyteeth-server/src/core/utils/utils.module';
import { SurgeryController } from './surgery.controller';
import { SurgeryService } from './surgery.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([SurgeryService]),
    UtilsModule
  ],
  controllers: [SurgeryController],
  providers: [SurgeryService]
})
export class SurgeryModule {}
