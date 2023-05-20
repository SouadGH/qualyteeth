
import { Controller, Get, Param, Post, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'apps/qualyteeth-server/src/core/auth/jwt-auth.guard';
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
    // @UseInterceptors(SnakeToCameInterceptor)
    @Get(':id')
    async find(@Param() params) {
        return await this.patientSvc.getById(params.id);
    }

    /**
     *
     */
    @UseGuards(JwtAuthGuard)
    @Post('add')
    async add(@Request() req) {
        await this.patientSvc.save(req.body);
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
    // @UseGuards(JwtAuthGuard)
    // @UseInterceptors(SnakeToCameInterceptor)
    // @Get(':id/surgeries')
    // async getConnectedSurgeries(@Param() params) {
    //     return await this.patientSvc.getConnectedSurgeries(params.id);
    // }

    /**
     *
     */
    @UseGuards(JwtAuthGuard)
    // @UseInterceptors(SnakeToCameInterceptor)
    @Get(':id/dentists')
    async findConnectedPractitioners(@Param() params) {
        return await this.patientSvc.findConnectedPractitioners(params.id);
    }

}
