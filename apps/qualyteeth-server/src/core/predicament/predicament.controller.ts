
import { Controller } from '@nestjs/common';
import { PredicamentService } from './predicament.service';

@Controller('predicament')
export class PredicamentController {

    /**
     *
     */
    constructor(
        private predicamentSvc: PredicamentService) { }

}