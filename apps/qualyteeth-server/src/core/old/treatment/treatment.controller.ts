// import { Body, Controller, Delete, Get, Header, HttpException, HttpStatus, Param, Post, Put, Request, Res, UseGuards, UseInterceptors } from '@nestjs/common';
// import { JwtAuthGuard } from 'apps/qualyteeth-server/src/core/auth/jwt-auth.guard';
// import { SnakeToCameInterceptor } from 'apps/qualyteeth-server/src/inteceptors/snake-to-came.interceptor';
// import { Predicament } from 'libs/shared/src/lib/predicament.entity';
// import { TreatmentService } from './treatment.service';

// @Controller('treatment')
// export class TreatmentController {

//     /**
//      *
//      */
//     constructor(private treatmentSvc: TreatmentService) { }

//     /**
//      *
//      */
//     // @UseGuards(JwtAuthGuard)
//     // @UseInterceptors(SnakeToCameInterceptor)
//     // @Get('definition/default')
//     // async getDefaultTreatmentDefinitions() {
//     //     return await this.treatmentSvc.getDefaultDefinitions()
//     // }

//     /**
//      *
//      */
//     @UseGuards(JwtAuthGuard)
//     @UseInterceptors(SnakeToCameInterceptor)
//     @Get('definition/dentist/:dentistId')
//     async getTreatmentDefinitionsForDentist(@Param() params) {
//         return await this.treatmentSvc.getDefinitionsForDentist(parseInt(params.dentistId));
//     }

//     /**
//      *
//      */
//     @UseGuards(JwtAuthGuard)
//     @UseInterceptors(SnakeToCameInterceptor)
//     @Get('definition/:definitionId')
//     async getTreatmentDefinition(@Param() params) {
//         return await this.treatmentSvc.getDefinition(parseInt(params.definitionId));
//     }

//     /**
//      *
//      */
//     @UseGuards(JwtAuthGuard)
//     @UseInterceptors(SnakeToCameInterceptor)
//     @Get('definition/acts/:definitionId')
//     async getActsForDefinition(@Param() params) {
//         return await this.treatmentSvc.getActsForDefinition(parseInt(params.definitionId));
//     }

//     /**
//      *
//      */
//     @UseGuards(JwtAuthGuard)
//     @Post('definition/save')
//     async saveTreatmentDefinition(@Request() req) {
//         // console.log(req.body.treatment, req.body.language)
//         // await this.treatmentSvc.saveTreatmentDefinition(req.body.treatment, req.body.language);
//         await this.treatmentSvc.saveTreatmentDefinition(req.body.treatment);
//     }

//     /**
//      *
//      */
//     @UseGuards(JwtAuthGuard)
//     @Put('definition/update')
//     async updateTreatmentDefinition(@Request() req) {
//         // console.log(req.body.treatment)
//         await this.treatmentSvc.updateDefinition(req.body.treatment);
//     }

//     /**
//      *
//      */
//     @UseGuards(JwtAuthGuard)
//     @Put('delete')
//     async delete(@Body() body: any): Promise<void> {
//         return await this.treatmentSvc.deleteDefinition(body.definitionId);
//     }

//     /**
//      *
//      */
//     //  @UseGuards(JwtAuthGuard)
//     //  @Delete('definition/delete/:definitionId')
//     //  async deleteTreatmentDefinition(@Param() params) {
//     //      await this.treatmentSvc.deleteTreatmentDefinition(params.definitionId);
//     //  }




//     /**
//      *
//      */
//     @UseGuards(JwtAuthGuard)
//     @UseInterceptors(SnakeToCameInterceptor)
//     @Get(':id')
//     async getById(@Param() params) {
//         return await this.treatmentSvc.getById(params.id);
//     }

//     /**
//      *
//      */
//     @UseGuards(JwtAuthGuard)
//     @UseInterceptors(SnakeToCameInterceptor)
//     @Get('dentist/:dentistId')
//     async getForDentist(@Param() params) {
//         return await this.treatmentSvc.getForDentist(params.dentistId);
//     }

//     /**
//      *
//      */
//     @UseGuards(JwtAuthGuard)
//     @UseInterceptors(SnakeToCameInterceptor)
//     @Get('patient/:patientId')
//     async getForPatient(@Param() params) {
//         return await this.treatmentSvc.getForPatient(params.patientId);
//     }

//     /**
//      *
//      */
//     @UseGuards(JwtAuthGuard)
//     @UseInterceptors(SnakeToCameInterceptor)
//     @Get('patient/:patientId/tooth/:fdiNumber')
//     async getForPatientAndTooth(@Param() params) {
//         return await this.treatmentSvc.getForPatientAndTooth(params.patientId, parseInt(params.fdiNumber));
//     }

//     /**
//      *
//      */
//     @UseGuards(JwtAuthGuard)
//     @UseInterceptors(SnakeToCameInterceptor)
//     @Get('patient/:patientId/dentist/:dentistId')
//     async getForPatientAndDentist(@Param() params) {
//         return await this.treatmentSvc.getForPatientAndDentist(params.patientId, params.dentistId);
//     }

//     /**
//      *
//      */
//     @UseGuards(JwtAuthGuard)
//     @UseInterceptors(SnakeToCameInterceptor)
//     @Get('patient/:patientId/dentist/:dentistId/tooth/:fdiNumber')
//     async getForPatientAndDentistAndTooth(@Param() params) {
//         return await this.treatmentSvc.getForPatientAndDentistAndTooth(params.patientId, params.dentistId, parseInt(params.fdiNumber));
//     }

//     /**
//      *
//      */
//     @UseGuards(JwtAuthGuard)
//     @Post('save')
//     async saveTreatment(@Request() req) {
//         // console.log(req.body.treatment)
//         await this.treatmentSvc.saveTreatment(req.body.treatment);;
//     }

//     /**
//      *
//      */
//     @UseGuards(JwtAuthGuard)
//     @Post('init')
//     async init(@Request() req) {
//         return await this.treatmentSvc.init(req.body.dentistId);
//     }

//     /**
//      *
//      */
//     @UseGuards(JwtAuthGuard)
//     @UseInterceptors(SnakeToCameInterceptor)
//     @Get('acts')
//     async getActs(@Param() params) {
//         return await this.treatmentSvc.getActs();
//     }

//     /**
//     *
//     */
//     @Get('sse/patient/:patientId')
//     @Header('Content-Type', 'text/event-stream')
//     @Header('Cache-Control', 'no-cache')
//     @Header('Connection', 'keep-alive')
//     async diagnosticForPatient(@Request() req, @Res() res) {
//         this.treatmentSvc.treatmentSubject.subscribe(
//             (t: Treatment) => {

//                 if (t.patient.id !== req.params.patientId) {
//                     return;
//                 }

//                 let data = 'event: treatment\n';
//                 data = data + 'id: treatment\n';
//                 data = data + 'retry: 1000\n';
//                 data = data + 'data: ' + JSON.stringify(t) + '\n\n';
//                 res.write(data)
//             });
//     }
// }
