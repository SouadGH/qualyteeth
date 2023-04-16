import { Controller, Get, Param, Post, Put, Request, UseGuards, UseInterceptors } from '@nestjs/common';
import { JwtAuthGuard } from 'apps/qualyteeth-server/src/core/auth/jwt-auth.guard';
import { SnakeToCameInterceptor } from 'apps/qualyteeth-server/src/inteceptors/snake-to-came.interceptor';
import { ServicingService } from './servicing.service';

@Controller('servicing')
export class ServicingController {

    /**
     *
     */
    constructor(private servicingSvc: ServicingService) { }

    /**
     *
     */
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(SnakeToCameInterceptor)
    @Get('definition/:definition_id')
    async getDefinition(@Param() params) {
        return await this.servicingSvc.getDefinition(params.definition_id);
    }

    /**
     *
     */
     @UseGuards(JwtAuthGuard)
     @UseInterceptors(SnakeToCameInterceptor)
     @Get('definition/dentist/:dentistId')
     async getDefinitionsForDentist(@Param() params) {
         return await this.servicingSvc.getDefinitionsForDentist(params.dentistId);
     }

    /**
     *
     */
    // @UseGuards(JwtAuthGuard)
    // @UseInterceptors(SnakeToCameInterceptor)
    // @Get('surgery/:surgeryId')
    // async findForSurgery(@Param() params) {
    //     return await this.servicingSvc.findForSurgery(params.surgeryId);
    // }

    /**
     *
     */
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(SnakeToCameInterceptor)
    @Get('definition/surgery/:surgeryId')
    async findForSurgery(@Param() params) {
        return await this.servicingSvc.getDefinitionsForSurgery(params.surgeryId);
    }

    /**
     *
     */
    // @UseGuards(JwtAuthGuard)
    // @UseInterceptors(SnakeToCameInterceptor)
    // @Get(':id/dentist/:dentistId')
    // async findForServiceAndDentist(@Param() params) {
    //     return await this.servicingSvc.findForServiceAndDentist(params.id, params.dentistId);
    // }

    /**
     *
     */
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(SnakeToCameInterceptor)
    @Get(':id/dentists')
    async findDentists(@Param() params) {
        return await this.servicingSvc.findDentists(params.id);
    }

    /**
     *
     */
    @UseGuards(JwtAuthGuard)
    @Post('definition/save')
    async save(@Request() req) {
        // return await this.servicingSvc.saveDefinition(req.body.service, req.body.serviceLinks);
        return await this.servicingSvc.saveDefinition(req.body.service);
    }

    /**
     *
     */
     @UseGuards(JwtAuthGuard)
     @Put('definition/update')
     async update(@Request() req) {
        //  await this.servicingSvc.updateDefinition(req.body.service, req.body.serviceLinks);
        await this.servicingSvc.updateDefinition(req.body.service);
     }




    /**
     *
     */
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(SnakeToCameInterceptor)
    @Get('links/:definitionId')
    async getLinks(@Param() params) {
        return await this.servicingSvc.getLinks(params.definitionId);
    }

    /**
     *
     */
     @UseGuards(JwtAuthGuard)
     @UseInterceptors(SnakeToCameInterceptor)
     @Get('links/dentist/:dentistId')
     async getLinksForDentist(@Param() params) {
         return await this.servicingSvc.getLinksForDentist(params.dentistId);
     }

    /**
     *
     */
    @UseGuards(JwtAuthGuard)
    @Post('dentist/link')
    async linkDentist(@Request() req) {
        return await this.servicingSvc.linkDentist(req.body.service);
    }

    /**
     *
     */
     @UseGuards(JwtAuthGuard)
     @Post('dentist/unlink')
     async unlinkDentist(@Request() req) {
         return await this.servicingSvc.linkDentist(req.body.service);
     }

     /**
     *
     */
      @UseGuards(JwtAuthGuard)
      @UseInterceptors(SnakeToCameInterceptor)
      @Get('patient/:patientId')
      async getServicesForPatient(@Param() params) {
          return await this.servicingSvc.getServicesForPatient(params.patientId);
      }
}
