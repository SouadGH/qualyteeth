import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { BarcodeFormat } from '@zxing/library';
import { ZXingScannerComponent } from '@zxing/ngx-scanner';
import { AuthService } from 'apps/qualyteeth-patient/src/app/services/auth.service';

@Component({
  selector: 'app-qr-scanner',
  templateUrl: './qr-scanner.page.html',
  styleUrls: ['./qr-scanner.page.scss'],
})
export class QrScannerPage implements OnInit {

  @ViewChild('scanner', { static: false }) scanner: ZXingScannerComponent

  formatsEnabled: BarcodeFormat[] = [
    BarcodeFormat.CODE_128,
    BarcodeFormat.DATA_MATRIX,
    BarcodeFormat.EAN_13,
    BarcodeFormat.QR_CODE,
  ];;

  /**
   *
   */
  constructor(
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private authSvc: AuthService
  ) { }

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
  async scanSuccess(e): Promise<void> {
    const channel = e;
    this.authSvc.connectToChannel(channel);

    // const toast = await this.toastCtrl.create({
    //   message: 'QR Code scanné avec succès!',
    //   duration: 2000
    // });
    // await toast.present();
    await this.modalCtrl.dismiss(e);
  }

  /**
   *
   */
  // async scanComplete(e): Promise<void> {
  //   console.log(e)
  // }

  /**
   *
   */
  async scanError(e): Promise<void> {
    const alert = await this.alertCtrl.create({
      header: 'Erreur',
      message: 'Impossible de scanner le QR Code. Veuillez réessayer',
      buttons: ['OK']
    });
    await alert.present();
  }

  /**
   *
   */
  async scanFailure(e): Promise<void> {
    const alert = await this.alertCtrl.create({
      header: 'Erreur',
      message: 'Impossible de scanner le QR Code. Veuillez réessayer',
      buttons: ['OK']
    });
    await alert.present();
  }

}
