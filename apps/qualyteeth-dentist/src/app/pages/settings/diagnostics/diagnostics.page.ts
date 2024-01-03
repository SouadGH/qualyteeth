import { Component } from '@angular/core';
import { AlertController, NavController, PopoverController, ToastController } from '@ionic/angular';
import { PredicamentService } from '../../../services/predicament.service';
import { PredicamentDto, PredicamentType } from 'libs/shared/src/lib/dto/predicament.dto';

@Component({
  selector: 'app-diagnostics',
  templateUrl: './diagnostics.page.html',
  styleUrls: ['./diagnostics.page.scss'],
})
export class DiagnosticsPage {

  // loading: boolean = true;
   //diagnostics: Array<DiagnosticDefinition> = new Array<DiagnosticDefinition>();
   diagnostics: Array<PredicamentDto> = new Array<PredicamentDto>();

   columns = ['name', 'creator', 'created', 'edit']

  // /**
  //  *
  //  */
   constructor(
    private predicamentSvc: PredicamentService,
     //private diagnosticSvc: DiagnosticService,
     private nav: NavController,
     private alertCtrl: AlertController,
     private toastCtrl: ToastController,
     private popoverCtrl: PopoverController,
   ) { }

  // /**
  //  *
  //  */
   ngOnInit() { }

  // /**
  //  *
  //  */
   async ionViewWillEnter(): Promise<void> {
   // alert("hello");
     await this.loadData();
   }

  // /**
  //  *
  //  */
   async loadData(): Promise<void> {
    this.diagnostics = await this.predicamentSvc.getDefinition(PredicamentType.DIAGNOSTIC);
    console.log("predicaments definition"+JSON.stringify(this.diagnostics))
  //   this.loading = true;
  //   this.diagnostics = await this.diagnosticSvc.getDefinitionsForDentist();
  //   this.loading = false;
  //   console.log(this.diagnostics)
   }

  // /**
  //  *
  //  */
   async add(): Promise<void> {
     this.nav.navigateForward(`admin/diagnostics/edit-diagnostic-definition/`)
   }

  // /**
  //  *
  //  */
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

  // /**
  // *
  // */
   async edit(d: PredicamentDto): Promise<void> {
    console.log("definitionId before details :"+d.id);
     this.nav.navigateForward(`admin/diagnostics/edit-diagnostic-definition/${d.id}`)
   }

  // /**
  //  *
  //  */
  // async more(ev: Event, d: DiagnosticDefinition): Promise<void> {
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
