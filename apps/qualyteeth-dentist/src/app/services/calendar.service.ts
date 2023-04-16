import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_ENDPOINT } from 'apps/qualyteeth-dentist/src/environments/environment';
import { CalendarEvent, CalendarStatus } from 'libs/shared/src/lib/calendar.entity';
import * as moment from 'moment'
import { SseService } from './sse.service';
import { StorageService } from './storage.service';

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
    private sseService: SseService) {

    this.storageSvc.get('accessTokenQD')
      .then(async (accessToken) => {
        const userId = await this.storageSvc.getUserid(accessToken);
        this.sseService.getCalendarSseEvent(userId).subscribe(data => { console.log(data) });
      })
  }

  /**
   *
   */
  public async add(calendarEvent: CalendarEvent): Promise<number> {
    const accessToken = await this.storageSvc.get('accessTokenQD');

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
    const accessToken = await this.storageSvc.get('accessTokenQD');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    })

    return await this.httpClient.put<void>(`${API_ENDPOINT}/calendar/update`, { calendarEvent: calendarEvent }, { headers: headers }).toPromise();
  }

  /**
   *
   */
  public async getCalendarEvent(id: number): Promise<CalendarEvent> {
    const accessToken = await this.storageSvc.get('accessTokenQD');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    })

    return await this.httpClient.get<CalendarEvent>(`${API_ENDPOINT}/calendar/${id}`, { headers: headers }).toPromise();
  }

  /**
   *
   */
  public async getCalendarEventsForDentist(dentistId?: number, status?: Array<CalendarStatus>): Promise<Array<CalendarEvent>> {
    const accessToken = await this.storageSvc.get('accessTokenQD');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    })

    if (dentistId == null) {
      dentistId = await this.storageSvc.getUserid(accessToken);
    }

    return await this.httpClient.get<Array<CalendarEvent>>(`${API_ENDPOINT}/calendar/dentist/${dentistId}/${status}`, { headers: headers }).toPromise();
  }

  /**
   *
   */
  public async getCalendarEventsForSurgery(surgeryId: number, status?: Array<CalendarStatus>): Promise<Array<CalendarEvent>> {
    const accessToken = await this.storageSvc.get('accessTokenQD');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    })

    return await this.httpClient.get<Array<CalendarEvent>>(`${API_ENDPOINT}/calendar/surgery/${surgeryId}/${status}`, { headers: headers }).toPromise();
  }

  /**
   *
   */
  public async getFreeSlotForDentist(timing: number, dentistId?: number, fromDate?: string, toDate?: string): Promise<Array<any>> {
    const accessToken = await this.storageSvc.get('accessTokenQD');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    })

    if (dentistId == null) {
      dentistId = await this.storageSvc.getUserid(accessToken);
    }
    if (fromDate == null) {
      fromDate = moment().format('YYYYMMDD HH:mm:ss');
    }
    if (toDate == null) {
      toDate = moment().add(1, 'day').startOf('day').format('YYYYMMDD HH:mm:ss');
    }

    return await this.httpClient.get<Array<any>>(`${API_ENDPOINT}/calendar/dentist/${dentistId}/slots/${timing}/${fromDate}/${toDate}`, { headers: headers }).toPromise();
  }
  

  // /**
  //  *
  //  */
  // public async getCalendarEventsForSurgeryAndPatient(surgeryId: number, patientId: number): Promise<Array<CalendarEvent>> {
  //   const accessToken = await this.storageSvc.get('accessTokenQD');

  //   const headers = new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     'Authorization': `Bearer ${accessToken}`
  //   })

  //   return await this.httpClient.get<Array<CalendarEvent>>(`${API_ENDPOINT}/calendar/surgery/${surgeryId}/patient/${patientId}`, { headers: headers }).toPromise();
  // }

  /**
   *
   */
   public async getCalendarEventsForPatient(patientId: number): Promise<Array<CalendarEvent>> {
    const accessToken = await this.storageSvc.get('accessTokenQD');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    })

    return await this.httpClient.get<Array<CalendarEvent>>(`${API_ENDPOINT}/calendar/patient/${patientId}`, { headers: headers }).toPromise();
  }
}
