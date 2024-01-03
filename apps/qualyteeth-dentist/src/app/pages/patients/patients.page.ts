import { Component, OnInit } from '@angular/core';
import { ModalController, NavController, PopoverController } from '@ionic/angular';
import { PractitionerService } from 'apps/qualyteeth-dentist/src/app/services/practitioner.service';
import { PatientDto } from 'libs/shared/src/lib/dto/patient.dto';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.page.html',
  styleUrls: ['./patients.page.scss'],
})
export class PatientsPage implements OnInit {

  loading: boolean = true;
  allPatients: Array<PatientDto> = new Array<PatientDto>();
  patients: Array<PatientDto> = new Array<PatientDto>();

  // columns: string[] = ['picture', 'PatientDto', 'age', 'sex', 'email', 'phoneNb', 'calendar', 'control', 'action'];
  columns: string[] = ['picture', 'patient', 'age', 'sex', 'email', 'phoneNb'];


  /**
   *
   */
  constructor(
    private modalCtrl: ModalController,
    private nav: NavController,
    private popoverCtrl: PopoverController,
    private dentistSvc: PractitionerService,
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
<<<<<<< HEAD
    
=======
>>>>>>> c6740c8dc4e6e69e5f3be7ef55127ed511d52617
    // this.surgery = await this.surgerySvc.getActiveSurgeryForDentist();
    // this.allPatients = await this.surgerySvc.getPatienstForSurgery(this.surgery.id)
    this.allPatients = await this.dentistSvc.getPatientsForPractitioner();
    console.log(this.allPatients)

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
<<<<<<< HEAD
    this.patients = this.patients.filter(e => e.firstname.toLowerCase().indexOf(v) > -1 || e.lastname.toLowerCase().indexOf(v) > -1);
=======
    this.patients = this.patients.filter(e => e.user.firstname.toLowerCase().indexOf(v) > -1 || e.user.lastname.toLowerCase().indexOf(v) > -1);
>>>>>>> c6740c8dc4e6e69e5f3be7ef55127ed511d52617
  }

  /**
   *
   */
  // details(PatientDto: PatientDto): void {
  //   this.nav.navigateForward('patients/' + PatientDto.id);
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
<<<<<<< HEAD
   async action(ev: any, p: PatientDto): Promise<void> {
     const popover = await this.popoverCtrl.create({
       component: PatientsPageActionsComponent,
       event: ev,
       translucent: true
     });
     await popover.present();
     popover.onDidDismiss().then(async r => {
       if (r.data != null) {
         // console.log(r.data, p)
         if (r.data === 'visit') {
           this.nav.navigateForward(`patients/patient/${p.id}/visit`);
         }
          if (r.data === 'accept') {
           // await this.validate(calendarEvent);
          }
         // else if (r.data === 'reject') {
         //   await this.reject(calendarEvent);
         // }
       }
     })
   }
=======
  // async action(ev: any, p: PatientDto): Promise<void> {
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
  //         this.nav.navigateForward(`patients/PatientDto/${p.id}/visit`);
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
>>>>>>> c6740c8dc4e6e69e5f3be7ef55127ed511d52617

  /**
   *
   */
  // async control(ev: MouseEvent, p: PatientDto): Promise<void> {
  //   ev.stopImmediatePropagation();
  //   this.nav.navigateForward(`patients/PatientDto/${p.id}/visit`);
  // }

  /**
   *
   */
  async details(p: PatientDto): Promise<void> {
    this.nav.navigateForward(`patients/patient/${p.id}`);
  }

}

@Component({
  template: `
  <ion-list lines="none">
<<<<<<< HEAD
    <ion-item button   (click)="popoverCtrl.dismiss('visit')">
=======
    <ion-item button (click)="popoverCtrl.dismiss('visit')">
>>>>>>> c6740c8dc4e6e69e5f3be7ef55127ed511d52617
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
