import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UtilsModule } from 'apps/qualyteeth-server/src/core/utils/utils.module';
import { DiagnosticDefinition } from 'libs/shared/src/lib/diagnostic-definition.entity';
import { Diagnostic } from 'libs/shared/src/lib/diagnostic.entity';
import { DiagnosticController } from './diagnostic.controller';
import { DiagnosticService } from './diagnostic.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Diagnostic, DiagnosticDefinition]),
    UtilsModule
  ],
  controllers: [DiagnosticController],
  providers: [DiagnosticService]
})
export class DiagnosticModule { }
