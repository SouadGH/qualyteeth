
import { Controller, Get, Param, Post, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiParam } from '@nestjs/swagger';
import { JwtAuthGuard } from 'apps/qualyteeth-server/src/core/auth/jwt-auth.guard';
import { PractitionerService } from './practitioner.service';

@Controller('practitioner')
export class PractitionerController {

    /**
     *
     */
    constructor(
        private dentistSvc: PractitionerService) { }

    /**
     *
     */
    // @UseGuards(JwtAuthGuard, AccessGuard)
    @UseGuards(JwtAuthGuard)
    // @UseInterceptors(SnakeToCameInterceptor)
    @ApiBearerAuth()
    @ApiParam({name: 'id'})
    @Get(':id')
    async find(@Param() params) {
        return await this.dentistSvc.getById(params.id);
    }

    /**
     *
     */
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @Get('user/:userId')
    async findByUser(@Param() params) {
        return await this.dentistSvc.getByUserId(params.userId);
    }

    /**
     *
     */
    @UseGuards(JwtAuthGuard)
    @Post('update')
    async update(@Request() req) {
        await this.dentistSvc.update(req.body.dentist);
    }

    /**
     *
     */
    @UseGuards(JwtAuthGuard)
    // @UseInterceptors(SnakeToCameInterceptor)
    @Get(':userId/patient/all')
    async findPatients(@Param() params) {
        return await this.dentistSvc.findPatients(params.userId)
    }

    /**
     *
     */
     @UseGuards(JwtAuthGuard)
    //  @UseInterceptors(SnakeToCameInterceptor)
     @Get('dentists/all')
     async findAll() {
         return await this.dentistSvc.findAll()
     }

    /**
     *
     */
    @UseGuards(JwtAuthGuard)
    @Post('search')
    async search(@Request() req) {
        return await this.dentistSvc.findPractitioner(req.body['firstname'], req.body['lastname'], req.body['postalCode']);
    }

    /**
     *
     */
    // @UseGuards(JwtAuthGuard)
    // @Put('timetable/update')
    // async updateTimetable(@Request() req) {
    //     return await this.dentistSvc.updateTimetable(req.body['dentistId'], req.body['timetables']);
    // }

    /**
     *
     */
    // @UseGuards(JwtAuthGuard, AccessGuard)
    // @UseInterceptors(SnakeToCameInterceptor)
    // @ApiBearerAuth()
    // @ApiParam({name: 'id'})
    // @Get(':id/timetable')
    // async getTimetables(@Param() params) {
    //     return await this.dentistSvc.findTimetableForDentist(params.id);
    // }

    /**
     *
     */
    @UseGuards(JwtAuthGuard)
    @Post('connect')
    async connect(@Request() req) {
        return await this.dentistSvc.connect(req.body.dentistId, req.body.patientId);
    }
}
