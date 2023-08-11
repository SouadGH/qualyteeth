
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Act } from 'apps/qualyteeth-server/src/core/act/act.entity';
import { UtilsModule } from 'apps/qualyteeth-server/src/core/utils/utils.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Act]),
    UtilsModule
  ],
  controllers: [],
  exports: [],
  providers: []
})
export class ActModule { }
