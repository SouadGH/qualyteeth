import { Controller, Get, Param, Post, Put, Request, UseGuards, UseInterceptors } from '@nestjs/common';
import { JwtAuthGuard } from 'apps/qualyteeth-server/src/core/auth/jwt-auth.guard';
import { SnakeToCameInterceptor } from 'apps/qualyteeth-server/src/inteceptors/snake-to-came.interceptor';
import { SurgeryService } from './surgery.service';

@Controller('surgery')
export class SurgeryController {

    /**
     *
     */
    constructor(private surgerySvc: SurgeryService) { }

    /**
     *
     */
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(SnakeToCameInterceptor)
    @Get(':id')
    async find(@Param() params) {
        return await this.surgerySvc.findById(params.id);
    }

    /**
     *
     */
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(SnakeToCameInterceptor)
    @Get(':id/services')
    async findServices(@Param() params) {
        return await this.surgerySvc.findServices(params.id);
    }

    /**
     *
     */
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(SnakeToCameInterceptor)
    @Get('dentist/:id')
    async findForDentistId(@Param() params) {
        return await this.surgerySvc.findForDentistId(params.id);
    }

    /**
     *
     */
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(SnakeToCameInterceptor)
    @Get('dentist/:dentistId/all')
    async findSurgeriesForDentistId(@Param() params) {
        return await this.surgerySvc.findSurgeriesForDentistId(params.dentistId);
    }

    /**
     *
     */
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(SnakeToCameInterceptor)
    @Get('patient/:patientId/all')
    async findAllForPatientId(@Param() params) {
        return await this.surgerySvc.findAllForPatientId(params.patientId);
    }

    /**
     *
     */
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(SnakeToCameInterceptor)
    @Get(':id/dentists')
    async findDentists(@Param() params) {
        return await this.surgerySvc.findDentists(params.id);
    }

    /**
     *
     */
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(SnakeToCameInterceptor)
    @Get(':id/patients')
    async findPatients(@Param() params) {
        return await this.surgerySvc.findPatients(params.id);
    }

    /**
     *
     */
    @UseGuards(JwtAuthGuard)
    @Post('add')
    async add(@Request() req) {
        return await this.surgerySvc.add(req.body.surgery);
    }

    /**
     *
     */
    @UseGuards(JwtAuthGuard)
    @Put('update')
    async update(@Request() req) {
        return await this.surgerySvc.update(req.body.surgery);
    }

    /**
     *
     */
    @UseGuards(JwtAuthGuard)
    @Post('activate')
    async activate(@Request() req) {
        return await this.surgerySvc.activate(req.body);
    }

    /**
     *
     */
     @UseGuards(JwtAuthGuard)
     @Post('deactivate')
     async deactivate(@Request() req) {
         return await this.surgerySvc.deactivate(req.body);
     }

    /**
     *
     */
    @UseGuards(JwtAuthGuard)
    @Post('search')
    async search(@Request() req) {
        return await this.surgerySvc.search(req.body);
    }

    /**
     *
     */
    @UseGuards(JwtAuthGuard)
    @Post('dentist/link')
    async linkDentist(@Request() req) {
        return await this.surgerySvc.linkDentist(req.body);
    }

    /**
     *
     */
    // @UseGuards(JwtAuthGuard)
    // @Post('patient/link')
    // async linkPatient(@Request() req) {
    //     return await this.surgerySvc.linkPatient(req.body);
    // }
}
