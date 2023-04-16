import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController, NavParams } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DentistService } from 'apps/qualyteeth-patient/src/app/services/dentist.service';
import { Dentist } from 'libs/shared/src/lib/dentist.entity';

@Component({
  selector: 'app-add-dentist',
  templateUrl: './add-dentist.page.html',
  styleUrls: ['./add-dentist.page.scss'],
})
export class AddDentistPage implements OnInit {

  availableDentists: Array<Dentist> = new Array<Dentist>();
  linkedDentists: Array<Dentist> = new Array<Dentist>();

  searchDentistForm: FormGroup;
  isSubmitted = false;

  /**
   *
   */
  constructor(
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private dentistSvc: DentistService,
    private navParams: NavParams,
    private fb: FormBuilder) {

    this.searchDentistForm = this.fb.group({
      firstname: [null, [Validators.required]],
      lastname: [null, [Validators.required]],
      postalCode: [null, [Validators.required]]
    });

    this.linkedDentists = this.navParams.get('dentists');
  }

  /**
   *
   */
  ngOnInit() { }

  /**
   *
   */
  async ionViewWillEnter(): Promise<void> {
    const allDentists = await this.dentistSvc.findAll();
    const linkedDentistsIds = this.linkedDentists.map(d => d.id);
    this.availableDentists = allDentists.filter(d => linkedDentistsIds.indexOf(d.id) === -1);
  }

  /**
   *
   */
  async select(d: Dentist): Promise<void> {
    const alert = await this.alertCtrl.create({
      header: 'Ajouter Dentiste',
      message: `Voulez-vous ajouter ${d.firstname} ${d.lastname} dans la liste de vos dentistes?`,
      buttons: [
        { text: 'Non' },
        {
          text: 'Oui', handler: async () => {
            await this.dentistSvc.connect(d.id);
            await this.modalCtrl.dismiss();
          }
        }
      ]
    });
    await alert.present();
  }

  /**
   *
   */
  async close(): Promise<void> {
    await this.modalCtrl.dismiss();
  }

  /**
   *
   */
  // async search(): Promise<void> {
  //   const firstname = this.searchDentistForm.controls['firstname'].value;
  //   const lastname = this.searchDentistForm.controls['lastname'].value;
  //   const postalCode = this.searchDentistForm.controls['postalCode'].value;

  //   try {
  //     const d = await this.dentistSvc.search(firstname, lastname, postalCode);

  //     const i = this.dentists.findIndex(ed => ed.id === d.id);
  //     if (i > -1) {
  //       const alert = await this.alertCtrl.create({
  //         header: 'Déjà existant',
  //         message: `${d.firstname} ${d.lastname} est déjà dans votre liste de dentistes`,
  //         buttons: ['OK']
  //       });
  //       await alert.present();
  //       return;
  //     }

  //     const alert = await this.alertCtrl.create({
  //       header: 'Ajouter Dentiste',
  //       message: `Voulez-vous ajouter ${d.firstname} ${d.lastname} dans la liste de vos dentistes?`,
  //       buttons: [
  //         { text: 'Non' },
  //         {
  //           text: 'Oui', handler: async () => {
  //             // await this.dentistSvc.connect(d.id);
  //             await this.modalCtrl.dismiss();
  //           }
  //         }
  //       ]
  //     });
  //     await alert.present();
  //   } catch (e) {
  //     if (!e.ok && e.status === 404) {
  //       const alert = await this.alertCtrl.create({
  //         header: 'Dentiste inexistant',
  //         message: 'Aucun dentiste trouvé',
  //         buttons: ['OK']
  //       });
  //       await alert.present();
  //     }
  //   }

  // }

}
