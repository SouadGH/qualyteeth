import { Module } from '@nestjs/common';
import { UtilsModule } from 'apps/qualyteeth-server/src/core/utils/utils.module';
import { DiagnosticController } from './diagnostic.controller';
import { DiagnosticService } from './diagnostic.service';

@Module({
  imports: [UtilsModule],
  controllers: [DiagnosticController],
  providers: [DiagnosticService]
})
export class DiagnosticModule {}
