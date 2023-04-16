import { Component, OnInit } from '@angular/core';
import { ModalController, NavController, PopoverController } from '@ionic/angular';
import { Patient } from 'libs/shared/src/lib/patient.entity';
import { DentistService } from 'apps/qualyteeth-dentist/src/app/services/dentist.service';
import { AddPatientPage } from './add-patient/add-patient.page';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.page.html',
  styleUrls: ['./patients.page.scss'],
})
export class PatientsPage implements OnInit {

  loading: boolean = true;
  allPatients: Array<Patient> = new Array<Patient>();
  patients: Array<Patient> = new Array<Patient>();

  // columns: string[] = ['picture', 'patient', 'age', 'sex', 'email', 'phoneNb', 'calendar', 'control', 'action'];
  columns: string[] = ['picture', 'patient', 'age', 'sex', 'email', 'phoneNb'];


  /**
   *
   */
  constructor(
    private modalCtrl: ModalController,
    private nav: NavController,
    private popoverCtrl: PopoverController,
    private dentistSvc: DentistService,
  ) {

  }

  /**
   *
   */
  ngOnInit() { }

  /**
   *
   */
  async ionViewWillEnter() {
    await this.loadData();
  }

  /**
   *
   */
  private async loadData(): Promise<void> {
    this.loading = true;
    // this.surgery = await this.surgerySvc.getActiveSurgeryForDentist();
    // this.allPatients = await this.surgerySvc.getPatienstForSurgery(this.surgery.id)
    this.allPatients = await this.dentistSvc.getPatientsForDentist();
    this.patients = [...this.allPatients];
    this.loading = false;
  }

  /**
   *
   */
  search(e) {
    this.patients = [...this.allPatients];
    if (!e || !e.detail || !e.detail.value || e.detail.value === '') {
      return;
    }
    const v = e.detail.value.toLowerCase();
    this.patients = this.patients.filter(e => e.firstname.toLowerCase().indexOf(v) > -1 || e.lastname.toLowerCase().indexOf(v) > -1);
  }

  /**
   *
   */
  // details(patient: Patient): void {
  //   this.nav.navigateForward('patients/' + patient.id);
  // }

  /**
   *
   */
  async add(): Promise<void> {
    // const modal = await this.modalCtrl.create({
    //   component: AddPatientPage,
    //   componentProps: {
    //     // 'surgery': this.surgery
    //   }
    // });
    // await modal.present();
    // modal.onDidDismiss().then(async d => {
    //   await this.loadData();
    // })
    this.nav.navigateForward('patients/add')
  }

  /**
   *
   */
  // async action(ev: any, p: Patient): Promise<void> {
  //   const popover = await this.popoverCtrl.create({
  //     component: PatientsPageActionsComponent,
  //     event: ev,
  //     translucent: true
  //   });
  //   await popover.present();
  //   popover.onDidDismiss().then(async r => {
  //     if (r.data != null) {
  //       // console.log(r.data, p)
  //       if (r.data === 'visit') {
  //         this.nav.navigateForward(`patients/patient/${p.id}/visit`);
  //       }
  //       // if (r.data === 'accept') {
  //       //   await this.validate(calendarEvent);
  //       // }
  //       // else if (r.data === 'reject') {
  //       //   await this.reject(calendarEvent);
  //       // }
  //     }
  //   })
  // }

  /**
   *
   */
  // async control(ev: MouseEvent, p: Patient): Promise<void> {
  //   ev.stopImmediatePropagation();
  //   this.nav.navigateForward(`patients/patient/${p.id}/visit`);
  // }

  /**
   *
   */
  async details(p: Patient): Promise<void> {
    this.nav.navigateForward(`patients/patient/${p.id}`);
  }

}

@Component({
  template: `
  <ion-list lines="none">
    <ion-item button (click)="popoverCtrl.dismiss('visit')">
      <ion-icon name="add-circle-outline" slot="start"></ion-icon>
      <ion-label>Nouvelle visite</ion-label>
    </ion-item>
    <ion-item button (click)="popoverCtrl.dismiss('edit')">
      <ion-icon name="create-outline" slot="start"></ion-icon>
      <ion-label>Editer</ion-label>
    </ion-item>
  </ion-list>
  `,
  styleUrls: ['./patients.page.scss'],
})
export class PatientsPageActionsComponent {

  /**
   *
   */
  constructor(
    public popoverCtrl: PopoverController,
  ) { }

}
