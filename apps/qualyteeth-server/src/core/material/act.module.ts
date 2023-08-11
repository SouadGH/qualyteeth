
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UtilsModule } from 'apps/qualyteeth-server/src/core/utils/utils.module';
import { Material } from './material.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Material]),
    UtilsModule
  ],
  controllers: [],
  exports: [],
  providers: []
})
export class MaterialModule { }
