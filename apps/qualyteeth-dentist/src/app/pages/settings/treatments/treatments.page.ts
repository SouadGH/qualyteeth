import { Component, OnInit } from '@angular/core';
import { AlertController, NavController, PopoverController, ToastController } from '@ionic/angular';
import { TreatmentService } from 'apps/qualyteeth-dentist/src/app/services/treatment.service';
<<<<<<< HEAD
import { PredicamentDto, PredicamentType } from 'libs/shared/src/lib/dto/predicament.dto';
import { PredicamentService } from '../../../services/predicament.service';
=======
import { PredicamentDto } from 'libs/shared/src/lib/dto/predicament.dto';
>>>>>>> c6740c8dc4e6e69e5f3be7ef55127ed511d52617

@Component({
  selector: 'app-treatments',
  templateUrl: './treatments.page.html',
  styleUrls: ['./treatments.page.scss'],
})
export class TreatmentsPage implements OnInit {

  loading: boolean = true;
  treatments: Array<PredicamentDto> = new Array<PredicamentDto>();

  columns = ['name', 'creator', 'created', 'edit']

  /**
   *
   */
  constructor(
<<<<<<< HEAD
    private predicamentSvc: PredicamentService,
=======
>>>>>>> c6740c8dc4e6e69e5f3be7ef55127ed511d52617
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
<<<<<<< HEAD
    this.treatments = await this.predicamentSvc.getDefinition(PredicamentType.TREATMENT);
   
=======
>>>>>>> c6740c8dc4e6e69e5f3be7ef55127ed511d52617
    // this.treatments = await this.treatmentSvc.getDefinitionsForDentist();
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
   async edit(t: PredicamentDto): Promise<void> {
    this.nav.navigateForward(`admin/treatments/edit-treatment-definition/${t.id}`)
  }

  /**
   *
   */
  async delete(t: PredicamentDto): Promise<void> {
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
  async more(ev: Event, t: PredicamentDto): Promise<void> {
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
