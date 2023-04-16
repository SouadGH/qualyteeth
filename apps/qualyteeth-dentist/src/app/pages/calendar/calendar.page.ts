import { Component, OnInit, ViewChild } from '@angular/core';
import { Calendar, CalendarOptions } from '@fullcalendar/core';
import frchLocale from '@fullcalendar/core/locales/fr-ch'
import * as moment from 'moment';
import { AddCalendarPage } from './add-calendar/add-calendar.page';
import { AlertController, IonContent, ModalController, NavController, PopoverController, ToastController } from '@ionic/angular';
import { CalendarEvent, FullCalendarEvent } from 'libs/shared/src/lib/calendar.entity';
import { CalendarService } from 'apps/qualyteeth-dentist/src/app/services/calendar.service';
import { Patient } from 'libs/shared/src/lib/patient.entity';
import { Surgery } from 'libs/shared/src/lib/surgery.entity';
import { SurgeryService } from 'apps/qualyteeth-dentist/src/app/services/surgery.service';
import { CalendarEventInfoComponent } from 'apps/qualyteeth-dentist/src/app/components/calendar-event-info/calendar-event-info.component';
import { SseService } from 'apps/qualyteeth-dentist/src/app/services/sse.service';
import { Dentist } from 'libs/shared/src/lib/dentist.entity';
import { DentistService } from 'apps/qualyteeth-dentist/src/app/services/dentist.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { FullCalendarComponent } from '@fullcalendar/angular';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.page.html',
  styleUrls: ['./calendar.page.scss'],
})
export class CalendarPage implements OnInit {

  @ViewChild('content', { read: IonContent, static: false }) content: IonContent;
  @ViewChild('calendar', { read: FullCalendarComponent, static: false }) calendar: FullCalendarComponent;

  calendarForm: FormGroup;

  // surgery: Surgery;

  calendarOptions: CalendarOptions;
  calendarEvents: Array<any>;

  events: Array<CalendarEvent>;
  patients: Array<Patient>;
  surgeries: Array<Surgery>;
  activeSurgery: Surgery;
  dentists: Array<Dentist>;
  selectedDentists: Array<Dentist>;

  /**
   *
   */
  constructor(
    private modalCtrl: ModalController,
    private popoverCtrl: PopoverController,
    private calendarSvc: CalendarService,
    private surgerySvc: SurgeryService,
    private dentistSvc: DentistService,
    private sseService: SseService,
    private fb: FormBuilder,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private nav: NavController
  ) {
    const name = Calendar.name;

    this.calendarForm = this.fb.group({
      dentist: [[]],
      surgery: [[]],
      meeting: [['VALIDATED', 'REQUESTED']]
    });

    this.sseService.calendarSubject.subscribe(async (calendarEvent: CalendarEvent) => { await this.initCalendars(); })
  }

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
  async initCalendars() {

    // this.surgery = await this.surgerySvc.getActiveSurgeryForDentist();
    // this.patients = await this.surgerySvc.getPatienstForSurgery(this.surgery.id);
    // this.dentists = await this.surgerySvc.getDentistsForSurgery(this.surgery.id);

    this.surgeries = await this.surgerySvc.getSurgeriesForDentist();
    this.activeSurgery = this.surgeries.find(s => s.active);
    this.calendarForm.controls['surgery'].setValue(this.activeSurgery);

    this.patients = await this.dentistSvc.getPatientsForDentist();

    if (this.activeSurgery != null) {
      this.dentists = await this.surgerySvc.getDentistsForSurgery(this.activeSurgery.id);
    } else {
      const d: Dentist = await this.dentistSvc.getDentist();

      this.dentists = new Array<Dentist>();
      this.dentists.push(d);
    }

    this.calendarForm.controls['dentist'].setValue(this.dentists);

    // const calendarResources = this.dentists.map(d => {
    //   return {
    //     id: d.id.toString(),
    //     title: `${d.firstname.charAt(0)}${d.lastname.charAt(0)}`,
    //     // businessHours: {
    //     //   startTime: '10:00',
    //     //   endTime: '12:00'
    //     // },
    //   }
    // })
    this.selectedDentists = this.dentists;

    await this.initEvents();

    this.calendarOptions = {
      // timeZone: 'UTC',
      // themeSystem: 'standard',
      initialView: 'resourceTimeGridFourDay',
      datesAboveResources: true,
      // schedulerLicenseKey: 'CC-Attribution-NonCommercial-NoDerivatives',
      views: {
        // timeGridFourDay: {
        //   type: 'timeGrid',
        //   duration: { days: 4 },
        //   buttonText: '4 jours'
        // },
        resourceTimeGridWeek: {
          type: 'resourceTimeGrid',
          duration: { days: 7 },
          buttonText: 'Semaine'
        },
        resourceTimeGridFourDay: {
          type: 'resourceTimeGrid',
          duration: { days: 4 },
          buttonText: '4 days'
        },
      },
      resources: async (fetchInfo, successCallback, failureCallback) => {
        const ressources = this.selectedDentists.map(d => {
          return {
            id: d.id.toString(),
            title: `${d.firstname.charAt(0)}${d.lastname.charAt(0)}`,
          }
        })
        successCallback(ressources);
      },
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,resourceTimeGridWeek,resourceTimeGridFourDay,resourceTimeGridDay'
      },
      dayHeaders: true,
      nowIndicator: true,
      allDayContent: 'Journée',
      allDaySlot: false,
      buttonText: {
        today: "Aujourd'hui",
        month: 'Mois',
        week: 'Semaine',
        day: 'Jour',
        list: 'Liste'
      },
      locale: frchLocale,
      scrollTime: moment().format('HH:mm:ss'),
      editable: true,
      selectable: true,
      eventClick: async (info: any) => {
        // console.log(info)
        const popover = await this.popoverCtrl.create({
          component: CalendarEventInfoComponent,
          event: info.jsEvent,
          translucent: true,
          componentProps: {
            'event': info.event,
            'events': this.events,
            'patients': this.patients,
          },
          cssClass: 'calendar-popover'
        });
        await popover.present();
        popover.onDidDismiss().then(async () => {
          await this.initEvents();
        })
        // await this.edit(event)
      },
      eventResize: async (info: any) => {
        // console.log(info)

        const alert = await this.alertCtrl.create({
          header: 'Modifier Rendez-Vous',
          message: `Etes-vous sûr de vouloir modifier ce rendez-vous?`,
          buttons: [
            {
              text: 'Non', handler: async () => {
                info.revert();
              }
            },
            {
              text: 'Oui', handler: async () => {
                const evt: CalendarEvent = this.events.find(c => c.id === parseInt(info.event.id));
                evt.startDate = info.event.start;
                evt.endDate = info.event.end;
                // evt.dentistId = info.event.resource

                await this.calendarSvc.update(evt);
                await this.initEvents();

                const toast = await this.toastCtrl.create({
                  message: 'Rendez-vous mis à jour!',
                  duration: 2000
                });
                await toast.present();
              }
            }
          ]
        });
        await alert.present();
      },
      eventDrop: async (info: any) => {
        // console.log(info)

        const alert = await this.alertCtrl.create({
          header: 'Modifier Rendez-Vous',
          message: `Etes-vous sûr de vouloir modifier ce rendez-vous?`,
          buttons: [
            {
              text: 'Non', handler: async () => {
                info.revert();
              }
            },
            {
              text: 'Oui', handler: async () => {
                const evt: CalendarEvent = this.events.find(c => c.id === parseInt(info.event.id));
                evt.startDate = info.event.start;
                evt.endDate = info.event.end;
                if (info.newResource != null) {
                  evt.dentistId = parseInt(info.newResource.id);
                }

                await this.calendarSvc.update(evt);
                await this.initEvents();

                const toast = await this.toastCtrl.create({
                  message: 'Rendez-vous mis à jour!',
                  duration: 2000
                });
                await toast.present();
              }
            }
          ]
        });
        await alert.present();
      },
      // dateClick: (info: any) => {
      //   console.log(info)
      // },
      select: async info => {
        console.log(info.resource)
        const resourceId: string = info.resource != null ? info.resource.id : null;
        await this.add(resourceId, info.start, info.end);
      },
      eventDidMount: async info => {
        if (info.event.extendedProps['background']) {
          info.el.style.background = info.event.extendedProps['background'];
        }
      },
      // eventMouseEnter: async info => {
      //   console.log(info)
      // }
      events: this.calendarEvents
    };

    this.sseService.calendarSubject.subscribe(
      async (calendarEvent: CalendarEvent) => { await this.initEvents(); }
    );

    const e: HTMLElement = await this.content.getScrollElement();
    this.calendar.getApi().setOption('contentHeight', (e.offsetHeight - 364));
  }

  /**
   *
   */
  async onDentistSelectionChanged(e: MatSelectChange): Promise<void> {
    this.selectedDentists = e.value;
    this.calendar.getApi().refetchResources();
  }

  /**
   *
   */
  async onSurgerySelectionChanged(e: MatSelectChange): Promise<void> {

    if (e.value.id != null) {
      this.activeSurgery = e.value;
      this.dentists = await this.surgerySvc.getDentistsForSurgery(e.value.id);
    } else {
      this.activeSurgery = null;
      const d: Dentist = await this.dentistSvc.getDentist();
      this.dentists = new Array<Dentist>();
      this.dentists.push(d);
    }
    this.selectedDentists = this.dentists;

    this.calendarForm.controls['dentist'].setValue(this.dentists);

    await this.initEvents();
    this.calendar.getApi().refetchResources();
  }

  /**
   *
   */
  async onMeetingSelectionChanged(e: MatSelectChange): Promise<void> {
    await this.initEvents();
  }

  /**
   *
   */
  private async initEvents(): Promise<void> {
    if (this.calendarForm.controls['meeting'].value.length === 0) {
      this.events = [];
    } else {
      if (this.activeSurgery != null) {
        this.events = await this.calendarSvc.getCalendarEventsForSurgery(this.activeSurgery.id, this.calendarForm.controls['meeting'].value);
      } else {
        this.events = await this.calendarSvc.getCalendarEventsForDentist(null, this.calendarForm.controls['meeting'].value)
        // console.log(this.events)
      }
    }

    this.calendarEvents = new Array<any>();
    for (const e of this.events) {
      const p: Patient = this.patients.find(p => p.id === e.patientId);
      const d: Dentist = this.dentists.find(d => d.id === e.dentistId);

      const color = d.color == null ? 'lightblue' : d.color;

      // if (e.status === 'REQUESTED') {
      //   extendedProps = {
      //     // 'background': `repeating-linear-gradient(-45deg, lightgrey, lightgrey 4px, ${color}, ${color} 4px, lightgrey 8px)`
      //     'backgroundColor': 'red', // this.hex2rgba(color, 0.5) 
      //   }
      //   textColor = 'black';
      // }

      let backgroundColor;
      switch (e.status) {
        case 'REQUESTED':
          backgroundColor = await this.hex2rgba(color, 0.3);
          break;
        case 'VALIDATED':
          backgroundColor = color;
          break;
        case 'CANCELLED':
          backgroundColor = '#992D2D';
          break;
        case 'REJECTED':
          backgroundColor = '#9F5817';
          break;
        default:
          backgroundColor = color;
          break;
      }

      const textColor = e.status === 'REQUESTED' ? 'black' : await this.contrastColor(backgroundColor);

      const i: FullCalendarEvent = {
        id: e.id,
        resourceId: d.id.toString(),
        start: moment(e.startDate).utc().toDate(),
        end: moment(e.endDate).utc().toDate(),
        title: `${p.firstname} ${p.lastname}`,
        // extendedProps: extendedProps,
        textColor: textColor,
        backgroundColor: backgroundColor,
        borderColor: color,
      }
      this.calendarEvents.push(i);
    }

    // refresh calendar
    if (this.calendar != null) {
      this.calendar.getApi().removeAllEventSources();
      this.calendar.getApi().addEventSource(this.calendarEvents);
    }
    // console.log(this.calendarEvents)

    // const timetable: Array<any> = await this.dentistSvc.getTimetable();
    // console.log(timetable)
    // for (const tt of timetable) {

    //   const start = moment().isoWeekday(tt.day).hour(tt.fromHour).minute(tt.fromMinute).second(0);
    //   const end = moment().isoWeekday(tt.day).hour(tt.toHour).minute(tt.toMinute).second(0);

    //   const i: FullCalendarEvent = {
    //     resourceId: tt.dentistId.toString(),
    //     start: start.utc().toDate(),
    //     end: end.utc().toDate(),
    //     // classNames: ['fc-nonbusiness'],
    //     display: 'inverse-background'
    //   }
    //   this.calendarEvents.push(i);
    // }

    // console.log(this.calendarEvents)
  }

  /**
   *
   */
  async add(resourceId?: string, fromDate?: Date, toDate?: Date): Promise<void> {
    const modal = await this.modalCtrl.create({
      component: AddCalendarPage,
      componentProps: {
        'events': this.events,
        'patients': this.patients,
        'fromDate': fromDate,
        'toDate': toDate,
        'resourceId': resourceId
      }
    });
    await modal.present();
    modal.onDidDismiss().then((r) => {
      this.initEvents();
    })
  }

  /**
   *
   */
  async edit(d: any): Promise<void> {
    const evt: CalendarEvent = await this.calendarSvc.getCalendarEvent(d.event.id)
    const modal = await this.modalCtrl.create({
      component: AddCalendarPage,
      componentProps: {
        'events': this.events,
        'patients': this.patients,
        'event': evt,
      }
    });
    await modal.present();
    modal.onDidDismiss().then((r) => {
      this.initEvents();
    })
  }

  /**
   *
   */
  private async hex2rgba(hex: string, alpha = 1): Promise<string> {
    const [r, g, b] = hex.match(/\w\w/g).map(x => parseInt(x, 16));
    return `rgba(${r},${g},${b},${alpha})`;
  };

  /**
   *
   */
  private async contrastColor(rgba: string): Promise<string> {
    const colorCodes = rgba.replace('rgba(', '').split(',').map(x => parseInt(x));
    const luminance = (0.299 * colorCodes[0] + 0.587 * colorCodes[1] + 0.114 * colorCodes[2]) / 255;
    // console.log(luminance, luminance > 0.5 ? 'black' : 'white')
    return luminance > 0.5 ? 'black' : 'white';
  }

  /**
   *
   */
  // async pop(ev: any): Promise<void> {
  //   const popover = await this.popoverCtrl.create({
  //     component: ToolbarMenuComponent,
  //     event: ev,
  //     translucent: true
  //   });
  //   return await popover.present();
  // }

  /**
   *
   */
  async toList(): Promise<void> {
    this.nav.navigateForward('calendar/details');
  }

}


