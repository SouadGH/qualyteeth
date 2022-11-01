import { Module } from '@nestjs/common';
import { UtilsService } from './utils.service';
import { DbService } from './db.service';

@Module({
  providers: [UtilsService, DbService],
  exports: [UtilsService, DbService],
})
export class UtilsModule {}
