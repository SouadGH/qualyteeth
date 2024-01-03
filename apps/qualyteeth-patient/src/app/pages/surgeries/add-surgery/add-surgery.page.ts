import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController, NavParams } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Surgery } from 'libs/shared/src/lib/surgery.entity';
import { SurgeryService } from 'apps/qualyteeth-patient/src/app/services/surgery.service';

@Component({
  selector: 'app-add-surgery',
  templateUrl: './add-surgery.page.html',
  styleUrls: ['./add-surgery.page.scss'],
})
export class AddSurgeryPage implements OnInit {

  existingSurgeries: Array<Surgery>;

  searchSurgeryForm: FormGroup;
  isSubmitted = false;

  /**
   *
   */
  constructor(
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private surgerySvc: SurgeryService,
    private navParams: NavParams,
    private fb: FormBuilder) {

    this.searchSurgeryForm = this.fb.group({
      name: [null, [Validators.required]],
      postalCode: [null, [Validators.required]]
    });

    this.existingSurgeries = this.navParams.get('existingSurgeries') || new Array<Surgery>() ;
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
  async search(): Promise<void> {
    const name = this.searchSurgeryForm.controls['name'].value;
    const postalCode = this.searchSurgeryForm.controls['postalCode'].value;

    try {
      const s = await this.surgerySvc.search(name, postalCode);

      const i = this.existingSurgeries.findIndex(es => es.id === s.id);
      if (i > -1) {
        const alert = await this.alertCtrl.create({
          header: 'Déjà existant',
          message: `Le cabinet ${s.name} est présent dans votre liste de cabinets`,
          buttons: ['OK']
        });
        await alert.present();
        return;
      }

      const alert = await this.alertCtrl.create({
        header: 'Ajouter Cabinet',
        message: `Voulez-vous ajouter le cabinet ${s.name} ?`,
        buttons: [
          { text: 'Non' },
          {
            text: 'Oui', handler: async () => {
              await this.surgerySvc.link(s.id);
              await this.modalCtrl.dismiss();
            }
          }
        ]
      });
      await alert.present();
    } catch (e) {
      if (!e.ok && e.status === 404) {
        const alert = await this.alertCtrl.create({
          header: 'Cabinet inexistant',
          message: 'Aucun cabinet trouvé',
          buttons: ['OK']
        });
        await alert.present();
      } else {
        console.error(e);
      }
    }

  }

}
