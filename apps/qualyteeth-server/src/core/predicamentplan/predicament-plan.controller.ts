
import { Body, Controller, Delete, Get, Param, Post, Put, Request, UseGuards } from '@nestjs/common';

import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PredicamentDto, PredicamentType } from 'libs/shared/src/lib/dto/predicament.dto';
import { Predicament } from '../predicament/predicament.entity';
import { PredicamentPlanService } from './predicament-plan.service';
import { PredicamentPlan } from './predicament-plan.entity';

@Controller('predicamentsPlan')
export class PredicamentPlanController {

    /**
     *
     */
    constructor(
        private predicamentPlanSvc: PredicamentPlanService) { }

    /**
    *Collects all predicaments
    */
    //@UseGuards(JwtAuthGuard)
    @Get()
    async findAll() {

        return await this.predicamentPlanSvc.getAllPredicamentPlans();
    }

    /**
     *Recovers a predicament according to his Id
     */
    //@UseGuards(JwtAuthGuard)
    // @UseInterceptors(SnakeToCameInterceptor)
    @Get(':id')
    async findOne(@Param('id') id: string): Promise<PredicamentPlan> {
        const predicament = await this.predicamentPlanSvc.getById(id);
        if (!predicament) {
            throw new Error('predicament not found');
        } else {
            return predicament;
        }
    }

    /**
     *Update a predicament according to his Id
     */
    //@UseGuards(JwtAuthGuard)
    @Put(':id')
    async update(@Param('id') id: string,@Request() req){// @Body() predicament: Predicament) {
        return await this.predicamentPlanSvc.update(id, req.body['predicament']);
    }
    /**
     *Add a new predicament
     */
    //@UseGuards(JwtAuthGuard)
    @Post('add')
    async add(@Request() req) {
        await this.predicamentPlanSvc.save(req.body);
    }
    /**
    *Delete a patient according to his id
    */
    //@UseGuards(JwtAuthGuard)
    @Delete(':id')
    async delete(@Param('id') id: string) {
        return await this.predicamentPlanSvc.delete(id);
    }
    /**
    *Restore a predicament according to his id
    */
    //@UseGuards(JwtAuthGuard)
    @Get('restore/:id')
    async restore(@Param('id') id: string) {
        return await this.predicamentPlanSvc.restore(id);
    }

    /**
     *Find connected practitioners to the patient according to his id
     */
    //@UseGuards(JwtAuthGuard)
    // @UseInterceptors(SnakeToCameInterceptor)
    @Get(':id/patient')
    async findPredicamentsPlanForPatientID(@Param('id') id: string) {
        const predicamentsPlan = await this.predicamentPlanSvc.findPredicamentsByPractitionerId(id);
        if (!predicamentsPlan) {
            throw new Error('predicaments plan not found');
        } else {
            return predicamentsPlan;
        }
    }
    /**
     *Find all predicaments  according to idType
     */
    //@UseGuards(JwtAuthGuard)
    // @UseInterceptors(SnakeToCameInterceptor)
    @Get(':id/type')
    async findPredicamentsByType(@Param('id') type: PredicamentType) {
        const predicament = await this.predicamentPlanSvc.findPredicamentsByType(type);
        if (!predicament) {
            throw new Error('practitioner not found');
        } else {
            return predicament;
        }
    }
    /**
     *Find all predicaments by default or creatwed by practitioner according to idType 
     */
    //@UseGuards(JwtAuthGuard)
    // @UseInterceptors(SnakeToCameInterceptor)
    @Post(':id/type/practitioner')
    async findPredicamentsByTypeForPractitionerID(@Param('id') type: PredicamentType,@Request() req) {
       /* const predicament = await this.predicamentPlanSvc.findPredicamentsByTypeForPractitionerID(type,req.body);
       
        return predicament;*/
    }

} 