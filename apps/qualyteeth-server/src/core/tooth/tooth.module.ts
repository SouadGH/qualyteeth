import { Module } from '@nestjs/common';
import { UtilsModule } from 'apps/qualyteeth-server/src/core/utils/utils.module';
import { ToothController } from './tooth.controller';
import { ToothService } from './tooth.service';

@Module({
  imports: [UtilsModule],
  controllers: [ToothController],
  providers: [ToothService]
})
export class ToothModule {}
