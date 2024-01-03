import { Component, OnInit } from '@angular/core';
import { ModalController, NavController, PopoverController } from '@ionic/angular';
import { ToolbarMenuComponent } from 'apps/qualyteeth-patient/src/app/components/toolbar-menu/toolbar-menu.component';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { AddDentistPage } from '../dentist/add-dentist/add-dentist.page';
import { QrScannerPage } from '../qr-scanner/qr-scanner.page';
import { Surgery } from 'libs/shared/src/lib/surgery.entity';
import { SurgeryService } from 'apps/qualyteeth-patient/src/app/services/surgery.service';
import { AddSurgeryPage } from './add-surgery/add-surgery.page';

@Component({
  selector: 'app-surgeries',
  templateUrl: './surgeries.page.html',
  styleUrls: ['./surgeries.page.scss'],
})
export class SurgeriesPage implements OnInit {

  surgeries: Array<Surgery> = new Array<Surgery>();

  /**
   *
   */
  constructor(
    private popoverCtrl: PopoverController,
    private nav: NavController,
    private modalCtrl: ModalController,
    private bottomSheet: MatBottomSheet,
    private surgerySvc: SurgeryService
  ) { }

  /**
   *
   */
  ngOnInit() { }

  /**
   *
   */
  async ionViewWillEnter() {
    this.surgeries = await this.surgerySvc.getSurgeriesForPatient();
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
    const bottomSheetRef = this.bottomSheet.open(SurgeriesBottomSheet);

    bottomSheetRef.afterDismissed().subscribe(async action => {
      if (action === 'scan_qr_code') {
        await this.scanQrCode();
      } else if (action === 'add_surgery') {
        await this.addSurgery();
      } else if (action === 'add_dentist') {
        await this.addDentist();
      }
    });
  }

  /**
   *
   */
  async addSurgery(): Promise<void> {
    const modal = await this.modalCtrl.create({
      component: AddSurgeryPage,
      componentProps: {
        'surgeries': this.surgeries,
      }
    });
    await modal.present();
    modal.onDidDismiss().then(async () => {
      this.surgeries = await this.surgerySvc.getSurgeriesForPatient();
    })
  }

  /**
   *
   */
  async addDentist(): Promise<void> {
    const modal = await this.modalCtrl.create({
      component: AddDentistPage,
    });
    await modal.present();
    modal.onDidDismiss().then(async () => {
      this.surgeries = await this.surgerySvc.getSurgeriesForPatient();
    })
  }

}

@Component({
  selector: 'surgeries-bottom-sheet',
  template: `
    <ion-list lines="none">
      <ion-item button (click)="addSurgery()">
        <ion-label>Rechercher Clinique</ion-label>
      </ion-item>
      <ion-item button (click)="addDentist()">
        <ion-label>Rechercher Clinique via Dentiste</ion-label>
      </ion-item>
      <ion-item button (click)="scanQRCode()">
        <ion-label>Scanner QR Code</ion-label>
      </ion-item>
    </ion-list>
  `,
})
export class SurgeriesBottomSheet {
  constructor(private bottomSheetRef: MatBottomSheetRef<SurgeriesBottomSheet>) { }

  /**
   *
   */
  addSurgery(): void {
    this.bottomSheetRef.dismiss('add_surgery');
  }

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
