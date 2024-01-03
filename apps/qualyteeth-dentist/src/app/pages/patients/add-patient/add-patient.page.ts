import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, ToastController } from '@ionic/angular';
import { PatientService } from 'apps/qualyteeth-dentist/src/app/services/patient.service';
import { PatientDto } from 'libs/shared/src/lib/dto/patient.dto';
import { UserDto, UserType } from 'libs/shared/src/lib/dto/user.dto';

@Component({
  selector: 'app-add-patient',
  templateUrl: './add-patient.page.html',
  styleUrls: ['./add-patient.page.scss'],
})
export class AddPatientPage implements OnInit {

  patientForm: FormGroup;
  isSubmitted = false;

  /**
   *
   */
  constructor(
    private patientSvc: PatientService,
    private fb: FormBuilder,
    private nav: NavController,
    private toastCtrl: ToastController,
  ) {
    this.patientForm = this.fb.group({
      firstname: [null, [Validators.required]],
      lastname: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      phoneNumber: [null],
    });
  }

  /**
   *
   */
  ngOnInit() { }

  /**
   *
   */
  async add(): Promise<void> {
    const firstname: string = this.patientForm.controls['firstname'].value.trim();
    const lastname: string = this.patientForm.controls['lastname'].value.trim();
    let email: string = this.patientForm.controls['email'].value.trim();
    let phoneNumber: string = this.patientForm.controls['phoneNumber'].value;

    phoneNumber = phoneNumber != null ? phoneNumber.trim() : phoneNumber;

    // if ((email == null || email === '') && (phoneNumber == null || phoneNumber === '')) {
    //   const alert = await this.alertCtrl.create({
    //     header: 'Erreur',
    //     message: 'Veuillez entrer soit un e-mail, soit un numéro de téléphone valide',
    //     buttons: ['OK']
    //   });
    //   await alert.present();
    //   return
    // }

    // const userData: UserDto = {
    //   type: UserType.PATIENT,
    //   firstname: firstname,
    //   lastname: lastname,
    //   email: email,
    //   phoneNumber: phoneNumber,
    // }

    const patient: PatientDto = {
      email: email,
      firstname: firstname,
      lastname: lastname,
      // user: userData
    }

    try {
      await this.patientSvc.add(patient);

      const toast = await this.toastCtrl.create({
        message: 'Patient créé!',
        duration: 2000
      });
      await toast.present();
      this.nav.back();

    } catch (e) {
      if (e.error != null && e.error.statusCode === 409) {
        const toast = await this.toastCtrl.create({
          message: 'Un patient avec le même email existe déjà',
          duration: 4000
        });
        await toast.present();
      } else {
        const toast = await this.toastCtrl.create({
          message: 'Une erreur est survenue. Veuillez réessayer',
          duration: 4000
        });
        await toast.present();
      }
    }

    // this.modalCtrl.dismiss();
  }

}
