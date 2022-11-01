import { Injectable, Logger } from '@nestjs/common';
import { CalendarEvent, CalendarStatus } from 'libs/shared/src/lib/calendar.interface';
import { DbService } from 'apps/qualyteeth-server/src/core/utils/db.service';
import * as moment from 'moment'
import { Subject } from 'rxjs';
import { DentistTimetable } from 'libs/shared/src/lib/dentist.interface';
import { DentistService } from 'apps/qualyteeth-server/src/core/dentists/dentist.service';

@Injectable()
export class CalendarService {
    private readonly logger = new Logger(CalendarService.name);

    public calendarSubject: Subject<any> = new Subject<any>();

    /**
     * 
     */
    constructor(private dbService: DbService, private dentistSvc: DentistService) { }

    /**
     * 
     */
    async find(id: number): Promise<CalendarEvent> {
        try {
            const query = `SELECT * FROM calendar_event WHERE id = $1`;
            return await this.dbService.db.oneOrNone(query, id);
        } catch (e) {
            this.logger.error(e.message, new Error(e).stack)
            throw e;
        }
    }

    /**
     * 
     */
    async getCalendarEventsForDentist(dentistId: number, status: string = null, fromDate: string = null, toDate: string = null): Promise<Array<CalendarEvent>> {
        try {
            // console.log(dentistId)
            // console.log(status)

            const parameters = [];
            parameters.push(dentistId);
            let parameterId: number = 1;

            let query = `SELECT * FROM calendar_event WHERE dentist_id = \$${parameterId++}`;
            if (status != null) {
                let statuses = status.split(',');
                statuses = statuses.map(x => x.trim());
                query = `${query} AND status = ANY (\$${parameterId++})`
                parameters.push(statuses);
            }
            if (fromDate != null) {
                query = `${query} AND start_date >= \$${parameterId++}`
                parameters.push(fromDate);
            }
            if (toDate != null) {
                query = `${query} AND end_date <= \$${parameterId++}`
                parameters.push(toDate);
            }

            // console.log(query, parameters)
            return await this.dbService.db.manyOrNone(query, parameters);
        } catch (e) {
            this.logger.error(e.message, new Error(e).stack)
            throw e;
        }
    }

    /**
     * 
     */
    async getCalendarEventsForSurgery(surgeryId: number, status: string = null, fromDate: string = null, toDate: string = null): Promise<Array<CalendarEvent>> {
        try {
            // console.log(dentistId)
            // console.log(status)

            const parameters = [];
            parameters.push(surgeryId);
            let parameterId: number = 1;

            let query = `
                SELECT c.* from calendar_event c
                JOIN dentist_service_lnk ds ON c.service_definition_id = ds.definition_id
                JOIN dentist_surgery_lnk s ON s.dentist_id = c.dentist_id AND s.dentist_id = ds.dentist_id
                WHERE s.surgery_id = \$${parameterId++}
            `;
            if (status != null) {
                const statuses = status.split(',');
                query = `${query} AND c.status = ANY (\$${parameterId++})`
                parameters.push(statuses);
            }
            if (fromDate != null) {
                query = `${query} AND c.start_date >= \$${parameterId++}`
                parameters.push(fromDate);
            }
            if (toDate != null) {
                query = `${query} AND c.end_date <= \$${parameterId++}`
                parameters.push(toDate);
            }
            // console.log(query, parameters)
            return await this.dbService.db.manyOrNone(query, parameters);
        } catch (e) {
            this.logger.error(e.message, new Error(e).stack)
            throw e;
        }
    }

    /**
     * 
     */
    async getCalendarEventsForPatient(patientId: number): Promise<Array<any>> {
        try {
            const query = `
                SELECT ce.*, n.name as service_name, n.category as service_category, d.id as dentist_id, d.firstname as dentist_firstname, d.lastname as dentist_lastname
                FROM calendar_event ce
                LEFT JOIN service_definition s on s.id = ce.service_definition_id
                JOIN service_definition_name n on n.definition_id = s.id
                LEFT JOIN dentist d on d.id = ce.dentist_id
                WHERE ce.patient_id = $1
                `;
                // AND ce.status <> 'CANCELLED'
            return await this.dbService.db.manyOrNone(query, patientId);
        } catch (e) {
            this.logger.error(e.message, new Error(e).stack)
            throw e;
        }
    }

    /**
     * 
     */
     async getCalendarEventsForSurgeryAndPatient(surgeryId: number, patientId: number): Promise<Array<any>> {
        try {
            const query = `
                SELECT ce.*, s.name as service_name, s.category as service_category, d.firstname as dentist_firstname, d.lastname as dentist_lastname
                FROM calendar_event ce
                LEFT JOIN service_definition s on s.id = ce.service_definition_id
                LEFT JOIN dentist d on d.id = ce.dentist_id
                WHERE ce.surgery_id = $1
                and ce.patient_id = $2
                AND ce.status <> 'CANCELLED'
                `;
            return await this.dbService.db.manyOrNone(query, [surgeryId, patientId]);
        } catch (e) {
            this.logger.error(e.message, new Error(e).stack)
            throw e;
        }
    }

    /**
     *
     */
    async saveCalendarEvent(c: CalendarEvent): Promise<number> {

        // this.logger.log(c)

        return await this.dbService.db.tx('addCalendarTx', async tx => {
            // tx.ctx = transaction context object

            try {
                const query = `
                    INSERT INTO calendar_event (dentist_id, service_definition_id, patient_id, status, start_date, end_date, all_day, location, url, notes, reminders, rrule, created_on) 
                    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
                    RETURNING id`;

                const idObj = await this.dbService.db.one(query, [c.dentistId, c.serviceDefinitionId, c.patientId, c.status, c.startDate, c.endDate, c.allDay, c.location, c.url, c.notes, c.reminders, c.rrule, new Date()]);
                c.id = idObj['id'];

                const hQuery = `
                    INSERT INTO calendar_event_history (calendar_event_id, dentist_id, service_definition_id, patient_id, status, start_date, end_date, all_day, location, url, notes, reminders, rrule, created_on) 
                    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)`;

                await this.dbService.db.none(hQuery, [c.id, c.dentistId, c.serviceDefinitionId, c.patientId, c.status, c.startDate, c.endDate, c.allDay, c.location, c.url, c.notes, c.reminders, c.rrule, new Date()]);

                this.calendarSubject.next(c);

                return c.id;
            } catch (e) {
                this.logger.error(e.message, new Error(e).stack)
                throw e;
            }
        });
    }

    /**
     *
     */
    async updateCalendarEvent(c: CalendarEvent): Promise<void> {

        // this.logger.log(c)

        return await this.dbService.db.tx('updateCalendarTx', async tx => {
            // tx.ctx = transaction context object

            try {
                const query = `
                    UPDATE calendar_event 
                    SET
                        dentist_id = $1, 
                        service_definition_id = $2, 
                        patient_id = $3, 
                        status = $4, 
                        start_date = $5, 
                        end_date = $6, 
                        all_day = $7, 
                        location = $8, 
                        url = $9, 
                        notes = $10, 
                        reminders = $11, 
                        rrule = $12
                    WHERE id = $13`;
    
                await this.dbService.db.none(query, [c.dentistId, c.serviceDefinitionId, c.patientId, c.status, c.startDate, c.endDate, c.allDay, c.location, c.url, c.notes, c.reminders, c.rrule, c.id]);
    
                const hQuery = `
                    INSERT INTO calendar_event_history (calendar_event_id, dentist_id, service_definition_id, patient_id, status, start_date, end_date, all_day, location, url, notes, reminders, rrule, created_on) 
                    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)`;

                await this.dbService.db.none(hQuery, [c.id, c.dentistId, c.serviceDefinitionId, c.patientId, c.status, c.startDate, c.endDate, c.allDay, c.location, c.url, c.notes, c.reminders, c.rrule, new Date()]);

                this.calendarSubject.next(c);
            } catch (e) {
                this.logger.error(e.message, new Error(e).stack)
                throw e;
            }
        });
    }

    /**
     *
     */
    async getFreeSlotForDentist(dentistId: number, timing: number, fromDate: string, toDate: string): Promise<Array<Date>> {
        try {
            const events: Array<any> = await this.getCalendarEventsForDentist(dentistId, 'VALIDATED, REQUESTED', fromDate, toDate);
            let calendar = await this.getCalendarForDentist(dentistId);

            events.forEach(e => {
                calendar = calendar.filter(c => !c.isBetween(moment(e.start_date).add(-timing, 'minutes'), moment(e.end_date)))
            });

            return calendar.map(c => c.toDate());
        } catch (e) {
            this.logger.error(e.message, new Error(e).stack)
            throw e;
        }
    }

    /**
     *
     */
    async getCalendarForDentist(dentistId: number): Promise<any> {
        try {

            // const query = `
            //     SELECT x::timestamp as date
            //     FROM generate_series(current_date , current_date + 1 , interval  '15 min') t(x)
            //     where extract(dow from x) in (1, 2, 3, 4, 5)
            //     and x > current_timestamp + interval '15 min' `;
            // return await this.dbService.db.manyOrNone(query);

            const query = `
                SELECT x::timestamp as date
                FROM generate_series(current_date , current_date + 2 , interval  '15 min') t(x)
                where x > current_timestamp + interval '15 min' `;

            let calendar = await this.dbService.db.manyOrNone(query);

            const timetable: Array<any> = await this.dentistSvc.findTimetableForDentist(dentistId);
            for (let i = 1; i <= 7; i++) {
                const idx = timetable.findIndex(tt => tt.day === i);
                if (idx === -1) {
                    timetable.push({
                        dentist_id: dentistId,
                        day: i,
                        from_hour: 8,
                        from_minute: 0,
                        to_hour: 18,
                        to_minute: 0
                    })
                }
            }

            let result: Array<moment.Moment> = new Array<moment.Moment>();

            for (let i = 1; i <= 7; i++) {
                const tt = timetable.filter(t => t.day === i);
                const calendarDay: Array<moment.Moment> = calendar.map(c => moment(c['date'])).filter(c => c.isoWeekday() === i)

                for (const t of tt) {
                    const r = calendarDay.filter(c => c.isSameOrAfter(moment(c).hour(t.from_hour).minute(t.from_minute)) && c.isBefore(moment(c).hour(t.to_hour).minute(t.to_minute)))
                    result = result.concat(r);
                }
            }
            return result;

        } catch (e) {
            this.logger.error(e.message, new Error(e).stack)
            throw e;
        }

    }
}
