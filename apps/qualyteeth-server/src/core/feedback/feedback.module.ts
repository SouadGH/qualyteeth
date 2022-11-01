import { Module } from '@nestjs/common';
import { UtilsModule } from 'apps/qualyteeth-server/src/core/utils/utils.module';
import { FeedbackController } from './feedback.controller';
import { FeedbackService } from './feedback.service';

@Module({
  imports: [UtilsModule],
  providers: [FeedbackService],
  controllers: [FeedbackController]
})
export class FeedbackModule { }
