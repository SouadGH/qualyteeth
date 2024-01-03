
<<<<<<< HEAD
import { Controller, Delete, Get, Param, Post,Put,Request } from '@nestjs/common';
import { InterventionService } from './intervention.service';
import { Intervention } from './intervention.entity';
=======
import { Controller } from '@nestjs/common';
import { InterventionService } from './intervention.service';
>>>>>>> c6740c8dc4e6e69e5f3be7ef55127ed511d52617

@Controller('interventions')
export class InterventionController {

    /**
     *
     */
    constructor(
        private interventionSvc: InterventionService) { }

<<<<<<< HEAD
    /**
    * Collects all comments
    */
    //@UseGuards(JwtAuthGuard)
    @Get()
    async findAll() {
        return await this.interventionSvc.getAllInterventions();
    }

    /**
     *Collecte an intervention according to his ID
     */
    //@UseGuards(JwtAuthGuard)
    // @UseInterceptors(SnakeToCameInterceptor)
    @Get(':id')
    async findOne(@Param('id') id: string): Promise<Intervention> {
        const intervention = await this.interventionSvc.getById(id);
        if (!intervention) {
            throw new Error('intervention not found');
        } else {
            return intervention;
        }
    }
     /**
     *Collecte all interventions according to the id of predicamentPlan
     */
    //@UseGuards(JwtAuthGuard)
    // @UseInterceptors(SnakeToCameInterceptor)
    @Get(':id/plan')
    async findInterventionsForPredicamentPlanID(@Param('id') id: string) {
        const predicamentsPlan = await this.interventionSvc.findInterventionsForPredicamentPlanID(id);
        if (!predicamentsPlan) {
            throw new Error('predicaments plan not found');
        } else {
            return predicamentsPlan;
        }
    }
    /**
    *Delete an intervention according to his id
    */
    //@UseGuards(JwtAuthGuard)
    @Delete(':id')
    async delete(@Param('id') id: string) {
        return await this.interventionSvc.delete(id);
    }

     /**
    *Restore an intervention according to his id
    */
    //@UseGuards(JwtAuthGuard)
    @Get('restore/:id')
    async restore(@Param('id') id: string) {
        return await this.interventionSvc.restore(id);
    }
    // @UseGuards(JwtAuthGuard)
    //@Post('add')
    // async add( @Request() req) {
       // return await this.interventionSvc.saveDocument(file, req.body);
        // if (req.body['treatmentId'] != null) {
        //     return await this.documentSvc.saveDocument(req.body['patientId'], file, req.body['treatmentId']);
        // } else {
        //     return await this.documentSvc.saveDocument(req.body['patientId'], file);
        // }
  //  }
    /**
     *Update an intervention according to his Id
     */
    //@UseGuards(JwtAuthGuard)
    @Put()
    async update(@Request() req){// @Body() predicament: Predicament) {
        return await this.interventionSvc.update(req.body['intervention']);
    }
  @Post('add')
    async add(@Request() req) {
        await this.interventionSvc.save(req.body);
    }


=======
>>>>>>> c6740c8dc4e6e69e5f3be7ef55127ed511d52617
}