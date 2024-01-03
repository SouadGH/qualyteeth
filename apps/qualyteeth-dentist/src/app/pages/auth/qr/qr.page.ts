import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'apps/qualyteeth-dentist/src/app/services/auth.service';
import { SseService } from 'apps/qualyteeth-dentist/src/app/services/sse.service';
import { create, QRCode, toCanvas } from 'qrcode'
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-qr',
  templateUrl: './qr.page.html',
  styleUrls: ['./qr.page.scss'],
})
export class QrPage implements OnInit {

  @ViewChild('canvas', { static: false }) canvas: ElementRef;
  qrCode: string;

  private channel: string;

  /**
   *
   */
  constructor(
    private authSvc: AuthService,
    private nav: NavController,
    private sseSvc: SseService) { }

  /**
   *
   */
  async ngOnInit() {
    const d = await this.authSvc.getQRChannel();
    this.channel = d['channel'];

    const code: QRCode = create(this.channel, {});
    if (this.canvas != null) {
      toCanvas(this.canvas.nativeElement, code.segments, { scale: 10 })
    }

    // const result = await this.sseSvc.getQRCodeSSeEvent(this.channel).toPromise();
    // this.nav.navigateRoot(`patients/${result['patientId']}`)
  }

  // /**
  //  *
  //  */
  // async connect(): Promise<void> {
  //   this.authSvc.connectToChannel(this.channel);
  // }

}
