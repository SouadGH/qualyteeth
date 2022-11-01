import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, ModalController, NavParams } from '@ionic/angular';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Patient } from 'libs/shared/src/lib/patient.interface';
import * as moment from 'moment';
import { DateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDateRangePicker } from '@angular/material/datepicker';
import { DentistService } from 'apps/qualyteeth-dentist/src/app/services/dentist.service';
import { Dentist } from 'libs/shared/src/lib/dentist.interface';
import { SurgeryService } from 'apps/qualyteeth-dentist/src/app/services/surgery.service';
import { Surgery } from 'libs/shared/src/lib/surgery.interface';
import { ServicingService } from 'apps/qualyteeth-dentist/src/app/services/servicing.service';
import { ServiceDefinition } from 'libs/shared/src/lib/service-definition.interface';
import { CalendarEvent } from 'libs/shared/src/lib/calendar.interface';
import { CalendarService } from 'apps/qualyteeth-dentist/src/app/services/calendar.service';
import { PatientService } from 'apps/qualyteeth-dentist/src/app/services/patient.service';

@Component({
  selector: 'app-add-calendar',
  templateUrl: './add-calendar.page.html',
  styleUrls: ['./add-calendar.page.scss'],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'fr-CH' },
  ],
})
export class AddCalendarPage implements OnInit {

  @ViewChild('fromPicker') fromPicker: MatDateRangePicker<any>;
  @ViewChild('toPicker') toPicker: MatDateRangePicker<any>;

  activeSurgery: Surgery;

  calendarForm: FormGroup;

  patients: Array<Patient>;
  filteredPatients: Observable<Patient[]>;

  // dentists: Array<Dentist>;
  filteredDentists: Observable<Dentist[]>;

  services: Array<ServiceDefinition>;
  filteredServices: Observable<ServiceDefinition[]>;

  events: Array<CalendarEvent>;
  event: CalendarEvent;
  newEvent: boolean;

  fromDate: Date;
  fromDateTime: string;
  toDate: Date;
  toDateTime: string;
  resourceId: string;

  repetitionFrequency: string = 'none';

  dayInterval: number = 1;

  weekInterval: number = 1;
  weekByDay: Array<string> = new Array<string>();

  monthInterval: number = 1;
  monthRepetitionType: string = 'onDay';
  monthByMonthDay: number = 1;
  monthBySetPos: string = '1';
  monthByDay: string = 'MO';

  yearRepetitionType: string = 'onDay';
  yearByMonth: string = '1';
  yearByMonthDay: number = 1;
  yearBySetPos: string = '1';
  yearByDay: string = 'MO';
  yearByMonth2: string = '1';

  endRepetition: string = 'never';
  endCount: number = 1;
  endUntil: Date = new Date();

  monthDays: Array<number> = Array.from(Array(31).keys()).map(x => x + 1);

  /**
   *
   */
  constructor(
    private modalCtrl: ModalController,
    private dentistSvc: DentistService,
    private surgerySvc: SurgeryService,
    private servicingSvc: ServicingService,
    private patientSvc: PatientService,
    private calendarSvc: CalendarService,
    private alertCtrl: AlertController,
    private navParams: NavParams,
    private fb: FormBuilder,
    private adapter: DateAdapter<any>,
  ) {
    this.fromDate = this.navParams.get('fromDate');
    this.toDate = this.navParams.get('toDate');
    this.resourceId = this.navParams.get('resourceId');
    this.patients = this.navParams.get('patients')
    this.events = this.navParams.get('events');
    this.event = this.navParams.get('event');

    this.calendarForm = this.fb.group({
      patient: [null, Validators.required],
      dentist: [null, Validators.required],
      service: [null, Validators.required],
      comment: [null],
      // date: [{ value: null, disabled: true }],
    });

    this.adapter.setLocale('fr-CH');
  }

  /**
   *
   */
  async ngOnInit() {
    const surgeries = await this.surgerySvc.getSurgeriesForDentist();
    this.activeSurgery = surgeries.find(s => s.active);

    let dentist: Dentist;

    this.newEvent = this.event == null;

    if (!this.newEvent) {
      dentist = await this.dentistSvc.getDentist(this.event.dentistId);
      const patient: Patient = await this.patientSvc.getPatient(this.event.patientId);
      this.calendarForm.controls['patient'].setValue(patient)
      this.calendarForm.controls['patient'].disable();

      // const service: Service = await this.servicingSvc.getService(this.event.serviceId);
      // this.calendarForm.controls['service'].setValue(service)

      this.calendarForm.controls['comment'].setValue(this.event.notes)

      this.fromDate = new Date(this.event.startDate);
      this.toDate = new Date(this.event.endDate);
      
    } else if (this.resourceId != null) {
      dentist = await this.dentistSvc.getDentist(parseInt(this.resourceId));
    }

    this.fromDateTime = `${moment(this.fromDate).hour().toString()}:${moment(this.fromDate).minute().toString()}`;
    this.toDateTime = `${moment(this.toDate).hour().toString()}:${moment(this.toDate).minute().toString()}`;

    let dentists: Array<Dentist> = new Array<Dentist>();
    if (this.activeSurgery != null) {
      dentists = await this.surgerySvc.getDentistsForSurgery(this.activeSurgery.id);
    } else {
      const dentist: Dentist = await this.dentistSvc.getDentist();
      dentists.push(dentist);
    }

    this.filteredPatients = this.calendarForm.controls['patient'].valueChanges.pipe(
      startWith(''),
      map(value => typeof value === 'string' ? value : value.firstname + ' ' + value.lastname),
      map(value => value ? this._filter(value) : this.patients.slice())
    );

    this.filteredDentists = this.calendarForm.controls['dentist'].valueChanges.pipe(
      startWith(''),
      map(value => typeof value === 'string' ? value : value.firstname + ' ' + value.lastname),
      map(value => value ? this._filter(value) : dentists.slice())
    );

    this.calendarForm.controls['dentist'].setValue(dentist);

    if (this.activeSurgery != null) {
      this.services = await this.servicingSvc.getDefinitionsForSurgery(this.activeSurgery.id);
    } else {
      this.services = await this.servicingSvc.getServiceLinksForDentist();
    }

    if (!this.newEvent) {
      const service: ServiceDefinition = this.services.find(s => s.id === this.event.serviceDefinitionId);
      this.calendarForm.controls['service'].setValue(service);
    }

    this.filteredServices = this.calendarForm.controls['service'].valueChanges.pipe(
      startWith(''),
      map(value => typeof value == 'object' ? this.displayService(value) : value),
      map(value => value ? this._filterService(value) : this.services.slice())
    )
  }

  /**
   *
   */
  private _filter(value: string): Array<any> {
    const filterValue = value.toLowerCase().trim();
    return this.patients.filter(p => p.firstname.toLowerCase().indexOf(filterValue) > -1 || p.lastname.toLowerCase().indexOf(filterValue) > -1);
  }

  /**
   *
   */
  private _filterService(value: string): Array<ServiceDefinition> {
    const filterValue = value.toLowerCase().trim();
    return this.services.filter(s => s.name.toLowerCase().indexOf(filterValue) > -1);
  }

  /**
   *
   */
  display(p: Patient | Dentist): string {
    if (p == null) {
      return '';
    }
    return p.firstname + ' ' + p.lastname;
  }

  /**
   *
   */
  displayService(s: any): string {
    if (s == null) {
      return '';
    }
    return `${s.name} (${s.timing} min.)`;
  }

  /**
   *
   */
  async dentistSelected(): Promise<void> {
    const selectedDentist: any = this.calendarForm.controls['dentist'].value;
    this.calendarForm.controls['service'].setValue(null);

    if (selectedDentist == null || selectedDentist === '') {
      return;
    }

    if (this.activeSurgery != null) {
      this.services = await this.servicingSvc.getDefinitionsForSurgery(this.activeSurgery.id);
    } else {
      this.services = await this.servicingSvc.getDefinitionsForDentist();
    }

    this.filteredServices = this.calendarForm.controls['service'].valueChanges.pipe(
      startWith(''),
      map(value => typeof value == 'object' ? this.displayService(value) : value),
      map(value => value ? this._filterService(value) : this.services.slice())
    )
  }

  /**
   *
   */
  async serviceSelected(): Promise<void> {
    const selectedDentist: any = this.calendarForm.controls['dentist'].value;
    const selectedService: any = this.calendarForm.controls['service'].value;
    // console.log(this.events, selectedService)

    this.toDate = moment(this.fromDate).add(selectedService.timing, 'minute').toDate();
    this.events.forEach(e => {
      if (e.dentistId === selectedDentist.id && moment(e.startDate).isBefore(moment(this.toDate)) && moment(e.endDate).isAfter(moment(this.toDate))) {
        this.calendarForm.controls['service'].setErrors({ 'overlap': true })
        return;
      }
    })
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
  async openDatePicker(picker: string): Promise<void> {
    if (picker === 'fromDate') {
      this.fromPicker.open();
    }
    else if (picker === 'toDate') {
      this.toPicker.open();
    }
  }

  /**
   *
   */
  async save(): Promise<void> {
    const fDate = moment(this.fromDate);
    fDate.hour(parseInt(this.fromDateTime.split(':')[0]))
    fDate.minute(parseInt(this.fromDateTime.split(':')[1]))

    const tDate = moment(this.toDate);
    tDate.hour(parseInt(this.toDateTime.split(':')[0]))
    tDate.minute(parseInt(this.toDateTime.split(':')[1]))

    if (fDate.isAfter(tDate)) {
      const alert = await this.alertCtrl.create({
        header: 'Erreur',
        message: 'La date du début est après celle de fin',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }

    const dentist: Dentist = this.calendarForm.controls['dentist'].value;
    const service: any = this.calendarForm.controls['service'].value;
    const patient: Patient = this.calendarForm.controls['patient'].value;
    const comment: string = this.calendarForm.controls['comment'].value;

    const c: CalendarEvent = {
      id: this.newEvent ? null : this.event.id,
      status: 'VALIDATED',
      dentistId: dentist.id,
      serviceDefinitionId: service.definitionId,
      patientId: patient.id,
      startDate: fDate.toDate(),
      endDate: tDate.toDate(),
      notes: comment,
      createdOn: null,
    }

    if (this.newEvent) {
      c.id = await this.calendarSvc.add(c);
    } else {
      await this.calendarSvc.update(c);
    }

    await this.modalCtrl.dismiss(c);
  }

  /**
   *
   */
  formatDate(d: Date, format: string): string {
    return moment(d).locale('fr-CH').format(format);
  }

}
