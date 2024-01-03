import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Act } from 'apps/qualyteeth-server/src/core/act/act.entity';
import { Category } from 'apps/qualyteeth-server/src/core/category/category.entity';
import { IsNull, Repository } from 'typeorm';
import { Comment } from './comment.entity';
import { Intervention } from '../intervention/intervention.entity';
import { Practitioner } from '../practitioner/practitioner.entity';
import { UserType } from 'libs/shared/src/lib/dto/user.dto';
import { User } from '../user/user.entity';


@Injectable()
export class CommentService {

    private readonly logger = new Logger(CommentService.name);

    /**
     *
     */
    constructor(
        @InjectRepository(Comment) private commentRepo: Repository<Comment>,
        @InjectRepository(Intervention) private interventionRepo: Repository<Intervention>,
       
    ) {
    }
    async getAllComments() {
        return this.commentRepo.find({ relations: ['intervention'] });
    }
     /**
     *Collecte a comment according to his id
     */
     async getById(id: string) {
        const comment = await this.commentRepo.findOne({ where: { id }, relations: ['intervention'] });
        if (comment) {
            return comment;
        }
        throw new HttpException('comment with this id does not exist', HttpStatus.NOT_FOUND);

    }
     /**
     *Create a new comment with id of intervention
     */
     async save(id :string ,data: Comment): Promise<Comment> {

        const comment: Comment = data['comment'];
        if (id != null) {
            const intervention: Intervention = await this.getInterventionById(id);
            comment.intervention = intervention;
        } 

        const newComment = this.commentRepo.create({ ...comment, });
        await this.commentRepo.save(newComment);

        return newComment;
    }
     /**
   *find an intervention according to his Id
   */
   async getInterventionById(id: string): Promise<Intervention> {
    const intervention = (await this.interventionRepo.findOne({ where: { id: id } }));

    console.log("practitioner :" + JSON.stringify(intervention));
    if (intervention) {
        return intervention;
    }
    throw new HttpException('intervention with this id does not exist', HttpStatus.NOT_FOUND);

}
   
}
