import { Module } from '@nestjs/common';
import { CalendarService } from './calendar.service';
import { CalendarController } from './calendar.controller';
import { UtilsModule } from 'apps/qualyteeth-server/src/core/utils/utils.module';
import { DentistModule } from 'apps/qualyteeth-server/src/core/dentists/dentist.module';

@Module({
  imports: [UtilsModule, DentistModule],
  providers: [CalendarService],
  controllers: [CalendarController]
})
export class CalendarModule {}
