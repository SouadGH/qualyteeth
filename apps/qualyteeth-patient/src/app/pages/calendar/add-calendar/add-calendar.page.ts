import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, ModalController, NavParams, ToastController } from '@ionic/angular';
import { Dentist } from 'libs/shared/src/lib/dentist.entity';
import { ServiceDefinition } from 'libs/shared/src/lib/service-definition.entity';
import { Surgery } from 'libs/shared/src/lib/surgery.entity';
import { CalendarService } from 'apps/qualyteeth-patient/src/app/services/calendar.service';
import { SurgeryService } from 'apps/qualyteeth-patient/src/app/services/surgery.service';
import { map, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { ServicingService } from 'apps/qualyteeth-patient/src/app/services/servicing.service';
import * as moment from 'moment';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { DateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';
import { CalendarEvent, CalendarStatus } from 'libs/shared/src/lib/calendar.entity';
import { StorageService } from 'apps/qualyteeth-patient/src/app/services/storage.service';
import { DentistService } from '../../../services/dentist.service';

@Component({
  selector: 'app-add-calendar',
  templateUrl: './add-calendar.page.html',
  styleUrls: ['./add-calendar.page.scss'],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'fr-CH' },
  ],
})
export class AddCalendarPage implements OnInit {

  calendarForm: FormGroup;

  services: Array<ServiceDefinition> = new Array<ServiceDefinition>();
  filteredServices: Observable<ServiceDefinition[]>;

  dentists: Array<any> = new Array<any>();
  filteredDentists: Observable<any[]>;

  selectedDentist: any;

  minDate: Date = new Date();
  maxDate: Date = moment().add(3, 'months').toDate();

  allAvailableDates: Array<moment.Moment> = new Array<moment.Moment>();
  availableSlots: Array<moment.Moment> = new Array<moment.Moment>();

  /**
   *
   */
  constructor(
    private navParams: NavParams,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private calendarSvc: CalendarService,
    private toastCtrl: ToastController,
    private servicingSvc: ServicingService,
    private surgerySvc: SurgeryService,
    private dentistSvc: DentistService,
    private fb: FormBuilder,
    private adapter: DateAdapter<any>,
    private storageSvc: StorageService
  ) {

    this.dentists = this.navParams.get('dentists')
    
    this.calendarForm = this.fb.group({
      surgery: [{ value: null, disabled: true }, Validators.required],
      service: [null],
      dentist: [{ value: null, disabled: true }],
      date: [{ value: null, disabled: true }],
      slot: [{ value: null, disabled: true }],
    });

    this.adapter.setLocale('fr-CH');
  }

  /**
   *
   */
  ngOnInit() { }

  /**
   *
   */
  async close(): Promise<void> {
    await this.modalCtrl.dismiss();
  }

  /**
   *
   */
  async ionViewWillEnter(): Promise<void> {
    // this.surgeries = await this.surgerySvc.getSurgeriesForPatient();
    // if (this.surgeries.length === 0) {
    //   const alert = await this.alertCtrl.create({
    //     header: 'Attention',
    //     message: 'Veuillez vous connecter à un cabinet avant de pouvoir demander un rendez-vous',
    //     buttons: ['OK']
    //   });
    //   await alert.present();
    //   return;
    // }
    // console.log(this.surgeries);

    // const surgery: Surgery = this.surgeries[0];
    // this.calendarForm.controls['surgery'].setValue(surgery.name);

    // this.services = await this.surgerySvc.getServicesForSurgery(surgery.id);
    // // console.log(this.services)
    // this.filteredServices = this.calendarForm.controls['service'].valueChanges.pipe(
    //   startWith(''),
    //   map(value => typeof value === 'string' ? value : value.name),
    //   map(value => value ? this._filterService(value) : this.services.slice())
    // )

    // const dentist: Dentist = this.dentists[0];
    this.services = await this.servicingSvc.getServicesForPatient();
    // console.log(this.services)
    this.filteredServices = this.calendarForm.controls['service'].valueChanges.pipe(
      startWith(''),
      map(value => typeof value === 'string' ? value : value.name),
      map(value => value ? this._filterService(value) : this.services.slice())
    )
  }

  /**
   *
   */
  private _filterService(value: string): Array<ServiceDefinition> {
    const filterValue = value.toLowerCase().trim();
    return this.services.filter(d => d.name.toLowerCase().indexOf(filterValue) > -1);
  }

  /**
   *
   */
  private _filterDentist(value: string): Array<Dentist> {
    const filterValue = value.toLowerCase().trim();
    return this.dentists.filter(d => d.firstname.toLowerCase().indexOf(filterValue) > -1 || d.lastname.toLowerCase().indexOf(filterValue) > -1);
  }

  /**
   *
   */
  async serviceSelected(): Promise<void> {
    const selectedService = this.calendarForm.controls['service'].value;

    this.calendarForm.controls['dentist'].setValue(null);
    this.calendarForm.controls['dentist'].disable();

    // console.log(selectedService)
    if (selectedService == null || selectedService === '') {
      return;
    }

    this.dentists = await this.servicingSvc.getDentists(selectedService.id);
    if (this.dentists.length === 0) {
      const alert = await this.alertCtrl.create({
        header: 'Attention',
        message: 'Aucun dentiste disponible pour cette prestation',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }

    this.filteredDentists = this.calendarForm.controls['dentist'].valueChanges.pipe(
      startWith(''),
      // map(value => typeof value == null || value === 'string' ? value : value.firstname + ' ' + value.lastname),
      map(value => typeof value == 'object' ? this.displayDentist(value) : value),
      map(value => value ? this._filterDentist(value) : this.dentists.slice())
    )

    this.calendarForm.controls['dentist'].enable();
  }

  /**
   *
   */
  async dentistSelected(): Promise<void> {
    this.selectedDentist = this.calendarForm.controls['dentist'].value;

    // console.log(this.selectedDentist)

    this.calendarForm.controls['date'].setValue(null);
    this.calendarForm.controls['date'].disable();

    if (this.selectedDentist == null || this.selectedDentist === '') {
      return;
    }

    const slots = await this.calendarSvc.getFreeSlotForDentist(this.selectedDentist.id, this.selectedDentist.timing, moment(this.minDate).format('YYYYMMDD'), moment(this.maxDate).format('YYYYMMDD'))
    // console.log(slots)
    // console.log(slots.map(x => moment(x).utc().toDate()))
    this.allAvailableDates = slots.map(x => moment(x));

    const minDate = moment.min(this.allAvailableDates);
    await this.initSlots(minDate);

    this.calendarForm.controls['date'].setValue(minDate.toDate());

    this.calendarForm.controls['date'].enable();
    this.calendarForm.controls['slot'].enable();
  }

  /**
   *
   */
  private async initSlots(date: moment.Moment): Promise<void> {

    const startDay = date.clone().set('hour', 0).set('minute', 0).set('second', 0).set('millisecond', 0)
    const endDay = date.clone().set('hour', 23).set('minute', 59).set('second', 59).set('millisecond', 0)
    // console.log(startDay.toDate() + ' - ' + endDay.toDate())

    // console.log(this.allAvailableDates.map(x => x.toDate()))
    this.availableSlots = this.allAvailableDates.filter(x => x.isSameOrAfter(startDay)).filter(x => x.isSameOrBefore(endDay))
    // console.log(this.availableSlots)
    // console.log(this.availableSlots.map(x => x.toDate()))
  }

  /**
   *
   */
  formatSlot(slot: moment.Moment): string {
    const d = slot.clone();
    return `${d.format('HH:mm')} - ${d.add(this.selectedDentist.timing, 'minutes').format('HH:mm')}`
  }

  /**
   *
   */
  displayService(s: ServiceDefinition): string {
    if (s == null) {
      return '';
    }
    return s.name;
  }

  /**
   *
   */
  displayDentist(d: any): string {
    if (d == null) {
      return '';
    }
    return `${d.firstname}  ${d.lastname} [${d.timing} min]`;
  }

  /**
   *
   */
  datesFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();

    return this.allAvailableDates.findIndex(s => s.isSame(d, 'date')) > -1;
  }

  /**
   *
   */
  async dateChanged(e: MatDatepickerInputEvent<any>) {
    await this.initSlots(moment(e.value));
  }

  /**
   *
   */
  async book(slot: moment.Moment): Promise<void> {
    // console.log(slot)

    const surgery: Surgery = this.calendarForm.controls['surgery'].value;
    const dentist: Dentist = this.calendarForm.controls['dentist'].value;
    const service: ServiceDefinition = this.calendarForm.controls['service'].value;
    // const comment: string = this.calendarForm.controls['comment'].value;

    const userid = await this.storageSvc.get('useridQP');

    const c: CalendarEvent = {
      id: null,
      status: 'REQUESTED',
      dentistId: dentist.id,
      serviceDefinitionId: service.id,
      patientId: userid,
      startDate: slot.toDate(),
      endDate: moment(slot).add(this.selectedDentist.timing, 'minutes').toDate(),
      // notes: comment,
      createdOn: null,
    }

    c.id = await this.calendarSvc.add(c);
    await this.modalCtrl.dismiss(c);

    const toast = await this.toastCtrl.create({
      message: 'Demande de rendez-vous envoyée!',
      duration: 2000
    });
    await toast.present();
  }

  /**
   *
   */
  // async save(): Promise<void> {

    // const calendar: Calendar = {
    //   id: null,
    //   title: this.calendarForm.controls['title'].value,
    //   dentistId: this.calendarForm.controls['dentist'].value,
    //   date: this.date,
    //   comment: this.calendarForm.controls['comment'].value,
    // }

    // await this.calendarSvc.saveCalendar(calendar);

    // const toast = await this.toastCtrl.create({
    //   message: 'Rendez-Vous enregistré',
    //   duration: 2000
    // });
    // await toast.present();
    // await this.modalCtrl.dismiss();
  // }

}
