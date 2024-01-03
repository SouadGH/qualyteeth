
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UtilsModule } from 'apps/qualyteeth-server/src/core/utils/utils.module';
import { Material } from './material.entity';
<<<<<<< HEAD
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
=======

@Module({
  imports: [
    TypeOrmModule.forFeature([Material]),
    UtilsModule
  ],
  controllers: [],
  exports: [],
  providers: []
>>>>>>> c6740c8dc4e6e69e5f3be7ef55127ed511d52617
})
export class MaterialModule { }
