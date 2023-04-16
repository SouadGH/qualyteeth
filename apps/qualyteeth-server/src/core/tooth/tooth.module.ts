import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UtilsModule } from 'apps/qualyteeth-server/src/core/utils/utils.module';
import { ToothIntervention } from 'libs/shared/src/lib/tooth-intervention.entity';
import { Tooth } from 'libs/shared/src/lib/tooth.entity';
import { ToothController } from './tooth.controller';
import { ToothService } from './tooth.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Tooth, ToothIntervention]),
    UtilsModule
  ],
  controllers: [ToothController],
  providers: [ToothService]
})
export class ToothModule {}
