import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, NavController } from '@ionic/angular';
import { Surgery } from 'libs/shared/src/lib/surgery.interface';
import { AuthService } from 'apps/qualyteeth-dentist/src/app/services/auth.service';
import { SurgeryService } from 'apps/qualyteeth-dentist/src/app/services/surgery.service';
import { Dentist } from 'libs/shared/src/lib/dentist.interface';
import { DentistService } from '../../../services/dentist.service';

@Component({
  selector: 'app-create-surgery',
  templateUrl: './create-surgery.page.html',
  styleUrls: ['./create-surgery.page.scss'],
})
export class CreateSurgeryPage implements OnInit {

  surgeryForm: FormGroup;
  isSubmitted = false;

  surgeryCode: number;

  /**
   *
   */
  constructor(
    private nav: NavController,
    private fb: FormBuilder,
    public authSvc: AuthService,
    private alertCtrl: AlertController,
    private surgerySvc: SurgeryService,
    private dentistSvc: DentistService
  ) {

    // if (this.authSvc.signinData == null) {
    //   this.nav.navigateRoot('signin');
    //   return;
    // }

    this.surgeryForm = this.fb.group({
      name: [null, [Validators.required]],
      addressLine1: [null, [Validators.required]],
      addressLine2: [null],
      zipCode: [null, [Validators.required]],
      city: [null, [Validators.required]],
    });
  }

  /**
   *
   */
  async ngOnInit() { }

  /**
   *
   */
  async ionViewDidEnter(): Promise<void> {
    // const tmpToken = await this.authSvc.getTempToken();
    // console.log(tmpToken);
  }

  /**
   *
   */
  async back(): Promise<void> {
    this.nav.pop();
  }

  /**
   *
   */
  async createSurgery(): Promise<void> {

    const name: string = this.surgeryForm.controls['name'].value.trim();
    const addressLine1: string = this.surgeryForm.controls['addressLine1'].value.trim();
    const addressLine2: string = this.surgeryForm.controls['addressLine2'].value;
    const postalCode: string = this.surgeryForm.controls['zipCode'].value;
    const city: string = this.surgeryForm.controls['city'].value.trim();

    const d: Dentist = await this.dentistSvc.getDentist();

    const surgery: Surgery = {
      id: null,
      name: name,
      addressLine1: addressLine1,
      addressLine2: addressLine2,
      city: city,
      postalCode: postalCode,
      active: false,
      createdBy: d.id,
      deleted: false,
      createdOn: null
    }

    surgery.id = await this.surgerySvc.save(surgery);
    // await this.authSvc.activate();
    this.nav.navigateRoot('patients');
  }

  /**
   *
   */
  async joinSurgery(): Promise<void> {

    const surgery: Surgery = await this.surgerySvc.getSurgery(this.surgeryCode)

    if (surgery == null) {
      const alert = await this.alertCtrl.create({
        header: 'Erreur',
        message: 'Impossible de trouver un cabinet pour ce code',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }

    await this.surgerySvc.link(surgery);
    // await this.authSvc.activate();
    this.nav.navigateRoot('patients');
  }

}
