
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UtilsModule } from 'apps/qualyteeth-server/src/core/utils/utils.module';
import { Material } from './material.entity';
import { Intervention } from '../intervention/intervention.entity';
import { MaterialService } from './material.service';
import { MaterialController } from './material.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Material,Intervention]),
    UtilsModule
  ],
  controllers: [MaterialController],
  exports: [MaterialService],
  providers: [MaterialService]
})
export class MaterialModule { }
