import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController, NavParams } from '@ionic/angular';
import { CalendarEvent } from 'libs/shared/src/lib/calendar.entity';
import * as moment from 'moment';
import { ServiceDefinition } from 'libs/shared/src/lib/service-definition.entity';
import { Dentist } from 'libs/shared/src/lib/dentist.entity';
import { ServicingService } from 'apps/qualyteeth-patient/src/app/services/servicing.service';
import { PractitionerService } from 'apps/qualyteeth-patient/src/app/services/practitioner.service';
import { CalendarService } from 'apps/qualyteeth-patient/src/app/services/calendar.service';
import { DateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-calendar-event',
  templateUrl: './calendar-event.page.html',
  styleUrls: ['./calendar-event.page.scss'],
})
export class CalendarEventPage implements OnInit {

  calendarEvent: CalendarEvent
  dentist: Dentist;
  service: ServiceDefinition;

  /**
   *
   */
  constructor(
    private modalCtrl: ModalController,
    private navParams: NavParams,
    private dentistSvc: PractitionerService,
    private servicingSvc: ServicingService,
    private calendarSvc: CalendarService,
    private alertCtrl: AlertController,
    private adapter: DateAdapter<any>,
  ) { 
    this.adapter.setLocale('fr-CH');
  }

  /**
   *
   */
  ngOnInit() { }

  /**
   *
   */
  async ionViewWillEnter(): Promise<void> {
    this.calendarEvent = this.navParams.get('event');
    this.service = await this.servicingSvc.getDefinition(this.calendarEvent.serviceDefinitionId);
    this.dentist = await this.dentistSvc.getDentist(this.calendarEvent.dentistId);
  }

  /**
   *
   */
  getDateStr(): string {
    return moment(this.calendarEvent.startDate).locale('fr-CH').format('dddd, DD MMM YYYY');
  }

  /**
   *
   */
  getTimeStr(): string {
    return `${moment(this.calendarEvent.startDate).locale('fr-CH').format('HH:mm')} - ${moment(this.calendarEvent.endDate).locale('fr-CH').format('HH:mm')}`;
  }

  /**
   *
   */
  getDurationStr(): string {
    return moment.duration(moment(this.calendarEvent.endDate).diff(moment(this.calendarEvent.startDate))).asMinutes().toLocaleString() + '\'';
  }

  /**
   *
   */
  getStatusStr(): string {
    switch (this.calendarEvent.status) {
      case 'REJECTED':
        return 'Rejeté';
      case 'REQUESTED':
        return 'En attente de validation';
      case 'VALIDATED':
        return 'Validé';
      case 'CANCELLED':
        return 'Annulé';
      default:
        return '';
    }
  }

  /**
   *
   */
  async close(): Promise<void> {
    await this.modalCtrl.dismiss();
  }

  /**
   *
   */
  async cancelRequest(): Promise<void> {
    const alert = await this.alertCtrl.create({
      header: 'Annuler requête',
      message: `Voulez-vous vraiment annuler cette requête de rendez-vous?`,
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
            this.calendarEvent.status = 'CANCELLED';
            this.calendarEvent.notes = data['reason'];
            await this.calendarSvc.update(this.calendarEvent);
          }
        }
      ]
    });
    await alert.present();
    // alert.onDidDismiss().then(async () => await this.modalCtrl.dismiss());
  }

  /**
   *
   */
  async cancelMeeting(): Promise<void> {
    const alert = await this.alertCtrl.create({
      header: 'Annuler rendez-vous',
      message: `Voulez-vous vraiment annuler ce rendez-vous?`,
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
            this.calendarEvent.status = 'CANCELLED';
            this.calendarEvent.notes = data['reason'];
            await this.calendarSvc.update(this.calendarEvent);
          }
        }
      ]
    });
    await alert.present();
    // alert.onDidDismiss().then(async () => await this.modalCtrl.dismiss());
  }
}