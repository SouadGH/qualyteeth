
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Feedback } from 'libs/shared/src/lib/feedback.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FeedbackService {
    private readonly logger = new Logger(FeedbackService.name);

    /**
     * 
     */
    constructor(
        @InjectRepository(Feedback) private feedbackRepo: Repository<Feedback>,
    ) { }

    /**
     * 
     */
    async saveFeedback(data: Feedback): Promise<void> {
        const newT = this.feedbackRepo.create({ ...data, });
        await this.feedbackRepo.save(newT);

        // try {
        //     const query = `
        //         INSERT INTO feedback (account_id, stars, comment, created_on) 
        //         VALUES ($1, $2, $3, $4)
        //         RETURNING id`;
        //     await this.dbService.db.one(query, [accountId, stars, comment, new Date()]);
        // } catch (e) {
        //     this.logger.error(e.message, new Error(e).stack)
        //     throw e;
        // }
    }
}
