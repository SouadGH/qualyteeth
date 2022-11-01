import { Controller, Get, Header, Param, Post, Put, Request, Res, UseGuards, UseInterceptors } from '@nestjs/common';
import { JwtAuthGuard } from 'apps/qualyteeth-server/src/core/auth/jwt-auth.guard';
import { SnakeToCameInterceptor } from 'apps/qualyteeth-server/src/inteceptors/snake-to-came.interceptor';
import { CalendarEvent } from 'libs/shared/src/lib/calendar.interface';
import { CalendarService } from './calendar.service';

@Controller('calendar')
export class CalendarController {

    /**
     *
     */
    constructor(private calendarSvc: CalendarService) { }

    /**
     *
     */
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(SnakeToCameInterceptor)
    @Get(':id')
    async get(@Param() params) {
        return await this.calendarSvc.find(params.id);
    }

    /**
     *
     */
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(SnakeToCameInterceptor)
    @Get('dentist/:dentistId/:status')
    async getCalendarEventsForDentist(@Param() params) {
        return await this.calendarSvc.getCalendarEventsForDentist(params.dentistId, params.status);
    }

    /**
     *
     */
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(SnakeToCameInterceptor)
    @Get('surgery/:surgeryId/:status')
    async getCalendarEventsForSurgery(@Param() params) {
        return await this.calendarSvc.getCalendarEventsForSurgery(params.surgeryId, params.status);
    }

    /**
     *
     */
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(SnakeToCameInterceptor)
    @Get('dentist/:dentistId/slots/:timing/:fromDate/:toDate')
    async getFreeSlotForDentist(@Param() params) {
        return await this.calendarSvc.getFreeSlotForDentist(params.dentistId, params.timing, params.fromDate, params.toDate);
    }

    /**
     *
     */
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(SnakeToCameInterceptor)
    @Get('patient/:patientId')
    async getCalendarEventsForPatient(@Param() params) {
        return await this.calendarSvc.getCalendarEventsForPatient(params.patientId);
    }

    /**
     *
     */
     @UseGuards(JwtAuthGuard)
     @UseInterceptors(SnakeToCameInterceptor)
     @Get('surgery/:surgeryId/patient/:patientId')
     async getCalendarEventsForSurgeryAndPatient(@Param() params) {
         return await this.calendarSvc.getCalendarEventsForSurgeryAndPatient(params.surgeryId, params.patientId);
     }

    /**
     *
     */
    @UseGuards(JwtAuthGuard)
    @Post('add')
    async saveCalendar(@Request() req) {
        return await this.calendarSvc.saveCalendarEvent(req.body.calendarEvent);
    }

    /**
     *
     */
    @UseGuards(JwtAuthGuard)
    @Put('update')
    async updateCalendar(@Request() req) {
        return await this.calendarSvc.updateCalendarEvent(req.body.calendarEvent);
    }

    /**
     *
     */
    @Get('sse/dentist/:dentistId')
    @Header('Content-Type', 'text/event-stream')
    @Header('Cache-Control', 'no-cache')
    @Header('Connection', 'keep-alive')
    async calendarEventsForDentist(@Request() req, @Res() res) {

        // console.log('New dentist connected: ' + req.params.dentistId)

        this.calendarSvc.calendarSubject.subscribe(
            (c: CalendarEvent) => {

                if (c.dentistId !== parseInt(req.params.dentistId)) {
                    return;
                }

                let data = 'event: calendarEvent\n';
                data = data + 'id: calendarEvent\n';
                data = data + 'retry: 1000\n';
                data = data + 'data: ' + JSON.stringify(c) + '\n\n';
                res.write(data)
            });
    }

    /**
     *
     */
    @Get('sse/patient/:patientId')
    @Header('Content-Type', 'text/event-stream')
    @Header('Cache-Control', 'no-cache')
    @Header('Connection', 'keep-alive')
    async calendarEventsForPatient(@Request() req, @Res() res) {

        // console.log('New patient connected: ' + req.params.patientId)

        this.calendarSvc.calendarSubject.subscribe(
            (c: CalendarEvent) => {

                if (c.patientId !== parseInt(req.params.patientId)) {
                    return;
                }

                let data = 'event: calendarEvent\n';
                data = data + 'id: calendarEvent\n';
                data = data + 'retry: 1000\n';
                data = data + 'data: ' + JSON.stringify(c) + '\n\n';
                res.write(data)
            });
    }
}
