import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { TreatmentService } from 'apps/qualyteeth-dentist/src/app/services/treatment.service';
import { ActDto } from 'libs/shared/src/lib/dto/act.dto';

@Component({
  selector: 'app-add-act',
  templateUrl: './add-act.page.html',
  styleUrls: ['./add-act.page.scss'],
})
export class AddActPage implements OnInit {

  private allActs: Array<ActDto>;
  acts: Array<ActDto>;

  columns = ['id', 'name']

  /**
   *
   */
  constructor(
    private modalCtrl: ModalController,
    private treatmentSvc: TreatmentService,
    private navParams: NavParams
  ) { }

  /**
   *
   */
  ngOnInit() { }
  
  /**
   *
   */
  async ionViewWillEnter(): Promise<void> {
    const actIds: Array<string> = this.navParams.get('actIds');

    this.allActs = await this.treatmentSvc.getActs();
    this.allActs = this.allActs.filter(a => actIds.indexOf(a.id) === -1);
    this.acts = [...this.allActs];
  }

  /**
   *
   */
  async close(): Promise<void> {
    this.modalCtrl.dismiss();
  }

  /**
   *
   */
   async search(e): Promise<void> {
    this.acts = [...this.allActs];
    if (!e || !e.detail || !e.detail.value || e.detail.value === '') {
      return;
    }
    const v = e.detail.value.toLowerCase();
    this.acts = this.acts.filter(e => e.name.toLowerCase().indexOf(v) > -1);
  }

  /**
   *
   */
   async select(act: ActDto): Promise<void> {
    this.modalCtrl.dismiss(act);
   }

}
