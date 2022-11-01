import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { toDataURL } from 'qrcode'
import { Dentist } from 'libs/shared/src/lib/dentist.interface';
import { DentistService } from 'apps/qualyteeth-dentist/src/app/services/dentist.service';

@Component({
  selector: 'app-qr-code',
  templateUrl: './qr-code.page.html',
  styleUrls: ['./qr-code.page.scss'],
})
export class QrCodePage implements OnInit {

  dentist: Dentist;
  qrCode: string;
  loading: boolean;

  /**
   *
   */
  constructor(
    private modalCtrl: ModalController,
    private dentistSvc: DentistService) { }

  /**
   *
   */
  ngOnInit() { }

  /**
   *
   */
  async ionViewWillEnter() {
    this.loading = true;
    this.dentist = await this.dentistSvc.getDentist();
  }

  /**
   *
   */
  async ionViewDidEnter() {
    await this.generateQR(this.dentist.id + ';' + this.dentist.email);
    this.loading = false;
  }

  /**
   *
   */
  async generateQR(text: string) {
    try {
      this.qrCode = await toDataURL(text, { width: 320 });
    } catch (err) {
      console.error(err)
    }
  }

  /**
   *
   */
  async close(): Promise<void> {
    await this.modalCtrl.dismiss();
  }

}
