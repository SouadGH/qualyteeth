import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'apps/qualyteeth-patient/src/app/services/auth.service';
import * as loadImage from 'blueimp-load-image'
import { PatientService } from 'apps/qualyteeth-patient/src/app/services/patient.service';
import { Patient } from 'libs/shared/src/lib/patient.interface';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  @ViewChild('imgChooser', { static: false }) imgChooser: ElementRef;
  progressInfo = null;

  user: Patient;
  userImgChanged: boolean = false;
  profileForm: FormGroup;
  isSubmitted = false;

  /**
   *
   */
  constructor(
    public authSvc: AuthService,
    private patientSvc: PatientService,
    private toastCtrl: ToastController,
    private modalCtrl: ModalController,
    private fb: FormBuilder) {

    this.profileForm = this.fb.group({
      firstname: [null],
      lastname: [null],
      phoneNumber: [null],
      email: new FormControl({ value: null, disabled: true }),
      // password: [null, Validators.minLength(8)],
      // newPassword: new FormControl({ value: null, disabled: true }, Validators.minLength(8)),
      // newPassword2: new FormControl({ value: null, disabled: true }, Validators.minLength(8)),
    });
  }

  /**
   *
   */
  async ngOnInit() { }

  /**
   *
   */
  async ionViewWillEnter() {
    this.user = await this.patientSvc.getPatient();
    this.profileForm.get('firstname').setValue(this.user.firstname);
    this.profileForm.get('lastname').setValue(this.user.lastname);
    this.profileForm.get('phoneNumber').setValue(this.user.phoneNumber);
    this.profileForm.get('email').setValue(this.user.email);
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

    // console.log(this.user);
    await this.patientSvc.update(this.user);
    // await this.patientSvc.insertImage(this.user);

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

    if (this.user.image == null) {
      this.user.image = {}
    }
    this.user.image = c.toDataURL();
    this.userImgChanged = true;
  }

}
