import { Component, OnInit } from '@angular/core';
import { ModalController, NavController, PopoverController } from '@ionic/angular';
import { AppComponent } from 'apps/qualyteeth-dentist/src/app/app.component';
import { ToolbarMenuComponent } from 'apps/qualyteeth-dentist/src/app/components/toolbar-menu/toolbar-menu.component';
import { Dentist } from 'libs/shared/src/lib/dentist.interface';
import { Surgery } from 'libs/shared/src/lib/surgery.interface';
import { AppService } from 'apps/qualyteeth-dentist/src/app/services/app.service';
import { DentistService } from 'apps/qualyteeth-dentist/src/app/services/dentist.service';
import { ServicingService } from 'apps/qualyteeth-dentist/src/app/services/servicing.service';
import { SurgeryService } from 'apps/qualyteeth-dentist/src/app/services/surgery.service';
import { LinkServicePage } from './link-service/link-service.page';

@Component({
  selector: 'app-dentists',
  templateUrl: './dentists.page.html',
  styleUrls: ['./dentists.page.scss'],
})
export class DentistsPage implements OnInit {

  loading: boolean = true;
  // surgery: Surgery;
  dentists: Array<any> = new Array<any>();

  columns = ['lastname', 'firstname', 'color', 'edit']

  /**
   *
   */
  constructor(
    private appSvc: AppService,
    private popoverCtrl: PopoverController,
    public surgerySvc: SurgeryService,
    private dentistSvc: DentistService,
    private nav: NavController,
    private servicingSvc: ServicingService,
    private modalCtrl: ModalController
  ) {
  }

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
    // this.surgery = await this.surgerySvc.getActiveSurgeryForDentist();
    // this.dentists = await this.surgerySvc.getDentistsForSurgery(this.surgery.id);

    // this.dentists.forEach(async d => {
    //   d.services = await this.servicingSvc.getServicesForDentistAndSurgery(d.id, this.surgery.id);
    //   // d.patients = await this.dentistSvc.getPatientsForDentist(d.id);
    // })

    this.loading = false;
  }

  /**
   *
   */
  ngOnInit() { }

  /**
   *
   */
  async pop(ev: any): Promise<void> {
    const popover = await this.popoverCtrl.create({
      component: ToolbarMenuComponent,
      event: ev,
      translucent: true
    });
    return await popover.present();
  }

  /**
   *
   */
  // async edit(ev: any, dentist: any): Promise<void> {
  //   const popover = await this.popoverCtrl.create({
  //     component: EditDentistComponent,
  //     event: ev,
  //     translucent: true
  //   });
  //   await popover.present();
  //   popover.onDidDismiss().then(async r => {
  //     if (r.data != null) {
  //       if (r.data === 'link-service') {

  //         const services = await this.servicingSvc.getForDentist();

  //         const modal = await this.modalCtrl.create({
  //           component: LinkServicePage,
  //           componentProps: {
  //             // 'dentists': this.dentists,
  //             'surgery': this.surgery,
  //             'dentist': dentist,
  //             'services': services
  //           }
  //         });
  //         await modal.present();
  //         modal.onDidDismiss().then(async r => {
  //           await this.loadData();
  //         })
  //       }
  //       else if (r.data === 'view-calendar') {
  //         this.appSvc.currentPage = 'calendar';
  //         this.nav.navigateForward('calendar');
  //       }
  //     }
  //   })
  // }

  /**
   *
   */
  async onColorPickerChanged(e: string, d: Dentist): Promise<void> {
    // console.log(e)
    d.color = e === 'none' ? null: e;
    // console.log(d.color)
    await this.dentistSvc.update(d);
  }

  /**
   *
   */
   async add(): Promise<void> {
    this.nav.navigateForward(`admin/dentists/edit-dentist/`)
  }

  /**
   *
   */
   async edit(d: Dentist): Promise<void> {
    this.nav.navigateForward(`admin/dentists/edit-dentist/${d.id}`)
  }

  /**
   *
   */
   async services(d: Dentist): Promise<void> {
    this.nav.navigateForward(`admin/dentists/edit-dentist/${d.id}`)
  }

  /**
   *
   */
   async more(ev: Event, d: Dentist): Promise<void> {
    ev.stopImmediatePropagation();

    const popover = await this.popoverCtrl.create({
      component: EditDentistPopover,
      event: ev,
      translucent: true,
      componentProps: {

      }
    });
    await popover.present();
    popover.onDidDismiss().then(async r => {
      if (r.data != null) {
        if (r.data === 'edit') {
          await this.edit(d);
        } else if (r.data === 'services') {
          await this.services(d);
        }
        // else if (r.data === 'delete') {
        //   await this.delete(t);
        // }
      }
    })
  }

}

@Component({
  // selector: 'app-edit-dentist',
  template: `
  <ion-list lines="none">
    <ion-item button (click)="popoverCtrl.dismiss('link-service')">
      <ion-icon name="bandage-outline" slot="start"></ion-icon>
      <ion-label>Modifier Services</ion-label>
    </ion-item>
    <ion-item button (click)="popoverCtrl.dismiss('view-calendar')">
      <ion-icon name="calendar-outline" slot="start"></ion-icon>
      <ion-label>Voir Calendrier</ion-label>
    </ion-item>
  </ion-list>
  `,
  styleUrls: ['./edit-dentist.component.scss'],
})
export class EditDentistComponent {

  /**
   *
   */
  constructor(
    public popoverCtrl: PopoverController,
  ) { }

}

@Component({
  template: `
  <ion-list lines="none">
    <ion-item button (click)="popoverCtrl.dismiss('edit')">
      <ion-label>Modifier</ion-label>
    </ion-item>
    <ion-item button (click)="popoverCtrl.dismiss('services')">
      <ion-label>Services</ion-label>
    </ion-item>
  </ion-list>
  `,
  styleUrls: ['./dentists.page.scss'],
})
export class EditDentistPopover {

  /**
   *
   */
  constructor(
    public popoverCtrl: PopoverController,
  ) { }

}