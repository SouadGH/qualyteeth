import { Component, OnInit } from '@angular/core';
import { AlertController, PopoverController, ToastController } from '@ionic/angular';
import { CalendarService } from 'apps/qualyteeth-dentist/src/app/services/calendar.service';
import { PatientService } from 'apps/qualyteeth-dentist/src/app/services/patient.service';
import { ServicingService } from 'apps/qualyteeth-dentist/src/app/services/servicing.service';
import { SseService } from 'apps/qualyteeth-dentist/src/app/services/sse.service';
import { SurgeryService } from 'apps/qualyteeth-dentist/src/app/services/surgery.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {

  // surgeries: Array<Surgery>;
  activeSurgery: any;

  requestsDisplayedColumns: string[] = ['startDate', 'patient', 'service', 'action'];
  requestsCalendarEvents: Array<any>;

  cancelledDisplayedColumns: string[] = ['startDate', 'patient', 'service', 'notes', 'history'];
  cancelledCalendarEvents: Array<any>;

  missedDisplayedColumns: string[] = ['startDate', 'patient', 'service', 'notes', 'history'];
  missedCalendarEvents: Array<any>;

  constructor(
    private surgerySvc: SurgeryService,
    private calendarSvc: CalendarService,
    private servicingSvc: ServicingService,
    private patientSvc: PatientService,
    private popoverCtrl: PopoverController,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private sseSvc: SseService,
  ) { }

  /**
   *
   */
  ngOnInit() {
    // this.sseSvc.calendarSubject.subscribe(
    //   async (calendarEvent: CalendarEvent) => {
    //     // if (calendarEvent.status === 'REQUESTED' || calendarEvent.status === 'CANCELLED' || calendarEvent.status === 'REJECTED') {
    //       await this.initEvents();
    //     // }
    //   })
  }

  /**
   *
   */
   async ionViewWillEnter(): Promise<void> {
    // this.surgeries = await this.surgerySvc.getSurgeriesForDentist();
    // this.activeSurgery = this.surgeries.find(s => s.active);
    if (this.activeSurgery == null) {
      this.activeSurgery = ''
    }
    await this.initEvents();
  }

  /**
   *
   */
  async initEvents(): Promise<void> {

    // if (this.activeSurgery == null || this.activeSurgery === '') {
    //   this.requestsCalendarEvents = await this.calendarSvc.getCalendarEventsForDentist(null, ['REQUESTED']);
    //   this.cancelledCalendarEvents = await this.calendarSvc.getCalendarEventsForDentist(null, ['CANCELLED']);
    //   this.missedCalendarEvents = await this.calendarSvc.getCalendarEventsForDentist(null, ['MISSED']);
    // } else {
    //   this.requestsCalendarEvents = await this.calendarSvc.getCalendarEventsForSurgery(this.activeSurgery.id, ['REQUESTED']);
    //   this.cancelledCalendarEvents = await this.calendarSvc.getCalendarEventsForSurgery(this.activeSurgery.id, ['CANCELLED']);
    //   this.missedCalendarEvents = await this.calendarSvc.getCalendarEventsForSurgery(this.activeSurgery.id, ['MISSED']);
    // }

    // console.log('requestsCalendarEvents', this.requestsCalendarEvents);
    // console.log('cancelledCalendarEvents', this.cancelledCalendarEvents);
    // console.log('missedCalendarEvents', this.requestsCalendarEvents);

    // this.requestsCalendarEvents.forEach(async c => {
    //   c.patient = await this.patientSvc.getPatient(c.patientId);
    //   c.service = await this.servicingSvc.getDefinition(c.serviceDefinitionId);
    // })
    
    // this.cancelledCalendarEvents.forEach(async c => {
    //   c.patient = await this.patientSvc.getPatient(c.patientId);
    //   c.service = await this.servicingSvc.getDefinition(c.serviceDefinitionId);
    // })

    // this.missedCalendarEvents.forEach(async c => {
    //   c.patient = await this.patientSvc.getPatient(c.patientId);
    //   c.service = await this.servicingSvc.getDefinition(c.serviceDefinitionId);
    // })
  }

  /**
   *
   */
  async action(ev: any, calendarEvent: any): Promise<void> {
    const popover = await this.popoverCtrl.create({
      component: RequestPageActionsComponent,
      event: ev,
      translucent: true
    });
    await popover.present();
    popover.onDidDismiss().then(async r => {
      if (r.data != null) {
        if (r.data === 'accept') {
          await this.validate(calendarEvent);
        }
        else if (r.data === 'reject') {
          await this.reject(calendarEvent);
        }
      }
    })
  }

  /**
   *
   */
  private async validate(calendarEvent: any): Promise<void> {
    const alert = await this.alertCtrl.create({
      header: 'Valider Rendez-Vous',
      message: `Etes-vous sûr de vouloir valider ce rendez-vous?`,
      buttons: [
        { text: 'Non' },
        {
          text: 'Oui', handler: async () => {
            calendarEvent.status = 'VALIDATED';
            // await this.calendarSvc.update(calendarEvent);

            const toast = await this.toastCtrl.create({
              message: 'Rendez-vous validé!',
              duration: 2000
            });
            await toast.present();
            await this.initEvents();
          }
        }
      ]
    });
    await alert.present();
  }

  /**
   *
   */
  async reject(calendarEvent: any): Promise<void> {
    const alert = await this.alertCtrl.create({
      header: 'Rejeter Rendez-Vous',
      message: `Etes-vous sûr de vouloir rejeter ce rendez-vous?`,
      inputs: [{
        name: 'reason',
        id: 'reason',
        type: 'textarea',
        placeholder: 'Raison'
      }],
      buttons: [
        { text: 'Non' },
        {
          text: 'Oui', handler: async (data) => {
            calendarEvent.status = 'REJECTED';
            calendarEvent.notes = data['reason'];
            // await this.calendarSvc.update(calendarEvent);

            const toast = await this.toastCtrl.create({
              message: 'Rendez-vous rejeté!',
              duration: 2000
            });
            await toast.present();
            await this.initEvents();
          }
        }
      ]
    });
    await alert.present();
  }

  /**
   *
   */
  async history(element: any) {
    console.log(element)
  }

}

@Component({
  template: `
  <ion-list lines="none">
    <ion-item button (click)="popoverCtrl.dismiss('accept')">
      <ion-icon name="checkmark-circle-outline" slot="start" color="success"></ion-icon>
      <ion-label>Accepter</ion-label>
    </ion-item>
    <ion-item button (click)="popoverCtrl.dismiss('reject')">
      <ion-icon name="close-circle-outline" slot="start" color="danger"></ion-icon>
      <ion-label>Rejeter</ion-label>
    </ion-item>
  </ion-list>
  `,
  styleUrls: ['./details.page.scss'],
})
export class RequestPageActionsComponent {

  /**
   *
   */
  constructor(
    public popoverCtrl: PopoverController,
  ) { }

}
