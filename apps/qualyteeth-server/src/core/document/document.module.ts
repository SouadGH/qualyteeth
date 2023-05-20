
import { Module } from '@nestjs/common';
import { PatientsModule } from 'apps/qualyteeth-server/src/core/patient/patients.module';
import { UtilsModule } from 'apps/qualyteeth-server/src/core/utils/utils.module';
import { DocumentController } from './document.controller';
import { DocumentService } from './document.service';

@Module({
  imports: [UtilsModule, PatientsModule],
  controllers: [DocumentController],
  providers: [DocumentService],
  exports: [DocumentService]
})
export class DocumentModule {}
