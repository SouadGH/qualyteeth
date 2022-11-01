import { Module } from '@nestjs/common';
import { UtilsModule } from 'apps/qualyteeth-server/src/core/utils/utils.module';
import { ServicingController } from './servicing.controller';
import { ServicingService } from './servicing.service';

@Module({
  imports: [UtilsModule],
  controllers: [ServicingController],
  providers: [ServicingService]
})
export class ServicingModule {}
