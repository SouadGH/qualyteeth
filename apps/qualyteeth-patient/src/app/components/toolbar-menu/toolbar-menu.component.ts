import { Component, OnInit } from '@angular/core';
import { ModalController, NavController, PopoverController } from '@ionic/angular';
import { LoginPage } from 'apps/qualyteeth-patient/src/app/pages/auth/login/login.page';
import { FeedbackPage } from 'apps/qualyteeth-patient/src/app/pages/feedback/feedback.page';
import { ProfilePage } from 'apps/qualyteeth-patient/src/app/pages/profile/profile.page';
import { QrScannerPage } from 'apps/qualyteeth-patient/src/app/pages/qr-scanner/qr-scanner.page';
import { AuthService } from 'apps/qualyteeth-patient/src/app/services/auth.service';

@Component({
  selector: 'app-toolbar-menu',
  templateUrl: './toolbar-menu.component.html',
  styleUrls: ['./toolbar-menu.component.scss'],
})
export class ToolbarMenuComponent implements OnInit {

  /**
   *
   */
  constructor(
    private popoverCtrl: PopoverController,
    private modalCtrl: ModalController,
    private nav: NavController,
    public auth: AuthService
  ) { }

  /**
   *
   */
  ngOnInit() { }

  /**
   *
   */
  async test(): Promise<void> {
    this.popoverCtrl.dismiss();
  }

  /**
   *
   */
  async profile(): Promise<void> {
    await this.popoverCtrl.dismiss();
    const modal = await this.modalCtrl.create({
      component: ProfilePage,
    });
    return await modal.present();
  }

  /**
   *
   */
  async scan(): Promise<void> {
    await this.popoverCtrl.dismiss();
    const modal = await this.modalCtrl.create({
      component: QrScannerPage,
    });
    return await modal.present();
  }

  /**
   *
   */
  async logout(): Promise<void> {
    await this.popoverCtrl.dismiss();
    await this.auth.logout();
    this.nav.navigateRoot('login');
  }

  /**
   *
   */
  async login(): Promise<void> {
    await this.popoverCtrl.dismiss();
    const modal = await this.modalCtrl.create({
      component: LoginPage,
    });
    return await modal.present();
  }

  /**
   *
   */
  async feedback(): Promise<void> {
    await this.popoverCtrl.dismiss();
    const modal = await this.modalCtrl.create({
      component: FeedbackPage,
    });
    return await modal.present();
  }

}
