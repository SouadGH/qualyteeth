import { Module } from '@nestjs/common';
import { UtilsModule } from 'apps/qualyteeth-server/src/core/utils/utils.module';
import { SurgeryController } from './surgery.controller';
import { SurgeryService } from './surgery.service';

@Module({
  imports: [UtilsModule],
  controllers: [SurgeryController],
  providers: [SurgeryService]
})
export class SurgeryModule {}
