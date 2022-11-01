import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'apps/qualyteeth-patient/src/app/services/auth.service';

@Component({
  selector: 'app-signin',
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
    private fb: FormBuilder,
    private alertCtrl: AlertController,
    private authSvc: AuthService) {

    this.signinForm = this.fb.group({
      firstname: [null, [Validators.required]],
      lastname: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(8)]],
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
  // async close(): Promise<void> {
  //   await this.modalCtrl.dismiss();
  // }

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

    // if (this.signinForm.controls['password'].value !== this.signinForm.controls['password2'].value) {
    //   this.signinForm.controls['password2'].setErrors({'notsame': true});
    //   return;
    // }

    const firstname = this.signinForm.controls['firstname'].value;
    const lastname = this.signinForm.controls['lastname'].value;
    const username = this.signinForm.controls['email'].value;
    const password = this.signinForm.controls['password'].value;
    const email = this.signinForm.controls['email'].value;

    try {
      await this.authSvc.signin(firstname, lastname, username, password, email, 'PATIENT');
      await this.authSvc.login(username, password);
      // this.modalCtrl.dismiss();
      this.nav.navigateRoot('tabs/odontogram');
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

}
