import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Treatment } from 'libs/shared/src/lib/treatment.interface';
import { TreatmentPage } from 'apps/qualyteeth-patient/src/app/pages/treatment/treatment.page';

@Component({
  selector: 'treatment',
  templateUrl: './treatment.component.html',
  styleUrls: ['./treatment.component.scss'],
})
export class TreatmentComponent implements OnInit {

  @Input() treatment: Treatment;

  /**
   *
   */
  constructor(
    private modalCtrl: ModalController,
  ) { }

  /**
   *
   */
  ngOnInit() { }

  /**
   *
   */
  async details(): Promise<void> {
    const modal = await this.modalCtrl.create({
      component: TreatmentPage,
      componentProps: {
        'treatment': this.treatment,
      }
    });
    return await modal.present();
  }

}
