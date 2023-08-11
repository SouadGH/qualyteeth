import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UtilsModule } from 'apps/qualyteeth-server/src/core/utils/utils.module';
import { ToothController } from './tooth.controller';
import { ToothService } from './tooth.service';
import { Tooth } from './tooth.entity';
import { Intervention } from '../intervention/intervention.entity';
import { ToothPart } from './tooth-part.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Tooth, ToothPart, Intervention]),
    UtilsModule
  ],
  controllers: [ToothController],
  providers: [ToothService]
})
export class ToothModule {}
