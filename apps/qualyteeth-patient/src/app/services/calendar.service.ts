import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageService } from 'apps/qualyteeth-patient/src/app/services/storage.service';
import { API_ENDPOINT } from 'apps/qualyteeth-patient/src/environments/environment';
import { CalendarEvent } from 'libs/shared/src/lib/calendar.interface';
import * as moment from 'moment';
import { SseService } from './sse.service';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  /**
   *
   */
  constructor(
    private storageSvc: StorageService,
    private httpClient: HttpClient,
    private sseService: SseService
  ) {
    this.storageSvc.get('accessTokenQD')
      .then(async (accessToken) => {
        const userId = await this.storageSvc.getUserid(accessToken);
        this.sseService.getCalendarSseEvent(userId).subscribe(data => { console.log(data) });
      })
  }

  /**
   *
   */
  public async getCalendarEventsForPatient(patientId?: number): Promise<Array<CalendarEvent>> {
    const accessToken = await this.storageSvc.get('accessTokenQP');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    })

    if (patientId == null) {
      patientId = await this.storageSvc.get('useridQP');
    }

    return await this.httpClient.get<Array<CalendarEvent>>(`${API_ENDPOINT}/calendar/patient/${patientId}`, { headers: headers }).toPromise();

  }

  /**
   *
   */
  public async getFreeSlotForDentist(dentistId: number, timing: number, fromDate?: string, toDate?: string): Promise<Array<any>> {
    const accessToken = await this.storageSvc.get('accessTokenQP');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    })

    if (fromDate == null) {
      fromDate = moment().format('YYYYMMDD HH:mm:ss');
    }
    if (toDate == null) {
      toDate = moment().add(1, 'day').startOf('day').format('YYYYMMDD HH:mm:ss');
    }

    return await this.httpClient.get<Array<any>>(`${API_ENDPOINT}/calendar/dentist/${dentistId}/slots/${timing}/${fromDate}/${toDate}`, { headers: headers }).toPromise();
  }

  /**
   *
   */
  public async add(calendarEvent: CalendarEvent): Promise<number> {
    const accessToken = await this.storageSvc.get('accessTokenQP');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    })

    return await this.httpClient.post<number>(`${API_ENDPOINT}/calendar/add`, { calendarEvent: calendarEvent }, { headers: headers }).toPromise();
  }

  /**
   *
   */
  public async update(calendarEvent: CalendarEvent): Promise<void> {
    const accessToken = await this.storageSvc.get('accessTokenQP');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    })

    return await this.httpClient.put<void>(`${API_ENDPOINT}/calendar/update`, { calendarEvent: calendarEvent }, { headers: headers }).toPromise();
  }

}
