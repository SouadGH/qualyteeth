import { Component } from '@angular/core';

@Component({
  selector: 'app-calendar-event-info',
  templateUrl: './calendar-event-info.component.html',
  styleUrls: ['./calendar-event-info.component.scss'],
})
export class CalendarEventInfoComponent {

  // calendarEvent: CalendarEvent;
  // patient: Patient;
  // dentist: Dentist;
  // service: ServiceDefinition;

  // /**
  //  *
  //  */
  // constructor(
  //   private navParams: NavParams,
  //   private patientSvc: PatientService,
  //   private dentistSvc: PractitionerService,
  //   private servicingSvc: ServicingService,
  //   private calendarSvc: CalendarService,
  //   private popoverCtrl: PopoverController,
  //   private alertCtrl: AlertController,
  //   private modalCtrl: ModalController,
  //   private toastCtrl: ToastController,
  // ) {
  //   // const lang = this.getLang();
  //   // console.log(lang)
  //   // console.log(new Intl.Locale(lang))
  // }

  // /**
  //  *
  //  */
  // async ionViewWillEnter(): Promise<void> {
  //   const c = this.navParams.get('event');
  //   this.calendarEvent = await this.calendarSvc.getCalendarEvent(c.id);
  //   console.log(this.calendarEvent)
  //   this.patient = await this.patientSvc.getPatient(this.calendarEvent.patientId);
  //   this.service = await this.servicingSvc.getDefinition(this.calendarEvent.serviceDefinitionId);
  //   this.dentist = await this.dentistSvc.getDentist(this.calendarEvent.dentistId);
  // }

  // /**
  //  *
  //  */
  // ngOnInit() { }

  // /**
  //  *
  //  */
  // getDateStr(): string {
  //   return moment(this.calendarEvent.startDate).locale('fr-CH').format('dddd, DD MMM YYYY');
  // }

  // /**
  //  *
  //  */
  // getTimeStr(): string {
  //   return `${moment(this.calendarEvent.startDate).locale('fr-CH').format('HH:mm')} - ${moment(this.calendarEvent.endDate).locale('fr-CH').format('HH:mm')}`;
  // }

  // /**
  //  *
  //  */
  // getDurationStr(): string {
  //   return moment.duration(moment(this.calendarEvent.endDate).diff(moment(this.calendarEvent.startDate))).asMinutes().toLocaleString() + '\'';
  // }

  // /**
  //  *
  //  */
  // // getLang(): string {
  // //   if (navigator.languages != undefined)
  // //     return navigator.languages[0];
  // //   else
  // //     return navigator.language;
  // // }

  // /**
  //  *
  //  */
  // async edit(): Promise<void> {
  //   await this.popoverCtrl.dismiss();
  //   const modal = await this.modalCtrl.create({
  //     component: AddCalendarPage,
  //     componentProps: {
  //       'patients': [],
  //       'event': this.calendarEvent,
  //     }
  //   });
  //   await modal.present();
  // }

  // /**
  //  *
  //  */
  // async validate(): Promise<void> {
  //   const alert = await this.alertCtrl.create({
  //     header: 'Valider Rendez-Vous',
  //     message: `Etes-vous sûr de vouloir valider ce rendez-vous?`,
  //     buttons: [
  //       { text: 'Non' },
  //       {
  //         text: 'Oui', handler: async () => {
  //           this.calendarEvent.status = 'VALIDATED';
  //           await this.calendarSvc.update(this.calendarEvent);

  //          const toast = await this.toastCtrl.create({
  //             message: 'Rendez-vous validé!',
  //             duration: 2000
  //           });
  //           await toast.present();
  //         }
  //       }
  //     ]
  //   });
  //   await alert.present();
  // }

  // /**
  //  *
  //  */
  // async reject(): Promise<void> {
  //   const alert = await this.alertCtrl.create({
  //     header: 'Rejeter Rendez-Vous',
  //     message: `Etes-vous sûr de vouloir rejeter ce rendez-vous?`,
  //     inputs: [{
  //       name: 'reason',
  //       id: 'reason',
  //       type: 'textarea',
  //       placeholder: 'Raison'
  //     }],
  //     buttons: [
  //       { text: 'Non' },
  //       {
  //         text: 'Oui', handler: async (data) => {
  //           this.calendarEvent.status = 'REJECTED';
  //           this.calendarEvent.notes = data['reason'];
  //           await this.calendarSvc.update(this.calendarEvent);

  //          const toast = await this.toastCtrl.create({
  //             message: 'Rendez-vous rejeté!',
  //             duration: 2000
  //           });
  //           await toast.present();
  //         }
  //       }
  //     ]
  //   });
  //   await alert.present();
  // }

  // /**
  //  *
  //  */
  // async delete(): Promise<void> {
  //   const alert = await this.alertCtrl.create({
  //     header: 'Supprimer Rendez-Vous',
  //     message: `Etes-vous sûr de vouloir supprimer ce rendez-vous?`,
  //     inputs: [{
  //       name: 'reason',
  //       id: 'reason',
  //       type: 'textarea',
  //       placeholder: 'Raison'
  //     }],
  //     buttons: [
  //       { text: 'Non' },
  //       {
  //         text: 'Oui', handler: async (data) => {
  //           this.calendarEvent.status = 'CANCELLED';
  //           this.calendarEvent.notes = data['reason'];
  //           // await this.calendarSvc.update(this.calendarEvent);

  //          const toast = await this.toastCtrl.create({
  //             message: 'Rendez-vous supprimé!',
  //             duration: 2000
  //           });
  //           await toast.present();
  //           await this.popoverCtrl.dismiss();
  //         }
  //       }
  //     ]
  //   });
  //   await alert.present();
  // }

  // /**
  //  *
  //  */
  // async close(): Promise<void> {
  //   await this.popoverCtrl.dismiss();
  // }

}
