import { Component, OnInit } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { AlertController, ModalController, NavController, PopoverController, ToastController } from '@ionic/angular';
import { ServiceDefinition } from 'libs/shared/src/lib/service-definition.entity';
import { Surgery } from 'libs/shared/src/lib/surgery.entity';
import { Treatment } from 'libs/shared/src/lib/treatment.entity';
import { ServicingService } from 'apps/qualyteeth-dentist/src/app/services/servicing.service';
import { SurgeryService } from 'apps/qualyteeth-dentist/src/app/services/surgery.service';
import { EditServicePage } from './edit-service/edit-service.page';

@Component({
  selector: 'app-services',
  templateUrl: './services.page.html',
  styleUrls: ['./services.page.scss'],
})
export class ServicesPage implements OnInit {

  loading: boolean = true;
  treatments: Array<Treatment> = new Array<Treatment>();
  services: Array<ServiceDefinition> = new Array<ServiceDefinition>();
  dentists: Array<any> = new Array<any>();
  surgeries: Array<Surgery>;
  activeSurgery: any;

  columns = ['category', 'name', 'createdBy', 'createdAt', 'edit']

  /**
   *
   */
  constructor(
    private nav: NavController,
    private popoverCtrl: PopoverController,
    private toastCtrl: ToastController,
    public surgerySvc: SurgeryService,
    private modalCtrl: ModalController,
    private servicingSvc: ServicingService,
    private alertCtrl: AlertController,
  ) {
  }

  /**
   *
   */
  async ionViewWillEnter(): Promise<void> {
    this.surgeries = await this.surgerySvc.getSurgeriesForDentist();
    this.activeSurgery = this.surgeries.find(s => s.active);
    if (this.activeSurgery == null) {
      this.activeSurgery = ''
    }
    await this.loadData();
  }

  /**
   *
   */
  async loadData(): Promise<void> {
    this.loading = true;

    if (this.activeSurgery == null || this.activeSurgery === '') {
      this.services = await this.servicingSvc.getDefinitionsForDentist();
    }
    else {
      this.services = await this.servicingSvc.getDefinitionsForSurgery(this.activeSurgery.id);
    }
    
    this.loading = false;
  }

  /**
   *
   */
  ngOnInit() { }

  /**
   *
   */
  // async pop(ev: any): Promise<void> {
  //   const popover = await this.popoverCtrl.create({
  //     component: ToolbarMenuComponent,
  //     event: ev,
  //     translucent: true
  //   });
  //   return await popover.present();
  // }

  /**
   *
   */
  async add(): Promise<void> {
    this.nav.navigateForward(`admin/services/edit-service/`)
  }

  /**
   *
   */
  async edit(service: ServiceDefinition): Promise<void> {
    this.nav.navigateForward(`admin/services/edit-service/${service.id}`)
  }

  /**
   *
   */
  async delete(service: ServiceDefinition): Promise<void> {

    const alert = await this.alertCtrl.create({
      header: 'Supprimer service',
      message: `Etes-vous sûr de vouloir supprimer ce service`,
      buttons: [
        { text: 'Non' },
        {
          text: 'Oui', handler: async () => {
            service.deleted = true;
            await this.servicingSvc.updateDefinition(service);
            this.services = await this.servicingSvc.getDefinitionsForDentist();

            const toast = await this.toastCtrl.create({
              message: 'Service supprimé!',
              duration: 2000
            });
            await toast.present();
          }
        }
      ]
    });
    await alert.present();
    alert.onDidDismiss().then(async r => {
      await this.loadData();
    })
  }

  /**
   *
   */
  async more(ev: Event, s: ServiceDefinition): Promise<void> {
    ev.stopImmediatePropagation();

    const popover = await this.popoverCtrl.create({
      component: EditServicePopover,
      event: ev,
      translucent: true,
    });
    await popover.present();
    popover.onDidDismiss().then(async r => {
      if (r.data != null) {
        if (r.data === 'edit') {
          await this.edit(s);
        }
        else if (r.data === 'delete') {
          await this.delete(s);
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
  styleUrls: ['./services.page.scss'],
})
export class EditServicePopover {

  /**
   *
   */
  constructor(
    public popoverCtrl: PopoverController,
  ) { }

}
