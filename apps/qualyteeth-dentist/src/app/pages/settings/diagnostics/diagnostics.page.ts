import { Component } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-diagnostics',
  templateUrl: './diagnostics.page.html',
  styleUrls: ['./diagnostics.page.scss'],
})
export class DiagnosticsPage {

  // loading: boolean = true;
  // diagnostics: Array<DiagnosticDefinition> = new Array<DiagnosticDefinition>();

  // columns = ['name', 'creator', 'created', 'edit']

  // /**
  //  *
  //  */
  // constructor(
  //   private diagnosticSvc: DiagnosticService,
  //   private nav: NavController,
  //   private alertCtrl: AlertController,
  //   private toastCtrl: ToastController,
  //   private popoverCtrl: PopoverController,
  // ) { }

  // /**
  //  *
  //  */
  // ngOnInit() { }

  // /**
  //  *
  //  */
  // async ionViewWillEnter(): Promise<void> {
  //   await this.loadData();
  // }

  // /**
  //  *
  //  */
  // async loadData(): Promise<void> {
  //   this.loading = true;
  //   this.diagnostics = await this.diagnosticSvc.getDefinitionsForDentist();
  //   this.loading = false;
  //   console.log(this.diagnostics)
  // }

  // /**
  //  *
  //  */
  // async add(): Promise<void> {
  //   this.nav.navigateForward(`admin/diagnostics/edit-diagnostic-definition/`)
  // }

  // /**
  //  *
  //  */
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

  // /**
  // *
  // */
  // async edit(d: DiagnosticDefinition): Promise<void> {
  //   this.nav.navigateForward(`admin/diagnostics/edit-diagnostic-definition/${d.id}`)
  // }

  // /**
  //  *
  //  */
  // async more(ev: Event, d: DiagnosticDefinition): Promise<void> {
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
