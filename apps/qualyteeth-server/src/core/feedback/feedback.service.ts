import { Injectable, Logger } from '@nestjs/common';
import { DbService } from 'apps/qualyteeth-server/src/core/utils/db.service';

@Injectable()
export class FeedbackService {
    private readonly logger = new Logger(FeedbackService.name);

    /**
     * 
     */
    constructor(
        private dbService: DbService
    ) { }

    /**
     * 
     */
    async saveFeedback(accountId: number, stars: number, comment: string): Promise<void> {
        try {
            const query = `
                INSERT INTO feedback (account_id, stars, comment, created_on) 
                VALUES ($1, $2, $3, $4)
                RETURNING id`;
            await this.dbService.db.one(query, [accountId, stars, comment, new Date()]);
        } catch (e) {
            this.logger.error(e.message, new Error(e).stack)
            throw e;
        }
    }
}
