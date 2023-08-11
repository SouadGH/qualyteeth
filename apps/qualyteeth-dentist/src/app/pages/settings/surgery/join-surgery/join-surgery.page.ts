import { Component, OnInit } from '@angular/core';
import { AlertController, NavController, ToastController } from '@ionic/angular';
import { SurgeryService } from 'apps/qualyteeth-dentist/src/app/services/surgery.service';

@Component({
  selector: 'app-join-surgery',
  templateUrl: './join-surgery.page.html',
  styleUrls: ['./join-surgery.page.scss'],
})
export class JoinSurgeryPage implements OnInit {

  surgeryCode: number;

  /**
   *
   */
  constructor(
    private surgerySvc: SurgeryService,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private nav: NavController
  ) { }

  /**
   *
   */
  ngOnInit() { }

  /**
   *
   */
  async join(): Promise<void> {

    if (this.surgeryCode == null) {
      const alert = await this.alertCtrl.create({
        header: 'Erreur',
        message: 'Veuillez entrer un code',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }

    // const s: Surgery = await this.surgerySvc.getSurgery(this.surgeryCode);

    // if (s == null) {
    //   const alert = await this.alertCtrl.create({
    //     header: 'Erreur',
    //     message: 'Impossible de trouver un cabinet pour ce code',
    //     buttons: ['OK']
    //   });
    //   await alert.present();
    //   return;
    // }

    // const surgeries: Array<Surgery> = await this.surgerySvc.getSurgeriesForDentist();
    // const idx = surgeries.findIndex(sg => sg.id === s.id);
    // if (idx > -1) {
    //   const alert = await this.alertCtrl.create({
    //     header: 'Erreur',
    //     message: 'Dentiste déjà connecté à ce cabinet',
    //     buttons: ['OK']
    //   });
    //   await alert.present();
    //   return;
    // }

    // await this.surgerySvc.link(s);

    const toast = await this.toastCtrl.create({
      message: 'Cabinet rejoint avec succès!',
      duration: 2000
    });
    await toast.present();

    this.nav.pop();
  }

}
