import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatTable } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { ModalController, NavController, PopoverController } from '@ionic/angular';
import { Act } from 'libs/shared/src/lib/act.entity';
import { TreatmentDefinition } from 'libs/shared/src/lib/treatment-definition.entity';
import { DentistService } from 'apps/qualyteeth-dentist/src/app/services/dentist.service';
import { TreatmentService } from 'apps/qualyteeth-dentist/src/app/services/treatment.service';
import { AddActPage } from '../add-act/add-act.page';

@Component({
  selector: 'app-edit-treatment-definition',
  templateUrl: './edit-treatment-definition.page.html',
  styleUrls: ['./edit-treatment-definition.page.scss'],
})
export class EditTreatmentDefinitionPage implements OnInit {

  @ViewChild('actsTable') table: MatTable<Act>;

  t: TreatmentDefinition;
  private newDefinition: boolean;

  private dentistId: number;

  columns = ['nb', 'position', 'actId', 'name', 'more']

  nameCtrl: FormControl;

  /**
   *
   */
  constructor(
    private treatementSvc: TreatmentService,
    private activtedRoute: ActivatedRoute,
    private dentistSvc: DentistService,
    private modalCtrl: ModalController,
    private nav: NavController,
  ) {
    this.nameCtrl = new FormControl('', [Validators.required]);
  }

  /**
   *
   */
  ngOnInit() { }

  /**
   *
   */
  async ionViewWillEnter(): Promise<void> {
    const treatmentDefinitionId = parseInt(this.activtedRoute.snapshot.paramMap.get('def_id'));

    this.dentistId = await this.dentistSvc.getDentistId();
    this.newDefinition = treatmentDefinitionId == null || Number.isNaN(treatmentDefinitionId);

    if (this.newDefinition) {
      this.t = {
        id: null,
        acts: new Array<Act>(),
        name: null,
        createdBy: this.dentistId,
        createdOn: null
      }
    } else {
      this.t = await this.treatementSvc.getTreatmentDefinition(treatmentDefinitionId)
      this.t.acts = await this.treatementSvc.getActsForDefinition(this.t.id)
    }

    this.nameCtrl.setValue(this.t.name);
  }

  /**
   *
   */
  async delete(act: Act): Promise<void> {
    this.t.acts = this.t.acts.filter(a => a.id !== act.id);
  }

  /**
   *
   */
  dropTable(event: CdkDragDrop<Act[]>) {
    const prevIndex = this.t.acts.findIndex((a) => a === event.item.data);
    moveItemInArray(this.t.acts, prevIndex, event.currentIndex);
    if (this.table != null) {
      this.table.renderRows();
    }
  }

  /**
   *
   */
  async save(): Promise<void> {
    if (this.nameCtrl.value == null || this.nameCtrl.value === '') {
      this.nameCtrl.markAsTouched();
      this.nameCtrl.setErrors({ 'required': true });
      return;
    }

    if (this.newDefinition) {
      await this.treatementSvc.saveDefinition(this.t);
    } else {
      await this.treatementSvc.updateDefinition(this.t);
    }

    await this.nav.back();
  }

  /**
   *
   */
  // async editAct(ev, act): Promise<void> {
  //   console.log(act)

  //   const popover = await this.popoverCtrl.create({
  //     component: EditActComponent,
  //     event: ev,
  //     translucent: true
  //   });
  //   await popover.present();
  //   popover.onDidDismiss().then(async (r) => {
  //     if (r.data != null) {
  //       console.log(r)
  //     }
  //   })
  // }

  /**
   *
   */
  async addAct(ev: MouseEvent): Promise<void> {
    const modal = await this.modalCtrl.create({
      component: AddActPage,
      componentProps: {
        actIds: this.t.acts.map(a => a.id)
      }
    });
    await modal.present();
    const r: any = await modal.onDidDismiss();
    if (r.data != null) {
      this.t.acts.push(r.data);
      if (this.table != null) {
        this.table.renderRows();
      }
    }
  }

}

@Component({
  template: `
    <ion-item button (click)="popoverCtrl.dismiss('edit')" lines="none">
      <ion-label>Editer</ion-label>
    </ion-item>
    <ion-item button (click)="popoverCtrl.dismiss('delete')" lines="none">
      <ion-label>Supprimer</ion-label>
    </ion-item>
  `,
  styleUrls: ['./edit-treatment-definition.page.scss'],
})
export class EditActComponent {

  /**
   *
   */
  constructor(
    public popoverCtrl: PopoverController,
  ) { }

}
