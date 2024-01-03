
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UtilsModule } from 'apps/qualyteeth-server/src/core/utils/utils.module';
import { Comment } from './comment.entity';
<<<<<<< HEAD
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
=======

@Module({
  imports: [
    TypeOrmModule.forFeature([Comment]),
    UtilsModule
  ],
  controllers: [],
  exports: [],
  providers: []
>>>>>>> c6740c8dc4e6e69e5f3be7ef55127ed511d52617
})
export class CommentModule { }
