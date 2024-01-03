import { Component, OnInit } from '@angular/core';
import { AlertController, NavController, NavParams, PopoverController, ToastController } from '@ionic/angular';
import { SurgeryService } from 'apps/qualyteeth-dentist/src/app/services/surgery.service';
import { Surgery } from 'apps/qualyteeth-server/src/core/surgery/surgery.entity';

@Component({
  selector: 'app-join-surgery',
  templateUrl: './join-surgery.page.html',
  styleUrls: ['./join-surgery.page.scss'],
})
export class JoinSurgeryPage implements OnInit {
  loading: boolean = true;
  surgeries: Array<Surgery> = new Array<Surgery>();
  surgeriesJoined: Array<Surgery> = new Array<Surgery>();
  surgeriesNotJoined: Array<Surgery> = new Array<Surgery>();
  surgeryCode: string;
  columns = [ 'name','city', 'default','edit'];
 isJoined :boolean;
  /**
   *
   */
  constructor(
    private popoverCtrl: PopoverController,
    private popoverCtrl1: PopoverController,
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
async ionViewWillEnter(): Promise<void> {
  await this.loadData();
}
  /**
   *
   */
  async loadData(): Promise<void> {
    this.loading = true;
    this.surgeriesJoined =  await this.surgerySvc.getSurgeriesForPractitioner();
   
     this.surgeries = await this.surgerySvc.getSurgeries();
     console.log("this.surgeriesJoined :"+this.surgeriesJoined);
     this.surgeriesJoined = this.surgeriesJoined.sort((a, b) => {
       const aName = a.name.toLowerCase();
       const bName = b.name.toLowerCase();


       return aName < bName ? -1 : aName > bName ? 1 : 0;
     });
    this.surgeriesJoined.forEach(el=>{

      const index = this.surgeries.findIndex(sg => sg.id === el.id);
      if (index > -1) {
        console.log("Prac existant is : "+JSON.stringify(el));
      
        this.surgeries.splice(index,1);     
       }
    }
    

      ); 
      console.log("this.surgeries :"+this.surgeries);

    // this.surgeries.forEach(async (s: any) => {
    //   // s.dentists = await this.surgerySvc.getDentistsForSurgery(s.id);
    //   // s.patients = await this.surgerySvc.getPatienstForSurgery(s.id);
    // });

    // this.activeSurgery = this.surgeries.find(s => s.active);
    // this.services = await this.servicingSvc.getForDentist();
    // this.dentists = await this.surgerySvc.getDentistsForSurgery(this.activeSurgery.id);

    // this.dentists.forEach(async d => {
    //   d.services = await this.servicingSvc.getServicesForDentistAndSurgery(d.id, this.activeSurgery.id)
    //   // d.patients = await this.dentistSvc.getPatientsForDentist(d.id);
    // })

    // this.patients = await this.surgerySvc.getPatienstForSurgery(this.activeSurgery.id);
    this.loading = false;
  }
/*  async isJoin(id: string):Promise<boolean>{
    const surgeriesJoined: Array<Surgery> = await this.surgerySvc.getSurgeriesForPractitioner();
    console.log("liste surgeries liée à ce dentiste :"+JSON.stringify(surgeriesJoined));
   const idx = surgeriesJoined.findIndex(sg => sg.id === id);
   if (idx > -1) {
   alert(idx);
   this.isJoined = false
   
  }else{alert(idx);this.isJoined = true ;}
  return this.isJoined;
  }*/
  /**
   *
   */
  async join(): Promise<void> {
  alert("this.surgeryCode :"+this.surgeryCode);
    if (this.surgeryCode == null) {
      const alert = await this.alertCtrl.create({
        header: 'Erreur',
        message: 'Veuillez entrer un code',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }

     const s: Surgery = await this.surgerySvc.getSurgery(this.surgeryCode);

    if (s == null) {
      const alert = await this.alertCtrl.create({
        header: 'Erreur',
        message: 'Impossible de trouver un cabinet pour ce code',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }

     const surgeriesJoined: Array<Surgery> = await this.surgerySvc.getSurgeriesForPractitioner();
     console.log("liste surgeries liée à ce dentiste :"+JSON.stringify(surgeriesJoined));
    const idx = surgeriesJoined.findIndex(sg => sg.id === s.id);
    if (idx > -1) {
      const alert = await this.alertCtrl.create({
        header: 'Erreur',
        message: 'Dentiste déjà connecté à ce cabinet',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }

     await this.surgerySvc.link(s);

    const toast = await this.toastCtrl.create({
      message: 'Cabinet rejoint avec succès!',
      duration: 2000
    });
    await toast.present();

    this.nav.pop();
  }


  async more(ev: Event, s: Surgery): Promise<void> {
    //verif isJoin 
    let verifJoin: boolean = false ;
    const surgeriesJoined: Array<Surgery> = await this.surgerySvc.getSurgeriesForPractitioner();
     console.log("liste surgeries liée à ce dentiste :"+JSON.stringify(surgeriesJoined));
    const idx = surgeriesJoined.findIndex(sg => sg.id === s.id);
    if (idx > -1) {
      verifJoin =true;         
    }
    ev.stopImmediatePropagation();

    const popover = await this.popoverCtrl.create({
      component: JoinSurgeryPopover,
      event: ev,
      translucent: true,
      componentProps: {
        isJoin: verifJoin
      }
    });
    await popover.present();
    this.surgeryCode =s.id;
    popover.onDidDismiss().then(async r => {
      if (r.data != null) {
       /* if (r.data === 'edit') {
          await this.join();
        }
        else */if (r.data === 'set') {
        
          await this.surgerySvc.link(s);
          await this.loadData();
          verifJoin = true;
          //this.join();
          //await this.surgerySvc.update(s);
          // await this.surgerySvc.activate(s);
          
        }
        else if (r.data === 'unset') {
          
          // await this.surgerySvc.update(s);
           await this.surgerySvc.unlink(s);
          await this.loadData();
          verifJoin =false;
        }
        else if (r.data === 'delete') {
          if (s.active) {
            const alert = await this.alertCtrl.create({
              header: 'Erreur',
              message: 'Impossible de supprimer un cabinet actif',
              buttons: ['OK']
            });
            await alert.present();
            return;
          }
         // s.deleted = true;
          // await this.surgerySvc.update(s);
          await this.loadData();
        }
      }
    })
  }

}


@Component({
  // selector: 'app-surgery-popover',
  template: `
  <ion-list lines="none">
    <ion-item button (click)="popoverCtrl.dismiss('set')" *ngIf="!isJoin">
      <ion-label>Join</ion-label>
    </ion-item>
    <ion-item button (click)="popoverCtrl.dismiss('unset')" *ngIf="isJoin">
      <ion-label>Disjoin</ion-label>
    </ion-item>
    <!--<ion-item button (click)="popoverCtrl.dismiss('edit')">
      <ion-label>Modifier</ion-label>
    </ion-item>-->
    <!--<ion-item button (click)="popoverCtrl.dismiss('delete')">
    <ion-label>Supprimer</ion-label>
  </ion-item>-->
  </ion-list>
  `,
  styleUrls: ['./join-surgery.page.scss'],
})
export class JoinSurgeryPopover {

  isJoin: boolean;

  /**
   *
   */
  constructor(
    public popoverCtrl: PopoverController,
    private navParams: NavParams
  ) {
    this.isJoin = this.navParams.get('isJoin');
  }
}
