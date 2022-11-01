import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'apps/qualyteeth-server/src/core/auth/jwt-auth.guard';
import { FeedbackService } from './feedback.service';

@Controller('feedback')
export class FeedbackController {

    /**
     *
     */
    constructor(private feedbackSvc: FeedbackService) { }

    /**
     *
     */
    @UseGuards(JwtAuthGuard)
    @Post('add')
    async saveCalendar(@Request() req) {
        return await this.feedbackSvc.saveFeedback(req.body.userid, req.body.feedback.stars, req.body.feedback.comment);
    }
}
