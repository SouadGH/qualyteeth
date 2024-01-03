import { Component, OnInit } from '@angular/core';
import { MenuController, ModalController, NavController, PopoverController } from '@ionic/angular';
import { LoginPage } from 'apps/qualyteeth-dentist/src/app/pages/auth/login/login.page';
import { FeedbackPage } from 'apps/qualyteeth-dentist/src/app/pages/feedback/feedback.page';
import { ProfilePage } from 'apps/qualyteeth-dentist/src/app/pages/profile/profile.page';
import { QrCodePage } from 'apps/qualyteeth-dentist/src/app/pages/qr-code/qr-code.page';
import { SurgeryPage } from 'apps/qualyteeth-dentist/src/app/pages/settings/surgery/surgery.page';
import { AuthService } from 'apps/qualyteeth-dentist/src/app/services/auth.service';

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
    private menuCtrl: MenuController,
    private nav: NavController,
    public auth: AuthService,
  ) { }

  /**
   *
   */
  async ngOnInit() {
    
  }

  /**
   *
   */
  async ionViewWillEnter(): Promise<void> { }

  /**
   *
   */
  async profile(): Promise<void> {
    await this.popoverCtrl.dismiss();
    const modal = await this.modalCtrl.create({
      component: ProfilePage,
    });
    await modal.present();
    await this.menuCtrl.close();
  }

  /**
   *
   */
  async qrCode(): Promise<void> {
    await this.popoverCtrl.dismiss();
    const modal = await this.modalCtrl.create({
      component: QrCodePage,
    });
    await modal.present();
    await this.menuCtrl.close();
  }

  /**
   *
   */
  async logout(): Promise<void> {
    await this.popoverCtrl.dismiss();
    await this.auth.logout();
    this.nav.navigateRoot('');
  }

  /**
   *
   */
  async login(): Promise<void> {
    await this.popoverCtrl.dismiss();
    const modal = await this.modalCtrl.create({
      component: LoginPage,
    });
    await modal.present();
    await this.menuCtrl.close();
  }

  /**
   *
   */
  async feedback(): Promise<void> {
    await this.popoverCtrl.dismiss();
    const modal = await this.modalCtrl.create({
      component: FeedbackPage,
    });
    await modal.present();
    await this.menuCtrl.close();
  }

  /**
   *
   */
  async surgery(): Promise<void> {
    await this.popoverCtrl.dismiss();
    const modal = await this.modalCtrl.create({
      component: SurgeryPage,
    });
    await modal.present();
    await this.menuCtrl.close();
  }

}
