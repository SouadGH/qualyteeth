import { Controller, Get, Header, Param, Post, Put, Request, Res, UseGuards, UseInterceptors } from '@nestjs/common';
import { JwtAuthGuard } from 'apps/qualyteeth-server/src/core/auth/jwt-auth.guard';
import { SnakeToCameInterceptor } from 'apps/qualyteeth-server/src/inteceptors/snake-to-came.interceptor';
import { Diagnostic } from 'libs/shared/src/lib/diagnostic.interface';
import { DiagnosticService } from './diagnostic.service';

@Controller('diagnostic')
export class DiagnosticController {

    constructor(private diagnosticSvc: DiagnosticService) {

    }

    /**
     *
     */
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(SnakeToCameInterceptor)
    @Get('definition/:definitionId')
    async getDefinition(@Param() params) {
        return await this.diagnosticSvc.getDefinition(parseInt(params.definitionId));
    }

    /**
     *
     */
    //  @UseGuards(JwtAuthGuard)
    //  @UseInterceptors(SnakeToCameInterceptor)
    //  @Get('definition/default')
    //  async getDefaultDiagnosticDefinitions() {
    //      return await this.diagnosticSvc.getDefaultDefinitions()
    //  }

    /**
     *
     */
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(SnakeToCameInterceptor)
    @Get('definition/dentist/:dentistId')
    async getDiagnosticDefinitionsForDentist(@Param() params) {
        return await this.diagnosticSvc.getDefinitionsForDentist(parseInt(params.dentistId));
    }

    /**
    *
    */
    @UseGuards(JwtAuthGuard)
    @Post('definition/save')
    async saveDefinition(@Request() req) {
        await this.diagnosticSvc.saveDefinition(req.body.definition, req.body.language);
    }

    /**
     *
     */
    @UseGuards(JwtAuthGuard)
    @Put('definition/update')
    async updateDefinition(@Request() req) {
        await this.diagnosticSvc.updateDefinition(req.body.diagnostic);
    }






    /**
     *
     */
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(SnakeToCameInterceptor)
    @Get('dentist/:dentistId')
    async getForDentist(@Param() params) {
        return await this.diagnosticSvc.getForDentist(params.dentistId);
    }

    /**
     *
     */
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(SnakeToCameInterceptor)
    @Get('patient/:patientId')
    async getForPatient(@Param() params) {
        return await this.diagnosticSvc.getForPatient(params.patientId);
    }

    /**
     *
     */
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(SnakeToCameInterceptor)
    @Get('patient/:patientId/dentist/:dentistId')
    async getForPatientAndDentist(@Param() params) {
        return await this.diagnosticSvc.getForPatientAndDentist(params.patientId, params.dentistId);
    }

    /**
     *
     */
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(SnakeToCameInterceptor)
    @Get('patient/:patientId/tooth/:toothFdiNumber')
    async getForPatientAndTooth(@Param() params) {
        return await this.diagnosticSvc.getForPatientAndTooth(params.patientId, params.toothFdiNumber);
    }

    /**
     *
     */
    //  @UseGuards(JwtAuthGuard)
    //  @UseInterceptors(SnakeToCameInterceptor)
    //  @Get('patient/:patientId/teeth/:toothFdiNumbers')
    //  async getForPatientAndTeeth(@Param() params) {
    //      const toothFdiNumbers = params.toothFdiNumbers.split('|').map((n: string) => parseInt(n));
    //      return await this.diagnosticSvc.getForPatientAndTeeth(params.patientId, toothFdiNumbers);
    //  }

    /**
     *
     */
    @UseGuards(JwtAuthGuard)
    @Post('add')
    async saveDiagnostic(@Request() req) {
        return await this.diagnosticSvc.saveDiagnostic(req.body.diagnostic);
    }

    /**
     *
     */
     @UseGuards(JwtAuthGuard)
     @Post('init')
     async init(@Request() req) {
         return await this.diagnosticSvc.init(req.body.dentistId);
     }

    /**
     *
     */
    @Get('sse/patient/:patientId')
    @Header('Content-Type', 'text/event-stream')
    @Header('Cache-Control', 'no-cache')
    @Header('Connection', 'keep-alive')
    async diagnosticForPatient(@Request() req, @Res() res) {
        this.diagnosticSvc.diagnosticSubject.subscribe(
            (d: Diagnostic) => {

                if (d.patientId !== parseInt(req.params.patientId)) {
                    return;
                }

                let data = 'event: diagnostic\n';
                data = data + 'id: diagnostic\n';
                data = data + 'retry: 1000\n';
                data = data + 'data: ' + JSON.stringify(d) + '\n\n';
                res.write(data)
            });
    }
}
