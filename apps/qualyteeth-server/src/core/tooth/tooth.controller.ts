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
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(SnakeToCameInterceptor)
    @Get('')
    async getAll() {
        return await this.toothSvc.findall()
    }
}
