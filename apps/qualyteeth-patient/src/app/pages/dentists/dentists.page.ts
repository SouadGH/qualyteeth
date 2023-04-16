import { Component, OnInit } from '@angular/core';
import { ModalController, NavController, PopoverController } from '@ionic/angular';
import { ToolbarMenuComponent } from 'apps/qualyteeth-patient/src/app/components/toolbar-menu/toolbar-menu.component';
import { Dentist } from 'libs/shared/src/lib/dentist.entity';
import { DentistService } from 'apps/qualyteeth-patient/src/app/services/dentist.service';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { AddDentistPage } from '../dentist/add-dentist/add-dentist.page';
import { QrScannerPage } from '../qr-scanner/qr-scanner.page';

@Component({
  selector: 'app-dentists',
  templateUrl: './dentists.page.html',
  styleUrls: ['./dentists.page.scss'],
})
export class DentistsPage implements OnInit {

  dentists: Array<Dentist> = new Array<Dentist>();

  /**
   *
   */
  constructor(
    private dentistSvc: DentistService,
    private popoverCtrl: PopoverController,
    private nav: NavController,
    private modalCtrl: ModalController,
    private bottomSheet: MatBottomSheet,
  ) {

  }

  /**
   *
   */
  async ngOnInit() { }

  /**
   *
   */
  async ionViewWillEnter() {
    this.dentists = await this.dentistSvc.findConnectedDentists();
  }

  /**
   *
   */
  async toDentist(dentist: Dentist): Promise<void> {
    // if (dentist.status === RequestStatus.REJECTED) {
    //   const alert = await this.alertCtrl.create({
    //     header: 'Refusé',
    //     message: 'Vous ne pouvez accéder à un dentiste qui a refusé votre invitation',
    //     buttons: ['OK']
    //   });
    //   await alert.present();
    //   return;
    // }
    this.nav.navigateForward('tabs/dentists/' + dentist.id)
  }

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
  async addDentist(): Promise<void> {
    const modal = await this.modalCtrl.create({
      component: AddDentistPage,
      componentProps: {
        'dentists': this.dentists,
      }
    });
    await modal.present();
    modal.onDidDismiss().then(async () => {
      this.dentists = await this.dentistSvc.findConnectedDentists();
    })
  }

  /**
   *
   */
  async scanQrCode(): Promise<void> {
    const modal = await this.modalCtrl.create({
      component: QrScannerPage,
    });
    await modal.present();
    modal.onDidDismiss().then(async (data) => {
      console.log(data);
    })
  }

  /**
   *
   */
  async openBottomSheet(): Promise<void> {
    const bottomSheetRef = this.bottomSheet.open(DentistBottomSheet);

    bottomSheetRef.afterDismissed().subscribe(async action => {
      if (action === 'scan_qr_code') {
        await this.scanQrCode();
      } else if (action === 'add_dentist') {
        await this.addDentist();
      }
    });
  }

}

@Component({
  selector: 'dentist-bottom-sheet',
  template: `
    <ion-list lines="none">
      <ion-item button (click)="addDentist()">
        <ion-label>Ajouter Dentiste</ion-label>
      </ion-item>
      <ion-item button (click)="scanQRCode()">
      <ion-label>Scanner QR Code</ion-label>
    </ion-item>
    </ion-list>
  `,
})
export class DentistBottomSheet {
  constructor(private bottomSheetRef: MatBottomSheetRef<DentistBottomSheet>) { }

  /**
   *
   */
  addDentist(): void {
    this.bottomSheetRef.dismiss('add_dentist');
  }

  /**
   *
   */
  scanQRCode(): void {
    this.bottomSheetRef.dismiss('scan_qr_code');
  }
}

