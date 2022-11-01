import { Module } from '@nestjs/common';
import { UtilsModule } from 'apps/qualyteeth-server/src/core/utils/utils.module';
import { TreatmentController } from './treatment.controller';
import { TreatmentService } from './treatment.service';

@Module({
  imports: [UtilsModule],
  controllers: [TreatmentController],
  providers: [TreatmentService]
})
export class TreatmentModule {}
