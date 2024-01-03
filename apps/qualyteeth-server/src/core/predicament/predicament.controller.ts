
<<<<<<< HEAD
import { Body, Controller, Delete, Get, Param, Post, Put, Request, UseGuards } from '@nestjs/common';
import { PredicamentService } from './predicament.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PredicamentDto, PredicamentType } from 'libs/shared/src/lib/dto/predicament.dto';
import { Predicament } from './predicament.entity';
=======
import { Controller } from '@nestjs/common';
import { PredicamentService } from './predicament.service';
>>>>>>> c6740c8dc4e6e69e5f3be7ef55127ed511d52617

@Controller('predicaments')
export class PredicamentController {

    /**
     *
     */
    constructor(
        private predicamentSvc: PredicamentService) { }

<<<<<<< HEAD
    /**
    *Collects all predicaments
    */
    //@UseGuards(JwtAuthGuard)
    @Get()
    async findAll() {

        return await this.predicamentSvc.getAllPredicaments();
    }

    /**
     *Recovers a predicament according to his Id
     */
    //@UseGuards(JwtAuthGuard)
    // @UseInterceptors(SnakeToCameInterceptor)
    @Get(':id')
    async findOne(@Param('id') id: string): Promise<Predicament> {
        const predicament = await this.predicamentSvc.getById(id);
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
        return await this.predicamentSvc.update(id, req.body['predicament']);
    }
    /**
     *Add a new predicament
     */
    //@UseGuards(JwtAuthGuard)
    @Post('add')
    async add(@Request() req) {
        await this.predicamentSvc.save(req.body);
    }
    /**
    *Delete a patient according to his id
    */
    //@UseGuards(JwtAuthGuard)
    @Delete(':id')
    async delete(@Param('id') id: string) {
        return await this.predicamentSvc.delete(id);
    }
    /**
    *Restore a predicament according to his id
    */
    //@UseGuards(JwtAuthGuard)
    @Get('restore/:id')
    async restore(@Param('id') id: string) {
        return await this.predicamentSvc.restore(id);
    }

    /**
     *Find connected practitioners to the patient according to his id
     */
    //@UseGuards(JwtAuthGuard)
    // @UseInterceptors(SnakeToCameInterceptor)
    @Get(':id/practitioner')
    async findPredicamentsForPractitionerID(@Param('id') id: string) {
        const predicament = await this.predicamentSvc.findPredicamentsByPractitionerId(id);
        if (!predicament) {
            throw new Error('practitioner not found');
        } else {
            return predicament;
        }
    }
    /**
     *Find all predicaments  according to idType
     */
    //@UseGuards(JwtAuthGuard)
    // @UseInterceptors(SnakeToCameInterceptor)
    @Get(':id/type')
    async findPredicamentsByType(@Param('id') type: PredicamentType) {
        const predicament = await this.predicamentSvc.findPredicamentsByType(type);
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
        const predicament = await this.predicamentSvc.findPredicamentsByTypeForPractitionerID(type,req.body);
       
        return predicament;
    }

=======
>>>>>>> c6740c8dc4e6e69e5f3be7ef55127ed511d52617
}