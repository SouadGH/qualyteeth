import { Controller, Get, Param, UseGuards, UseInterceptors } from '@nestjs/common';
import { JwtAuthGuard } from 'apps/qualyteeth-server/src/core/auth/jwt-auth.guard';
import { SnakeToCameInterceptor } from 'apps/qualyteeth-server/src/inteceptors/snake-to-came.interceptor';
import { ToothService } from './tooth.service';

@Controller('teeth')
export class ToothController {

    /**
     *
     */
    constructor(private toothSvc: ToothService) { }

    /**
     *
     */
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(SnakeToCameInterceptor)
    @Get(':fdiNumber')
    async getTooth(@Param() params) {
        return await this.toothSvc.findByFdiNumber(parseInt(params.fdiNumber));
    }

    /**
     *
     */
<<<<<<< HEAD
    //@UseGuards(JwtAuthGuard)
=======
    @UseGuards(JwtAuthGuard)
>>>>>>> c6740c8dc4e6e69e5f3be7ef55127ed511d52617
    @UseInterceptors(SnakeToCameInterceptor)
    @Get('')
    async getAll() {
        return await this.toothSvc.findall()
    }
}
