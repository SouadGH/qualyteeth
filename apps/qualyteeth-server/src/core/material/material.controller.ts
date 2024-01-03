
import { Body, Controller, Delete, Get, Param, Post, Put, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PredicamentDto, PredicamentType } from 'libs/shared/src/lib/dto/predicament.dto';

import { Material } from './material.entity';
import { MaterialService } from './material.service';

@Controller('materials')
export class MaterialController {

    /**
     *
     */
    constructor(
        private materialSvc: MaterialService) { }

    /**
    * Collects all comments
    */
    //@UseGuards(JwtAuthGuard)
    @Get()
    async findAll() {
        return await this.materialSvc.getAllMaterials();
    }
     /**
     *Recovers a comment according to his Id
     */
    //@UseGuards(JwtAuthGuard)
    // @UseInterceptors(SnakeToCameInterceptor)
    @Get(':id')
    async findOne(@Param('id') id: string): Promise<Material> {
        const material = await this.materialSvc.getById(id);
        if (!material) {
            throw new Error('material not found');
        } else {
            return material;
        }
        
    }
    /**
     *Add a new predicament
     */
    //@UseGuards(JwtAuthGuard)
    @Post('add')
    async add(@Request() req) {
        await this.materialSvc.save(req.body);
    }

}