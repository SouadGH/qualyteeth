import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController, NavController } from '@ionic/angular';
import { AuthService } from 'apps/qualyteeth-dentist/src/app/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
<<<<<<< HEAD
import { StorageService } from '../../../services/storage.service';
import { UserDto } from 'libs/shared/src/lib/dto/user.dto';
=======
>>>>>>> c6740c8dc4e6e69e5f3be7ef55127ed511d52617


@Component({
  selector: 'qualyteeth-app-login',
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
<<<<<<< HEAD
    private storageSvc: StorageService,
=======
>>>>>>> c6740c8dc4e6e69e5f3be7ef55127ed511d52617
    private modalCtrl: ModalController,
    private authSvc: AuthService,
    private nav: NavController,
    private fb: FormBuilder,
    // private surgerySvc: SurgeryService,
    // private dentistSvc: PractitionerService,
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
  async ionViewWillEnter(): Promise<void> {
<<<<<<< HEAD
    this.loginForm.controls['email'].setValue("dentiste1@gmail.com");
    this.loginForm.controls['password'].setValue("123456789");
=======
>>>>>>> c6740c8dc4e6e69e5f3be7ef55127ed511d52617
    if (this.authSvc.isAuthenticated) {
      this.nav.navigateRoot('patients');
      // const user: Dentist = await this.dentistSvc.getDentist();
      // const surgery: Surgery = await this.surgerySvc.getSurgeryForDentist();
      // if (surgery == null) {
      //   this.authSvc.signinData = {
      //     id: user.id
      //   }
      //   this.nav.navigateRoot('create-surgery');
      // } else {
      //   this.nav.navigateRoot('surgery');
      // }
    }
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
  async login(): Promise<void> {
<<<<<<< HEAD
    

    this.isSubmitted = true;
    try {
     let user:UserDto =  await this.authSvc.login(this.loginForm.controls['email'].value, this.loginForm.controls['password'].value);
     
      this.nav.navigateRoot('patients');
=======
    this.isSubmitted = true;
    try {
      await this.authSvc.login(this.loginForm.controls['email'].value, this.loginForm.controls['password'].value);
      this.nav.navigateRoot('patients')
>>>>>>> c6740c8dc4e6e69e5f3be7ef55127ed511d52617
    } catch (e) {
      if (!e.ok && e.status === 401) {
        const alert = await this.alertCtrl.create({
          header: 'Accès refusé',
          message: 'Mauvais email ou mot de passe',
          buttons: ['OK']
        });
        await alert.present();
      } else {
        console.error(e);
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
