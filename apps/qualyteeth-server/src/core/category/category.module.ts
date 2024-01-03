
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UtilsModule } from 'apps/qualyteeth-server/src/core/utils/utils.module';
import { Category } from './category.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Category]),
    UtilsModule
  ],
  controllers: [],
  exports: [],
  providers: []
})
export class CategoryModule { }
