
import { Controller } from '@nestjs/common';
import { InterventionService } from './intervention.service';

@Controller('interventions')
export class InterventionController {

    /**
     *
     */
    constructor(
        private interventionSvc: InterventionService) { }

}