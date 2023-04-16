import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UtilsModule } from 'apps/qualyteeth-server/src/core/utils/utils.module';
import { Feedback } from 'libs/shared/src/lib/feedback.entity';
import { FeedbackController } from './feedback.controller';
import { FeedbackService } from './feedback.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Feedback]),
    UtilsModule
  ],
  providers: [FeedbackService],
  controllers: [FeedbackController]
})
export class FeedbackModule { }
