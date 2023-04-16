import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController, PopoverController } from '@ionic/angular';
import { ToolbarMenuComponent } from 'apps/qualyteeth-patient/src/app/components/toolbar-menu/toolbar-menu.component';
import { Surgery } from 'libs/shared/src/lib/surgery.entity';
import { CalendarService } from 'apps/qualyteeth-patient/src/app/services/calendar.service';
import { SurgeryService } from 'apps/qualyteeth-patient/src/app/services/surgery.service';
import { AddCalendarPage } from './add-calendar/add-calendar.page';
import * as moment from 'moment';
import { CalendarEvent } from 'libs/shared/src/lib/calendar.entity';
import { SseService } from 'apps/qualyteeth-patient/src/app/services/sse.service';
import { MatSelectChange } from '@angular/material/select';
import { CalendarEventPage } from './calendar-event/calendar-event.page';
import { DentistService } from '../../services/dentist.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.page.html',
  styleUrls: ['./calendar.page.scss'],
})
export class CalendarPage implements OnInit {

  calendars: Array<any>;
  oldCalendars: Array<any>;

  filter: string = 'all';
  sort: string = 'meetingDate';

  /**
   *
   */
  constructor(
    private calendarSvc: CalendarService,
    private modalCtrl: ModalController,
    // private surgerySvc: SurgeryService,
    private dentistSvc: DentistService,
    private popoverCtrl: PopoverController,
    private alertCtrl: AlertController,
    private sseService: SseService,
  ) { }

  /**
   *
   */
  ngOnInit() { }

  /**
   *
   */
  async ionViewWillEnter(): Promise<void> {
    await this.initCalendars();

    this.sseService.calendarSubject.subscribe(async (calendarEvent: CalendarEvent) => { await this.initCalendars(); })
  }

  /**
   *
   */
  async initCalendars(): Promise<void> {
    // const surgeries: Array<Surgery> = await this.surgerySvc.getSurgeriesForPatient()
    this.calendars = await this.calendarSvc.getCalendarEventsForPatient();
    // this.calendars = this.calendars.filter(c => c.status != 'DELETED')
    this.oldCalendars = this.calendars.filter(c => moment(c.startDate).isBefore(moment()) && c.status === 'VALIDATED');
    this.calendars = this.calendars.filter(c => moment(c.startDate).isSameOrAfter(moment()));
    this.calendars = this.calendars.sort((a, b) => moment(a.startDate).valueOf() - moment(b.startDate).valueOf());

    if (this.filter === 'accepted') {
      this.calendars = this.calendars.filter(c => c.status === 'VALIDATED');
    } else if (this.filter === 'rejected') {
      this.calendars = this.calendars.filter(c => c.status === 'REJECTED');
    } else if (this.filter === 'requested') {
      this.calendars = this.calendars.filter(c => c.status === 'REQUESTED');
    } else if (this.filter === 'deleted') {
      this.calendars = this.calendars.filter(c => c.status === 'CANCELLED');
    }

    if (this.sort === 'meetingDate') {
      this.calendars = this.calendars.sort((a: CalendarEvent, b: CalendarEvent) => moment(a.startDate).valueOf() - moment(b.startDate).valueOf());
    } else if (this.sort === 'creationDate') {
      this.calendars = this.calendars.sort((a: CalendarEvent, b: CalendarEvent) => moment(a.createdOn).valueOf() - moment(b.createdOn).valueOf());
    }
  }

  /**
   *
   */
  async onFilterChanged(e: MatSelectChange): Promise<void> {
    this.initCalendars();
  }

  /**
   *
   */
  async onSortChanged(e: MatSelectChange): Promise<void> {
    this.initCalendars();
  }

  /**
   *
   */
  async pop(ev: any): Promise<void> {
    const popover = await this.popoverCtrl.create({
      component: ToolbarMenuComponent,
      event: ev,
      translucent: true
    });
    return await popover.present();
  }

  /**
   *
   */
  async add(): Promise<void> {

    // const surgeries = await this.surgerySvc.getSurgeriesForPatient();
    // if (surgeries.length === 0) {
    //   const alert = await this.alertCtrl.create({
    //     header: 'Attention',
    //     message: 'Veuillez vous connecter à un cabinet avant de pouvoir demander un rendez-vous',
    //     buttons: ['OK']
    //   });
    //   await alert.present();
    //   return;
    // }

    const dentists = await this.dentistSvc.findConnectedDentists();
    if (dentists.length === 0) {
      const alert = await this.alertCtrl.create({
        header: 'Attention',
        message: 'Veuillez vous connecter à un dentiste avant de pouvoir demander un rendez-vous',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }

    const modal = await this.modalCtrl.create({
      component: AddCalendarPage,
      componentProps: {
        'dentists': dentists,
      }
    });
    modal.onDidDismiss().then(async () => {
      await this.initCalendars();
    })
    await modal.present();
  }

  /**
   *
   */
  getCalendarStatusStr(c: CalendarEvent): string {
    switch (c.status) {
      case 'VALIDATED':
        return 'Validé';
      case 'REJECTED':
        return 'Rejeté';
      case 'REQUESTED':
        return 'En attente de validation';
      case 'CANCELLED':
        return 'Supprimé';
      default:
        return ''
    }
  }

  /**
   *
   */
  async details(c: CalendarEvent): Promise<void> {
    console.log(c)

    const modal = await this.modalCtrl.create({
      component: CalendarEventPage,
      componentProps: {
        'event': c,
      }
    });
    modal.onDidDismiss().then(async () => {
      await this.initCalendars();
    })
    await modal.present();
  }

}
