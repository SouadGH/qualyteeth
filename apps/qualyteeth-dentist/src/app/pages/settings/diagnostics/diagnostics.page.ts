import { Component } from '@angular/core';
<<<<<<< HEAD
import { AlertController, NavController, PopoverController, ToastController } from '@ionic/angular';
import { PredicamentService } from '../../../services/predicament.service';
import { PredicamentDto, PredicamentType } from 'libs/shared/src/lib/dto/predicament.dto';
=======
import { PopoverController } from '@ionic/angular';
>>>>>>> c6740c8dc4e6e69e5f3be7ef55127ed511d52617

@Component({
  selector: 'app-diagnostics',
  templateUrl: './diagnostics.page.html',
  styleUrls: ['./diagnostics.page.scss'],
})
export class DiagnosticsPage {

  // loading: boolean = true;
<<<<<<< HEAD
   //diagnostics: Array<DiagnosticDefinition> = new Array<DiagnosticDefinition>();
   diagnostics: Array<PredicamentDto> = new Array<PredicamentDto>();

   columns = ['name', 'creator', 'created', 'edit']
=======
  // diagnostics: Array<DiagnosticDefinition> = new Array<DiagnosticDefinition>();

  // columns = ['name', 'creator', 'created', 'edit']
>>>>>>> c6740c8dc4e6e69e5f3be7ef55127ed511d52617

  // /**
  //  *
  //  */
<<<<<<< HEAD
   constructor(
    private predicamentSvc: PredicamentService,
     //private diagnosticSvc: DiagnosticService,
     private nav: NavController,
     private alertCtrl: AlertController,
     private toastCtrl: ToastController,
     private popoverCtrl: PopoverController,
   ) { }
=======
  // constructor(
  //   private diagnosticSvc: DiagnosticService,
  //   private nav: NavController,
  //   private alertCtrl: AlertController,
  //   private toastCtrl: ToastController,
  //   private popoverCtrl: PopoverController,
  // ) { }
>>>>>>> c6740c8dc4e6e69e5f3be7ef55127ed511d52617

  // /**
  //  *
  //  */
<<<<<<< HEAD
   ngOnInit() { }
=======
  // ngOnInit() { }
>>>>>>> c6740c8dc4e6e69e5f3be7ef55127ed511d52617

  // /**
  //  *
  //  */
<<<<<<< HEAD
   async ionViewWillEnter(): Promise<void> {
   // alert("hello");
     await this.loadData();
   }
=======
  // async ionViewWillEnter(): Promise<void> {
  //   await this.loadData();
  // }
>>>>>>> c6740c8dc4e6e69e5f3be7ef55127ed511d52617

  // /**
  //  *
  //  */
<<<<<<< HEAD
   async loadData(): Promise<void> {
    this.diagnostics = await this.predicamentSvc.getDefinition(PredicamentType.DIAGNOSTIC);
    console.log("predicaments definition"+JSON.stringify(this.diagnostics))
=======
  // async loadData(): Promise<void> {
>>>>>>> c6740c8dc4e6e69e5f3be7ef55127ed511d52617
  //   this.loading = true;
  //   this.diagnostics = await this.diagnosticSvc.getDefinitionsForDentist();
  //   this.loading = false;
  //   console.log(this.diagnostics)
<<<<<<< HEAD
   }
=======
  // }
>>>>>>> c6740c8dc4e6e69e5f3be7ef55127ed511d52617

  // /**
  //  *
  //  */
<<<<<<< HEAD
   async add(): Promise<void> {
     this.nav.navigateForward(`admin/diagnostics/edit-diagnostic-definition/`)
   }
=======
  // async add(): Promise<void> {
  //   this.nav.navigateForward(`admin/diagnostics/edit-diagnostic-definition/`)
  // }
>>>>>>> c6740c8dc4e6e69e5f3be7ef55127ed511d52617

  // /**
  //  *
  //  */
<<<<<<< HEAD
   async delete(predicament: PredicamentDto): Promise<void> {
  //   // ev.stopImmediatePropagation();

     const alert = await this.alertCtrl.create({
       header: 'Supprimer Predicament',
       message: `Etes-vous sûr de vouloir supprimer ce predicament?`,
       buttons: [
         { text: 'Non' },
         {
           text: 'Oui', handler: async () => {
             //d.deleted = true;
             await this.predicamentSvc.delete(predicament);
             await this.loadData();

             const toast = await this.toastCtrl.create({
               message: 'Predicament supprimé!',
               duration: 2000
             });
             await toast.present();
           }
         }
       ]
     });
     await alert.present();
   }
=======
  // async delete(d: DiagnosticDefinition): Promise<void> {
  //   // ev.stopImmediatePropagation();

  //   const alert = await this.alertCtrl.create({
  //     header: 'Supprimer Diagnostique',
  //     message: `Etes-vous sûr de vouloir supprimer ce diagnostique?`,
  //     buttons: [
  //       { text: 'Non' },
  //       {
  //         text: 'Oui', handler: async () => {
  //           d.deleted = true;
  //           await this.diagnosticSvc.updateDefinition(d);
  //           await this.loadData();

  //           const toast = await this.toastCtrl.create({
  //             message: 'Diagnostique supprimé!',
  //             duration: 2000
  //           });
  //           await toast.present();
  //         }
  //       }
  //     ]
  //   });
  //   await alert.present();
  // }
>>>>>>> c6740c8dc4e6e69e5f3be7ef55127ed511d52617

  // /**
  // *
  // */
<<<<<<< HEAD
   async edit(d: PredicamentDto): Promise<void> {
    console.log("definitionId before details :"+d.id);
     this.nav.navigateForward(`admin/diagnostics/edit-diagnostic-definition/${d.id}`)
   }
=======
  // async edit(d: DiagnosticDefinition): Promise<void> {
  //   this.nav.navigateForward(`admin/diagnostics/edit-diagnostic-definition/${d.id}`)
  // }
>>>>>>> c6740c8dc4e6e69e5f3be7ef55127ed511d52617

  // /**
  //  *
  //  */
  // async more(ev: Event, d: DiagnosticDefinition): Promise<void> {
<<<<<<< HEAD
    async more(ev: Event, d: PredicamentDto): Promise<void> {
  //   ev.stopImmediatePropagation();

     const popover = await this.popoverCtrl.create({
       component: EditDiagnosticDefinitionPopover,
     event: ev,
       translucent: true,
       // componentProps: {
       //   'isSystem': d.dentistId == null
       // },
     });
     await popover.present();
     popover.onDidDismiss().then(async r => {
       if (r.data != null) {
         if (r.data === 'edit') {
          console.log ("predic is :"+JSON.stringify(d));
           await this.edit(d);
         }
         else if (r.data === 'delete') {
           await this.delete(d);
         }
     }
     })
   }
=======
  //   ev.stopImmediatePropagation();

  //   const popover = await this.popoverCtrl.create({
  //     component: EditDiagnosticDefinitionPopover,
  //     event: ev,
  //     translucent: true,
  //     // componentProps: {
  //     //   'isSystem': d.dentistId == null
  //     // },
  //   });
  //   await popover.present();
  //   popover.onDidDismiss().then(async r => {
  //     if (r.data != null) {
  //       if (r.data === 'edit') {
  //         await this.edit(d);
  //       }
  //       else if (r.data === 'delete') {
  //         await this.delete(d);
  //       }
  //     }
  //   })
  // }
>>>>>>> c6740c8dc4e6e69e5f3be7ef55127ed511d52617

}

@Component({
  template: `
  <ion-list lines="none">
    <ion-item button (click)="popoverCtrl.dismiss('edit')">
      <ion-label>Modifier</ion-label>
    </ion-item>
    <ion-item button (click)="popoverCtrl.dismiss('delete')">
      <ion-label>Supprimer</ion-label>
    </ion-item>
  </ion-list>
  `,
  styleUrls: ['./diagnostics.page.scss'],
})
export class EditDiagnosticDefinitionPopover {

  /**
   *
   */
  constructor(
    public popoverCtrl: PopoverController,
  ) { }

}
