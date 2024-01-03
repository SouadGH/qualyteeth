import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { ModalController, NavController, ToastController } from '@ionic/angular';
import { PractitionerService } from 'apps/qualyteeth-dentist/src/app/services/practitioner.service';
import * as loadImage from 'blueimp-load-image';
import { UserDto } from 'libs/shared/src/lib/dto/user.dto';
import { AuthService } from '../../services/auth.service';
import { LoginPage } from '../auth/login/login.page';
import { PractitionerDto } from 'libs/shared/src/lib/dto/practitioner.dto';


// interface OpeningHours {
//   // day: string,
//   fromHour: string,
//   toHour: string
// }

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  @ViewChild('imgChooser', { static: false }) imgChooser: ElementRef;

  user: PractitionerDto;
  profileForm: FormGroup;
  isSubmitted = false;
  userImgChanged = false;

  //dentistTimetables: Array<DentistTimetable>;
  dentistTimetables: Array<any>;

  hours: Array<number> = new Array<number>();
  minutes: Array<number> = new Array<number>();

  days = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche']

  /**
   *
   */
  constructor(
    public authSvc: AuthService,
    private dentistSvc: PractitionerService,
    private modalCtrl: ModalController,
    private toastCtrl: ToastController,
    private fb: FormBuilder,
    private adapter: DateAdapter<any>,
    private nav: NavController) {

    this.adapter.setLocale('fr-CH');

    this.profileForm = this.fb.group({
      firstname: [null],
      lastname: [null],
      phoneNumber: [null],
      email: new FormControl({ value: null, disabled: true }),
      // password: [null, Validators.minLength(8)],
      // newPassword: new FormControl({ value: null, disabled: true }, Validators.minLength(8)),
      // newPassword2: new FormControl({ value: null, disabled: true }, Validators.minLength(8)),
    });

    for (let i = 0; i < 24; i++) {
      this.hours.push(i);
    }
    for (let i = 0; i < 59; i++) {
      this.minutes.push(i);
    }
  }

  /**
   *
   */
  async ngOnInit() { }

  /**
   *
   */
  async ionViewWillEnter() {
    //practitionerId = await this.storageSvc.get('useridQD');  
    
    
    this.user = await this.dentistSvc.getPractitioner();
   
        
    this.profileForm.get('firstname').setValue(this.user.firstname);
    this.profileForm.get('lastname').setValue(this.user.lastname);
    this.profileForm.get('phoneNumber').setValue(this.user.phoneNumber);
    this.profileForm.get('email').setValue(this.user.email);

     this.dentistTimetables = await this.dentistSvc.getTimetable();
  }

  /**
   *
   */
  toTimeString(n: number): string {
    return n < 10 ? `0${n}` : `${n}`
  }

  /**
   *
   */
  async logout() {
    await this.authSvc.logout();
    this.nav.navigateRoot('');
  }

  /**
   *
   */
  async login(): Promise<void> {
    const modal = await this.modalCtrl.create({
      component: LoginPage,
    });
    return await modal.present();
  }

  /**
   *
   */
  async update(): Promise<void> {
    this.isSubmitted = true;

    this.user.firstname = this.profileForm.get('firstname').value;
    this.user.lastname = this.profileForm.get('lastname').value;
    this.user.phoneNumber = this.profileForm.get('phoneNumber').value;

    // check password 
    // if (this.profileForm.get('password').value != null && this.profileForm.get('password').value !== '') {

    //   const newPwd = this.profileForm.get('newPassword').value;
    //   const newPwd2 = this.profileForm.get('newPassword2').value;

    //   if (newPwd !== newPwd2) {
    //     this.profileForm.controls['newPassword2'].setErrors({ 'notsame': true });
    //     return;
    //   }

    //   const isValid: boolean = await this.authSvc.validateUser(this.user.username, this.profileForm.get('password').value);
    //   if (!isValid) {
    //     this.profileForm.controls['password'].setErrors({ 'invalidPwd': true });
    //     return;
    //   }

    //   this.user.password = this.profileForm.get('newPassword').value;
    // }
    console.log("dentiste avant update.ts :"+ JSON.stringify(this.user));
    await this.dentistSvc.update(this.user);

    // this.profileForm.get('password').reset();
    // this.profileForm.get('newPassword').reset();
    // this.profileForm.get('newPassword2').reset();

    this.profileForm.markAsPristine();

    const toast = await this.toastCtrl.create({
      message: 'Vos changements ont été sauvegardés',
      duration: 2000
    });
    toast.present();
    await this.modalCtrl.dismiss();
  }

  /**
   *
   */
  // toMarketPlace(): void {
  //   this.nav.navigateRoot('marketplace')
  // }

  /**
   *
   */
  // onPasswordKey(e): void {
  //   if (this.profileForm.get('password').value != null && this.profileForm.get('password').value !== '') {
  //     this.profileForm.get('newPassword').enable();
  //     this.profileForm.get('newPassword2').enable();
  //   } else {
  //     this.profileForm.get('newPassword').disable();
  //     this.profileForm.get('newPassword2').disable();
  //   }
  // }

  /**
   *
   */
  async close(): Promise<void> {
    await this.modalCtrl.dismiss();
  }

  /**
   *
   */
  async editProfileImage(): Promise<void> {
    this.imgChooser.nativeElement.click();
  }

  /**
   *
   */
  async onImageChosen(e): Promise<void> {

    if (!e || !e.target || !e.target.files) {
      return;
    }
    if (e.target.files.length === 0) {
      return;
    }
    const rawDocument = e.target.files[0];

    const r = await loadImage(rawDocument, { maxWidth: 320, canvas: true, downsamplingRatio: 0.5 });
    const c: HTMLCanvasElement = <any>r.image;

    // c.toBlob(b => {
    //   console.log(`${b.size / 1024} kb`);
    // });

    // if (this.practitioner.user.image == null) {
    //   this.practitioner.user.image = ''
    // }
    this.user.user.image = c.toDataURL();
    this.userImgChanged = true;

    // console.log(this.userImgChanged);
  }

  /**
   *
   */
  /*async getDayTimetable(day: string): Array<DentistTimetable> | null {
     return this.dentistTimetables.filter(dtt => dtt.day === this.days.indexOf(day) + 1);
   }*/

  /**
   *
   */
  // async addTimetable(day: string): Promise<void> {
  //   this.dentistTimetables.push({ day: this.days.indexOf(day) + 1, fromHour: 8, fromMinute: 0, toHour: 18, toMinute: 0 });
  // }

  /**
   *
   */
  // async removeTimetable(day: string, i: number): Promise<void> {
  //   const original = this.dentistTimetables.filter(dtt => dtt.day !== this.days.indexOf(day) + 1);
  //   let dayTt = this.dentistTimetables.filter(dtt => dtt.day === this.days.indexOf(day) + 1);
  //   dayTt.splice(i, 1)

  //   this.dentistTimetables = original.concat(dayTt);
  // }

  /**
   *
   */
  async updateTimetables(): Promise<void> {

    // await this.dentistSvc.updateTimetables(null, this.dentistTimetables);
    const toast = await this.toastCtrl.create({
      message: 'Vos changements ont été sauvegardés',
      duration: 2000
    });
    toast.present();
    await this.modalCtrl.dismiss();
  }

}