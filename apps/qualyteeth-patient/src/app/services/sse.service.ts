import { Injectable, NgZone } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { API_ENDPOINT } from 'apps/qualyteeth-patient/src/environments/environment';
import { CalendarEvent } from 'libs/shared/src/lib/calendar.interface';
import { Dentist } from 'libs/shared/src/lib/dentist.interface';
import { Diagnostic } from 'libs/shared/src/lib/diagnostic.interface';
import { Patient } from 'libs/shared/src/lib/patient.interface';
import { ServiceDefinition } from 'libs/shared/src/lib/service-definition.interface';
import { DentistService } from './dentist.service';
import { PatientService } from './patient.service';
import { ServicingService } from './servicing.service';
import { Treatment } from 'libs/shared/src/lib/treatment.interface';

@Injectable({
  providedIn: 'root'
})
export class SseService {

  public calendarSubject: Subject<CalendarEvent> = new Subject<CalendarEvent>();
  public diagnosticSubject: Subject<Diagnostic> = new Subject<Diagnostic>();
  public treatmentSubject: Subject<Treatment> = new Subject<Treatment>();

  /**
   *
   */
  constructor(
    private _zone: NgZone,
    private patientSvc: PatientService,
    private dentistSvc: DentistService,
    private servicingSvc: ServicingService) { }

  /**
   *
   */
  getCalendarSseEvent(patientId: number): Observable<any> {
    return new Observable(observer => {

      const eventSource = new EventSource(`${API_ENDPOINT}/calendar/sse/patient/${patientId}`);
      eventSource.addEventListener('calendarEvent', (e: MessageEvent) => {
        this._zone.run(async () => {

          const calendarEvent: CalendarEvent = JSON.parse(e.data);

          // only consider validated or rejected calendar events
          if (['VALIDATED', 'REJECTED'].indexOf(calendarEvent.status) === -1) {
            return;
          }

          const dentist: Dentist = await this.dentistSvc.getDentist(calendarEvent.dentistId);
          const service: ServiceDefinition = await this.servicingSvc.getDefinition(calendarEvent.serviceDefinitionId);

          const title = calendarEvent.status === 'VALIDATED' ? 'Rendez-vous accepté!': 'Rendez-vous rejeté!'
          const message = `Service: ${service.name}\nDentiste: ${dentist.firstname} ${dentist.lastname}`;

          // if (window.Notification) {
          //   let notification: Notification;
          //   if (Notification.permission === 'granted') {
          //     notification = new Notification(title, { body: message });
          //   }
          //   else if (Notification.permission !== 'denied') {
          //     const permission: NotificationPermission = await Notification.requestPermission();
          //     if (permission === 'granted') {
          //       notification = new Notification(title, { body: message });
          //     }
          //   }
          //   if (notification != null) {
          //     this.calendarSubjects.next(calendarEvent);
          //     // notification.onclick = (e) => {
          //     //   e.preventDefault(); // prevent the browser from focusing the Notification's tab
          //     //   window.open('http://localhost:8101/calendar', '_blank');
          //     // }
          //   }
          // }
          await this.notify(title, message);
          this.calendarSubject.next(calendarEvent);

          // observer.next(e);
        });
      })

      // eventSource.addEventListener('message', (e) => {
      //   this._zone.run(() => {
      //     console.log(e);
      //     observer.next(e);
      //   });
      // })

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
   getDiagnosticSseEvent(patientId: number): Observable<any> {

    return new Observable(observer => {
      const eventSource = new EventSource(`${API_ENDPOINT}/diagnostic/sse/patient/${patientId}`);

      eventSource.onerror = (error: any) => {
          if (error.readyState == EventSource.CLOSED) {
            console.log('[Diagnostic server] Connection was closed')
          }
          observer.error(error);
      }

      eventSource.addEventListener('diagnostic', (e: MessageEvent) => {
        this._zone.run(async () => {

          const diagnostic: any = JSON.parse(e.data);
          const dentist: Dentist = await this.dentistSvc.getDentist(diagnostic.dentistId);
          await this.notify('Qualyteeth', `Nouveau diagnostic par ${dentist.firstname} ${dentist.lastname}: ${diagnostic.name}`);

          this.diagnosticSubject.next(diagnostic);
        });
      });
    });
  }

  /**
   *
   */
   getTreatmentSseEvent(patientId: number): Observable<any> {

    return new Observable(observer => {
      const eventSource = new EventSource(`${API_ENDPOINT}/treatment/sse/patient/${patientId}`);

      eventSource.onerror = (error: any) => {
          if (error.readyState == EventSource.CLOSED) {
            console.log('[Treatment server] Connection was closed')
          }
          observer.error(error);
      }

      eventSource.addEventListener('treatment', (e: MessageEvent) => {
        this._zone.run(async () => {

          const treatment: any = JSON.parse(e.data);
          const dentist: Dentist = await this.dentistSvc.getDentist(treatment.dentistId);
          await this.notify('Qualyteeth', `Nouveau traitement par ${dentist.firstname} ${dentist.lastname}: ${treatment.name}`);

          this.treatmentSubject.next(treatment);
        });
      });
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
