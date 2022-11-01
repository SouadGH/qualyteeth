import { Controller, Get, Param, Post, Request, UseGuards, UseInterceptors } from '@nestjs/common';
import { JwtAuthGuard } from 'apps/qualyteeth-server/src/core/auth/jwt-auth.guard';
import { SnakeToCameInterceptor } from 'apps/qualyteeth-server/src/inteceptors/snake-to-came.interceptor';
import { PatientsService } from './patients.service';

@Controller('patient')
export class PatientsController {

    /**
     *
     */
    constructor(private patientSvc: PatientsService) { }

    /**
     *
     */
    // @UseGuards(JwtAuthGuard)
    // @UseInterceptors(SnakeToCameInterceptor)
    // @Get(':id')
    // async find(@Param() params) {
    //     return await this.userSvc.find(params.id, 'PATIENT')
    // }

    /**
     *
     */
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(SnakeToCameInterceptor)
    @Get(':id')
    async find(@Param() params) {
        return await this.patientSvc.findById(params.id);
    }

    /**
     *
     */
    @UseGuards(JwtAuthGuard)
    @Post('add')
    async add(@Request() req) {
        await this.patientSvc.add(req.body);
    }

    /**
     *
     */
    @UseGuards(JwtAuthGuard)
    @Post('update')
    async update(@Request() req) {
        await this.patientSvc.update(req.body.patient);
    }

    /**
     *
     */
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(SnakeToCameInterceptor)
    @Get(':id/surgeries')
    async getConnectedSurgeries(@Param() params) {
        return await this.patientSvc.getConnectedSurgeries(params.id);
    }

    /**
     *
     */
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(SnakeToCameInterceptor)
    @Get(':id/dentists')
    async getConnectedDentists(@Param() params) {
        return await this.patientSvc.findConnectedDentists(params.id);
    }

}
