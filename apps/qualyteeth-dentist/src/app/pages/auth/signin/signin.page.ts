import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, ModalController, NavController } from '@ionic/angular';
import { AuthService } from 'apps/qualyteeth-dentist/src/app/services/auth.service';
import { DiagnosticService } from '../../../services/diagnostic.service';
import { TreatmentService } from '../../../services/treatment.service';
import { UserDto, UserType } from 'libs/shared/src/lib/dto/user.dto';

@Component({
  selector: 'qualyteeth-app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SigninPage implements OnInit {

  signinForm: FormGroup;
  isSubmitted = false;

  /**
   *
   */
  constructor(
    private nav: NavController,
    private modalCtrl: ModalController,
    private fb: FormBuilder,
    private alertCtrl: AlertController,
    private diagnosticSvc: DiagnosticService,
    private treatmentSvc: TreatmentService,
    private authSvc: AuthService) {

    this.signinForm = this.fb.group({
      firstname: [null, [Validators.required]],
      lastname: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(8)]],
      street: [null, [Validators.required]],
      streetNb: [null],
      postalCode: [null, [Validators.required]],
      city: [null, [Validators.required]],
      // password2: [null, [Validators.required, Validators.minLength(8)]]
    });
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
  async login(): Promise<void> {
    this.nav.navigateBack('login');
    // await this.modalCtrl.dismiss();
    // const modal = await this.modalCtrl.create({
    //   component: LoginPage,
    // });
    // return await modal.present();
  }

  /**
   *
   */
  async signin(): Promise<void> {
    this.isSubmitted = true;

    // const firstname = this.signinForm.controls['firstname'].value;
    // const lastname = this.signinForm.controls['lastname'].value;
    // const email = this.signinForm.controls['email'].value;
    // const password = this.signinForm.controls['password'].value;
    // const street = this.signinForm.controls['street'].value;
    // const streetNb = this.signinForm.controls['streetNb'].value;
    // const postalCode = this.signinForm.controls['postalCode'].value;
    // const city = this.signinForm.controls['city'].value;

    const user: UserDto = {
      type: UserType.PRACTITIONER,
      firstname: this.signinForm.controls['firstname'].value,
      lastname: this.signinForm.controls['lastname'].value,
      email: this.signinForm.controls['email'].value,
      password: this.signinForm.controls['password'].value,
      street: this.signinForm.controls['street'].value,
      streetNb: this.signinForm.controls['streetNb'].value,
      postalCode: this.signinForm.controls['postalCode'].value,
      city: this.signinForm.controls['city'].value,
    }

    try {
      // await this.authSvc.signin(firstname, lastname, street, streetNb, postalCode, city, password, email, UserType.PRACTITIONER);
      await this.authSvc.signin(user);
      await this.authSvc.login(user.email, user.password);
      // await this.diagnosticSvc.init();
      // await this.treatmentSvc.init();
      this.nav.navigateRoot('patients');
      // await this.next();
      // this.modalCtrl.dismiss();
    } catch (e) {
      if (!e.ok && e.status === 409) {
        const alert = await this.alertCtrl.create({
          header: 'Accès refusé',
          message: 'Utilisateur déjà existant',
          buttons: ['OK']
        });
        await alert.present();
      }
    }
  }

  /**
   *
   */
  // async next(): Promise<void> {
  //   this.authSvc.signinData = {
  //     firstname: this.signinForm.controls['firstname'].value,
  //     lastname: this.signinForm.controls['lastname'].value,
  //     username: this.signinForm.controls['email'].value,
  //     email: this.signinForm.controls['email'].value,
  //     password: this.signinForm.controls['password'].value,
  //     street: this.signinForm.controls['street'].value,
  //     streetNb: this.signinForm.controls['streetNb'].value,
  //     postalCode: this.signinForm.controls['postalCode'].value,
  //     city: this.signinForm.controls['city'].value,
  //   }
  //   this.nav.navigateForward('create-surgery');
  // }

}
