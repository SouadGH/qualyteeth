import { Injectable, NgZone } from '@angular/core';
import { API_ENDPOINT } from 'apps/qualyteeth-dentist/src/environments/environment';
import { CalendarEvent } from 'libs/shared/src/lib/calendar.entity';
import { Observable, Subject } from 'rxjs';
import { PatientService } from './patient.service';
import { ServicingService } from './servicing.service';

@Injectable({
  providedIn: 'root'
})
export class SseService {

  public calendarSubject: Subject<CalendarEvent> = new Subject<CalendarEvent>();

  /**
   *
   */
  constructor(
    private _zone: NgZone,
    private patientSvc: PatientService,
    private servicingSvc: ServicingService) { }

  /**
   *
   */
  getQRCodeSSeEvent(channel: string): Observable<any> {
    return new Observable(observer => {
      const eventSource = new EventSource(`${API_ENDPOINT}/auth/qr/sse/${channel}`);

      // eventSource.onopen = (e) => {
      //   // this._zone.run(() => {
      //     console.log('[QR server] Connection has been established')
      //   // });
      // }

      eventSource.onerror = (error: any) => {
        // this._zone.run(() => {
          if (error.readyState == EventSource.CLOSED) {
            console.log('[QR server] Connection was closed')
          }
          observer.error(error);
        // });
      }

      // eventSource.onmessage = ({ data }) => {
      //   // this._zone.run(async () => {
      //     console.table(data)
      //   // });
      // }

      eventSource.addEventListener('channel', (e: MessageEvent) => {
        this._zone.run(async () => {
          const data = JSON.parse(e.data)
          observer.next(data);
          observer.complete();
        });
      });
    });
  }

  /**
   *
   */
  getCalendarSseEvent(dentistId: number): Observable<any> {
    return new Observable(observer => {

      const eventSource = new EventSource(`${API_ENDPOINT}/calendar/sse/dentist/${dentistId}`);
      eventSource.addEventListener('calendarEvent', (e: MessageEvent) => {

        this._zone.run(async () => {

          const calendarEvent: CalendarEvent = JSON.parse(e.data);
          // if (calendarEvent.status !== 'REQUESTED') {
          //   return;
          // }

          const patient = await this.patientSvc.getPatient(calendarEvent.patientId);

          const message = `Nouvelle demande de rendez-vous\nPatient: ${patient.userData.firstname} ${patient.userData.lastname}`;
          await this.notify('Qualyteeth', message);

          this.calendarSubject.next(calendarEvent);

          // const patient: Patient = await this.patientSvc.getPatient(calendarEvent.patientId);
          // const service: Service = await this.servicingSvc.getService(calendarEvent.serviceId);

          // const message = `Patient: ${patient.firstname} ${patient.lastname}\nService: ${service.name}`;

          // if (window.Notification) {
          //   let notification: Notification;
          //   if (Notification.permission === 'granted') {
          //     notification = new Notification('Nouvelle requête de rendez-vous!', { body: message });
          //   }
          //   else if (Notification.permission !== 'denied') {
          //     const permission: NotificationPermission = await Notification.requestPermission();
          //     if (permission === 'granted') {
          //       notification = new Notification('Nouvelle requête de rendez-vous!', { body: message });
          //     }
          //   }
          //   if (notification != null) {
          //     this.calendarRequests.next(calendarEvent);
          //     notification.onclick = (e) => {
          //       e.preventDefault(); // prevent the browser from focusing the Notification's tab
          //       window.open('http://localhost:8101/calendar', '_blank');
          //     }
          //   }
          // }
        });
      })

      eventSource.onerror = (error: any) => {
        this._zone.run(() => {
          if (error.readyState == EventSource.CLOSED) {
            console.log('Connection was closed')
          }
          observer.error(error);
        });
      };
    });
  }

  /**
   *
   */
   private async notify(title: string, message: string): Promise<void> {

    if (window.Notification) {
      let notification: Notification;
      if (Notification.permission === 'granted') {
        notification = new Notification(title, { body: message });
      }
      else if (Notification.permission !== 'denied') {
        const permission: NotificationPermission = await Notification.requestPermission();
        if (permission === 'granted') {
          notification = new Notification(title, { body: message });
        }
      }
    }

  }

}
