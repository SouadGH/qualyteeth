import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'apps/qualyteeth-patient/src/app/services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm: FormGroup;
  isSubmitted = false;

  /**
   *
   */
  constructor(
    private nav: NavController,
    private authSvc: AuthService,
    private fb: FormBuilder,
    private alertCtrl: AlertController) {

    this.loginForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(8)]]
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
    this.isSubmitted = true;
    try {
      await this.authSvc.login(this.loginForm.controls['email'].value, this.loginForm.controls['password'].value);
      // this.modalCtrl.dismiss();
      this.nav.navigateRoot('tabs/odontogram');
    } catch (e) {
      console.log(e)
      if (!e.ok && e.status === 401) {
        const alert = await this.alertCtrl.create({
          header: 'Accès refusé',
          message: 'Mauvais email ou mot de passe',
          buttons: ['OK']
        });
        await alert.present();
      }
    }
  }

  /**
   *
   */
  async signin(): Promise<void> {
    this.nav.navigateForward('signin');
    // await this.modalCtrl.dismiss();
    // const modal = await this.modalCtrl.create({
    //   component: SigninPage,
    // });
    // return await modal.present();
  }

}
