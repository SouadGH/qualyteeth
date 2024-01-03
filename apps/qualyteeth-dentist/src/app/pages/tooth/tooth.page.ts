import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToothService } from 'apps/qualyteeth-dentist/src/app/services/tooth.service';
import { TreatmentService } from 'apps/qualyteeth-dentist/src/app/services/treatment.service';
import { ModalController } from '@ionic/angular';
import { PatientService } from 'apps/qualyteeth-dentist/src/app/services/patient.service';
import { StorageService } from 'apps/qualyteeth-dentist/src/app/services/storage.service';
import { PredicamentDto } from 'libs/shared/src/lib/dto/predicament.dto';
import { ToothDto } from 'libs/shared/src/lib/dto/tooth.dto';
import { PatientDto } from 'libs/shared/src/lib/dto/patient.dto';

@Component({
  selector: 'app-odontogram-tooth',
  templateUrl: './tooth.page.html',
  styleUrls: ['./tooth.page.scss'],
})
export class ToothPage implements OnInit {

  tooth: ToothDto;
  patient: PatientDto;
  dentistId: string;
  treatments: Array<PredicamentDto> = new Array<PredicamentDto>();

  /**
   *
   */
  constructor(
    private toothSvc: ToothService,
    private treatmentSvc: TreatmentService,
    private modalCtrl: ModalController,
    private patientSvc: PatientService,
    private storageSvc: StorageService,
    private activtedRoute: ActivatedRoute) {

  }

  /**
   *
   */
  async ionViewWillEnter(): Promise<void> {
    const patientId = this.activtedRoute.snapshot.paramMap.get('patient_id');
    const fdiNumber = parseInt(this.activtedRoute.snapshot.paramMap.get('fdi_number'));
    this.dentistId = await this.storageSvc.getUserid();

    this.patient = await this.patientSvc.getPatient(patientId);
    this.tooth = await this.toothSvc.getTooth(fdiNumber);
    // this.treatments = await this.treatmentSvc.getTreatmentsForPatientAndDentistAndTooth(this.patient.id, this.dentistId, this.tooth.fdiNumber);
  }

  /**
   *
   */
  ngOnInit() { }

  /**
   *
   */
  // async newTreatment(): Promise<void> {
    // const modal = await this.modalCtrl.create({
    //   component: AddTreatmentPage,
    //   componentProps: {
    //     'patientId': this.patient.id,
    //     'dentistId': this.dentistId,
    //     'toothFdiNumber': this.tooth.fdiNumber
    //   }
    // });
    // await modal.present();
    // modal.onDidDismiss().then(async () => {
    //   this.treatments = await this.treatmentSvc.getTreatmentsForPatientAndDentistAndTooth(this.patient.id, this.dentistId, this.tooth.fdiNumber);
    // })
  // }
}
