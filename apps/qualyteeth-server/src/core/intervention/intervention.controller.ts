
import { Controller } from '@nestjs/common';
import { InterventionService } from './intervention.service';

@Controller('intervention')
export class InterventionController {

    /**
     *
     */
    constructor(
        private interventionSvc: InterventionService) { }

}