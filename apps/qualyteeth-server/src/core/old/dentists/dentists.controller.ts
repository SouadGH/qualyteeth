// import { Controller, Get, Param, Post, Put, Req, Request, UseGuards, UseInterceptors } from '@nestjs/common';
// import { ApiBearerAuth, ApiParam } from '@nestjs/swagger';
// import { AccessGuard } from 'apps/qualyteeth-server/src/core/auth/access.guard';
// import { JwtAuthGuard } from 'apps/qualyteeth-server/src/core/auth/jwt-auth.guard';
// import { SnakeToCameInterceptor } from 'apps/qualyteeth-server/src/inteceptors/snake-to-came.interceptor';
// import { DentistService } from './dentist.service';

// @Controller('dentist')
// export class DentistController {

//     /**
//      *
//      */
//     constructor(
//         private dentistSvc: DentistService) { }

//     /**
//      *
//      */
//     // @UseGuards(JwtAuthGuard, AccessGuard)
//     @UseGuards(JwtAuthGuard)
//     @UseInterceptors(SnakeToCameInterceptor)
//     @ApiBearerAuth()
//     @ApiParam({name: 'id'})
//     @Get(':id')
//     async find(@Param() params) {
//         return await this.dentistSvc.getById(params.id);
//     }

//     /**
//      *
//      */
//     @UseGuards(JwtAuthGuard)
//     @Post('update')
//     async update(@Request() req) {
//         await this.dentistSvc.update(req.body.dentist);
//     }

//     /**
//      *
//      */
//     @UseGuards(JwtAuthGuard)
//     @UseInterceptors(SnakeToCameInterceptor)
//     @Get(':id/patient/all')
//     async findPatientsForDentist(@Param() params) {
//         return await this.dentistSvc.findPatientsForDentist(params.id)
//     }

//     /**
//      *
//      */
//      @UseGuards(JwtAuthGuard)
//      @UseInterceptors(SnakeToCameInterceptor)
//      @Get('dentists/all')
//      async findAll(@Param() params) {
//          return await this.dentistSvc.findAll()
//      }

//     /**
//      *
//      */
//     @UseGuards(JwtAuthGuard)
//     @Post('search')
//     async search(@Request() req) {
//         return await this.dentistSvc.findDentist(req.body['firstname'], req.body['lastname'], req.body['postalCode']);
//     }

//     /**
//      *
//      */
//     @UseGuards(JwtAuthGuard)
//     @Put('timetable/update')
//     async updateTimetable(@Request() req) {
//         return await this.dentistSvc.updateTimetable(req.body['dentistId'], req.body['timetables']);
//     }

//     /**
//      *
//      */
//     @UseGuards(JwtAuthGuard, AccessGuard)
//     @UseInterceptors(SnakeToCameInterceptor)
//     @ApiBearerAuth()
//     @ApiParam({name: 'id'})
//     @Get(':id/timetable')
//     async getTimetables(@Param() params) {
//         return await this.dentistSvc.findTimetableForDentist(params.id);
//     }

//     /**
//      *
//      */
//     // @UseGuards(JwtAuthGuard)
//     // @Post('connect')
//     // async connect(@Request() req) {
//     //     return await this.dentistSvc.connect(req.body.dentistId, req.body.patientId);
//     // }
// }
