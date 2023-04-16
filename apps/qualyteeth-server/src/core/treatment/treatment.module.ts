import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UtilsModule } from 'apps/qualyteeth-server/src/core/utils/utils.module';
import { TreatmentDefinition } from 'libs/shared/src/lib/treatment-definition.entity';
import { Treatment } from 'libs/shared/src/lib/treatment.entity';
import { TreatmentController } from './treatment.controller';
import { TreatmentService } from './treatment.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Treatment, TreatmentDefinition]),
    UtilsModule
  ],
  controllers: [TreatmentController],
  providers: [TreatmentService]
})
export class TreatmentModule { }
