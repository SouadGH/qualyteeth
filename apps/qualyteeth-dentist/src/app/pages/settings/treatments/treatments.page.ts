import { Component, OnInit } from '@angular/core';
import { AlertController, NavController, PopoverController, ToastController } from '@ionic/angular';
import { TreatmentDefinition } from 'libs/shared/src/lib/treatment-definition.entity';
import { TreatmentService } from 'apps/qualyteeth-dentist/src/app/services/treatment.service';

@Component({
  selector: 'app-treatments',
  templateUrl: './treatments.page.html',
  styleUrls: ['./treatments.page.scss'],
})
export class TreatmentsPage implements OnInit {

  loading: boolean = true;
  treatments: Array<TreatmentDefinition> = new Array<TreatmentDefinition>();

  columns = ['name', 'creator', 'created', 'edit']

  /**
   *
   */
  constructor(
    private treatmentSvc: TreatmentService,
    private nav: NavController,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private popoverCtrl: PopoverController,
  ) { }

  /**
   *
   */
  ngOnInit() { }

  /**
   *
   */
  async ionViewWillEnter(): Promise<void> {
    await this.loadData();
  }

  /**
   *
   */
  async loadData(): Promise<void> {
    this.loading = true;
    this.treatments = await this.treatmentSvc.getDefinitionsForDentist();
    this.loading = false;
    console.log(this.treatments)
  }

  /**
   *
   */
  async add(): Promise<void> {
    this.nav.navigateForward(`admin/treatments/edit-treatment-definition/`)
  }

  /**
   *
   */
   async edit(t: TreatmentDefinition): Promise<void> {
    this.nav.navigateForward(`admin/treatments/edit-treatment-definition/${t.id}`)
  }

  /**
   *
   */
  async delete(t: TreatmentDefinition): Promise<void> {
    // ev.stopImmediatePropagation();

    const alert = await this.alertCtrl.create({
      header: 'Supprimer Traitement',
      message: `Etes-vous sûr de vouloir supprimer ce traitement?`,
      buttons: [
        { text: 'Non' },
        {
          text: 'Oui', handler: async () => {
            await this.treatmentSvc.deleteDefinition(t.id);
            await this.loadData();

            const toast = await this.toastCtrl.create({
              message: 'Traitement supprimé!',
              duration: 2000
            });
            await toast.present();
          }
        }
      ]
    });
    await alert.present();
  }

  /**
   *
   */
  async more(ev: Event, t: TreatmentDefinition): Promise<void> {
    ev.stopImmediatePropagation();

    const popover = await this.popoverCtrl.create({
      component: EditTreatmentDefinitionPopover,
      event: ev,
      translucent: true
    });
    await popover.present();
    popover.onDidDismiss().then(async r => {
      if (r.data != null) {
        if (r.data === 'edit') {
          await this.edit(t);
        }
        else if (r.data === 'delete') {
          await this.delete(t);
        }
      }
    })
  }

}

@Component({
  template: `
  <ion-list lines="none">
    <ion-item button (click)="popoverCtrl.dismiss('edit')">
      <ion-label>Modifier</ion-label>
    </ion-item>
    <ion-item button (click)="popoverCtrl.dismiss('delete')">
      <ion-label>Supprimer</ion-label>
    </ion-item>
  </ion-list>
  `,
  styleUrls: ['./treatments.page.scss'],
})
export class EditTreatmentDefinitionPopover {

  /**
   *
   */
  constructor(
    public popoverCtrl: PopoverController,
  ) { }

}
