
import { Body, Controller, Delete, Get, Param, Post, Put, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PredicamentDto, PredicamentType } from 'libs/shared/src/lib/dto/predicament.dto';
import { CommentService } from './comment.service';
import { Comment } from './comment.entity';

@Controller('comments')
export class CommentController {

    /**
     *
     */
    constructor(
        private commentSvc: CommentService) { }

    /**
    * Collects all comments
    */
    //@UseGuards(JwtAuthGuard)
    @Get()
    async findAll() {
        return await this.commentSvc.getAllComments();
    }
     /**
     *Recovers a comment according to his Id
     */
    //@UseGuards(JwtAuthGuard)
    // @UseInterceptors(SnakeToCameInterceptor)
    @Get(':id')
    async findOne(@Param('id') id: string): Promise<Comment> {
        const comment = await this.commentSvc.getById(id);
        if (!comment) {
            throw new Error('comment not found');
        } else {
            return comment;
        }
    }


}