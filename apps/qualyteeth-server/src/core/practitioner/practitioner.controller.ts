
<<<<<<< HEAD
import { Controller, Get, Param, Post, Put, Request, UseGuards } from '@nestjs/common';
=======
import { Controller, Get, Param, Post, Request, UseGuards } from '@nestjs/common';
>>>>>>> c6740c8dc4e6e69e5f3be7ef55127ed511d52617
import { ApiBearerAuth, ApiParam } from '@nestjs/swagger';
import { JwtAuthGuard } from 'apps/qualyteeth-server/src/core/auth/jwt-auth.guard';
import { PractitionerService } from './practitioner.service';

<<<<<<< HEAD
@Controller('practitioner')
=======
@Controller('practitioners')
>>>>>>> c6740c8dc4e6e69e5f3be7ef55127ed511d52617
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
<<<<<<< HEAD
   // @UseGuards(JwtAuthGuard)
=======
    @UseGuards(JwtAuthGuard)
>>>>>>> c6740c8dc4e6e69e5f3be7ef55127ed511d52617
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
<<<<<<< HEAD
        await this.dentistSvc.update(req.body.practitioner);
=======
        await this.dentistSvc.update(req.body.dentist);
>>>>>>> c6740c8dc4e6e69e5f3be7ef55127ed511d52617
    }

    /**
     *
     */
<<<<<<< HEAD
   // @UseGuards(JwtAuthGuard)
=======
    @UseGuards(JwtAuthGuard)
>>>>>>> c6740c8dc4e6e69e5f3be7ef55127ed511d52617
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
<<<<<<< HEAD
    /* @UseGuards(JwtAuthGuard)
     @Put('timetable/update')
     async updateTimetable(@Request() req) {
         return await this.dentistSvc.updateTimetable(req.body['dentistId'], req.body['timetables']);
     }*/
=======
    // @UseGuards(JwtAuthGuard)
    // @Put('timetable/update')
    // async updateTimetable(@Request() req) {
    //     return await this.dentistSvc.updateTimetable(req.body['dentistId'], req.body['timetables']);
    // }
>>>>>>> c6740c8dc4e6e69e5f3be7ef55127ed511d52617

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
