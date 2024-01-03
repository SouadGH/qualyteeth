
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UtilsModule } from 'apps/qualyteeth-server/src/core/utils/utils.module';
import { Comment } from './comment.entity';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { Intervention } from '../intervention/intervention.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Comment,Intervention]),
    UtilsModule
  ],
  controllers: [CommentController],
  exports: [CommentService],
  providers: [CommentService]
})
export class CommentModule { }
