
import { Controller } from '@nestjs/common';
import { PredicamentService } from './predicament.service';

@Controller('predicaments')
export class PredicamentController {

    /**
     *
     */
    constructor(
        private predicamentSvc: PredicamentService) { }

}