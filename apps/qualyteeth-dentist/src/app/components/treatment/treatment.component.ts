import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Patient } from 'libs/shared/src/lib/patient.entity';
import { Predicament } from 'libs/shared/src/lib/predicament.entity';
// import { TreatmentPage } from 'apps/qualyteeth-dentist/src/app/pages/treatment.old/treatment.page';

@Component({
  selector: 'treatment',
  templateUrl: './treatment.component.html',
  styleUrls: ['./treatment.component.scss'],
})
export class TreatmentComponent implements OnInit {

  @Input() treatment: Treatment;
  @Input() patient: Patient;

  /**
   *
   */
  constructor(
    private modalCtrl: ModalController,
  ) {
  }

  /**
   *
   */
  ngOnInit() { }

  /**
   *
   */
  async details(): Promise<void> {
    // const modal = await this.modalCtrl.create({
    //   component: TreatmentPage,
    //   componentProps: {
    //     'treatment': this.treatment,
    //     'patient': this.patient
    //   }
    // });
    // return await modal.present();
  }

}
