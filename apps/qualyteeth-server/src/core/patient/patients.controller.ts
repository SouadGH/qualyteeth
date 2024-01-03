
import { Body, Controller, Delete, Get, Param, Post, Put, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'apps/qualyteeth-server/src/core/auth/jwt-auth.guard';
import { PatientsService } from './patients.service';
import { PatientDto } from 'libs/shared/src/lib/dto/patient.dto';
import { Patient } from './patient.entity';

@Controller('patients')
export class PatientsController {

    /**
     *
     */
    constructor(private patientSvc: PatientsService) { }


    /**
    *Collects all patients
    */
    //@UseGuards(JwtAuthGuard)
    @Get()
    async findAll(): Promise<Patient[]> {

        return await this.patientSvc.findAll();
    }

    /**
     *Recovers a patient according to his Id
     */
    //@UseGuards(JwtAuthGuard)
    // @UseInterceptors(SnakeToCameInterceptor)
    @Get(':id')
    async findOne(@Param('id') id: string): Promise<Patient> {
        const patient = await this.patientSvc.getById(id);
        if (!patient) {
            throw new Error('patient not found');
        } else {
            return patient;
        }
    }

    /**
     *Update a patient according to his Id
     */
    //@UseGuards(JwtAuthGuard)
    @Put(':id')
    async update(@Param('id') id: string, @Body() patient: Patient) {
        return await this.patientSvc.update(id, patient);
    }

    /**
    *Add a new patient
    */
    //@UseGuards(JwtAuthGuard)
    @Post('add')
    async add(@Request() req) {
        return await this.patientSvc.save(req.body);
    }

    /**
    *Delete a patient according to his id
    */
    //@UseGuards(JwtAuthGuard)
    @Delete(':id')
    async delete(@Param('id') id: string) {
       return await this.patientSvc.delete(id);
    }

    /**
    *Restore a patient according to his id
    */
    //@UseGuards(JwtAuthGuard)
    @Get('restore/:id')
    async restore(@Param('id') id: string) {
        return await this.patientSvc.restore(id);
    }

    /**
     *Find connected practitioners to the patient according to his id
     */
    //@UseGuards(JwtAuthGuard)
    // @UseInterceptors(SnakeToCameInterceptor)
    @Get(':id/practitioners')
    async findConnectedPractitioners(@Param('id') id: string) {
        return await this.patientSvc.findConnectedPractitioners(id);
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

    

}
