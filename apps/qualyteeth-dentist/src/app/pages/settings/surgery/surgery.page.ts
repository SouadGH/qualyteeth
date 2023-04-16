import { MatFabMenu } from '@angular-material-extensions/fab-menu';
import { Component, OnInit } from '@angular/core';
import { AlertController, NavController, NavParams, PopoverController } from '@ionic/angular';
import { Patient } from 'libs/shared/src/lib/patient.entity';
import { Surgery } from 'libs/shared/src/lib/surgery.entity';
import { SurgeryService } from 'apps/qualyteeth-dentist/src/app/services/surgery.service';

@Component({
  selector: 'app-surgery',
  templateUrl: './surgery.page.html',
  styleUrls: ['./surgery.page.scss'],
})
export class SurgeryPage implements OnInit {

  selectedTab = 0;

  loading: boolean = true;
  surgeries: Array<Surgery> = new Array<Surgery>();
  dentists: Array<any> = new Array<any>();
  patients: Array<Patient> = new Array<Patient>();

  columns = ['id', 'name', 'dentists', 'default', 'edit'];

  addBtns: MatFabMenu[] = [
    { id: 1, icon: 'create', tooltip: 'Nouveau Cabinet', tooltipPosition: 'left', iconColor: 'primary' },
    { id: 2, icon: 'login', tooltip: 'Joindre Cabinet', tooltipPosition: 'left', iconColor: 'primary' },
  ];

  /**
   *
   */
  constructor(
    public surgerySvc: SurgeryService,
    private popoverCtrl: PopoverController,
    private alertCtrl: AlertController,
    private nav: NavController
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
    this.surgeries = await this.surgerySvc.getSurgeriesForDentist();
    this.surgeries = this.surgeries.sort((a, b) => {
      const aName = a.name.toLowerCase();
      const bName = b.name.toLowerCase();

      return aName < bName ? -1 : aName > bName ? 1 : 0;
    });

    this.surgeries.forEach(async (s: any) => {
      s.dentists = await this.surgerySvc.getDentistsForSurgery(s.id);
      // s.patients = await this.surgerySvc.getPatienstForSurgery(s.id);
    });

    // this.activeSurgery = this.surgeries.find(s => s.active);
    // this.services = await this.servicingSvc.getForDentist();
    // this.dentists = await this.surgerySvc.getDentistsForSurgery(this.activeSurgery.id);

    // this.dentists.forEach(async d => {
    //   d.services = await this.servicingSvc.getServicesForDentistAndSurgery(d.id, this.activeSurgery.id)
    //   // d.patients = await this.dentistSvc.getPatientsForDentist(d.id);
    // })

    // this.patients = await this.surgerySvc.getPatienstForSurgery(this.activeSurgery.id);
    this.loading = false;
  }

  /**
   *
   */
  ngOnInit() { }

  /**
   *
   */
  async edit(s: Surgery): Promise<void> {
    this.nav.navigateForward(`admin/surgery/edit-surgery/${s.id}`)
  }

  /**
   *
   */
  async more(ev: Event, s: Surgery): Promise<void> {
    ev.stopImmediatePropagation();

    const popover = await this.popoverCtrl.create({
      component: EditSurgeryPopover,
      event: ev,
      translucent: true,
      componentProps: {
        isActive: s.active
      }
    });
    await popover.present();

    popover.onDidDismiss().then(async r => {
      if (r.data != null) {
        if (r.data === 'edit') {
          await this.edit(s);
        }
        else if (r.data === 'set') {
          await this.surgerySvc.activate(s);
          await this.loadData();
        }
        else if (r.data === 'unset') {
          await this.surgerySvc.deactivate(s);
          await this.loadData();
        }
        else if (r.data === 'delete') {
          if (s.active) {
            const alert = await this.alertCtrl.create({
              header: 'Erreur',
              message: 'Impossible de supprimer un cabinet actif',
              buttons: ['OK']
            });
            await alert.present();
            return;
          }
          s.deleted = true;
          await this.surgerySvc.update(s);
          await this.loadData();
        }
      }
    })
  }

  /**
   *
   */
  async activate(s: Surgery): Promise<void> {
    await this.surgerySvc.activate(s);
    await this.loadData();
  }

  /**
   * 
   */
   async onFabMenuItemSelected(e: string | number): Promise<void> {
    // console.log(e)
    switch (e) {
      case 1:
        this.nav.navigateForward(`admin/surgery/edit-surgery/`)
        break;

      case 2:
        this.nav.navigateForward(`admin/surgery/join-surgery/`)
        break;
    }
  }

  /**
   *
   */
  // async onSurgeryChange(e: MatSelectChange): Promise<void> {
  //   const s: Surgery = e.value;
  //   await this.surgerySvc.activate(s);
  //   await this.loadData();
  // }

}

@Component({
  // selector: 'app-surgery-popover',
  template: `
  <ion-list lines="none">
    <ion-item button (click)="popoverCtrl.dismiss('set')" *ngIf="!isActive">
      <ion-label>Activer</ion-label>
    </ion-item>
    <ion-item button (click)="popoverCtrl.dismiss('unset')" *ngIf="isActive">
      <ion-label>Désactiver</ion-label>
    </ion-item>
    <ion-item button (click)="popoverCtrl.dismiss('edit')">
      <ion-label>Modifier</ion-label>
    </ion-item>
    <ion-item button (click)="popoverCtrl.dismiss('delete')">
    <ion-label>Supprimer</ion-label>
  </ion-item>
  </ion-list>
  `,
  styleUrls: ['./surgery.page.scss'],
})
export class EditSurgeryPopover {

  isActive: boolean;

  /**
   *
   */
  constructor(
    public popoverCtrl: PopoverController,
    private navParams: NavParams
  ) {
    this.isActive = this.navParams.get('isActive');
  }
}