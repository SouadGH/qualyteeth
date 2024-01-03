import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { DiagnosticService } from 'apps/qualyteeth-dentist/src/app/services/diagnostic.service';
import { PractitionerService } from 'apps/qualyteeth-dentist/src/app/services/practitioner.service';
<<<<<<< HEAD
import { PredicamentService } from 'apps/qualyteeth-dentist/src/app/services/predicament.service';
=======
>>>>>>> c6740c8dc4e6e69e5f3be7ef55127ed511d52617
import { PredicamentDto } from 'libs/shared/src/lib/dto/predicament.dto';

@Component({
  selector: 'app-edit-diagnostic-definition',
  templateUrl: './edit-diagnostic-definition.page.html',
  styleUrls: ['./edit-diagnostic-definition.page.scss'],
})
export class EditDiagnosticDefinitionPage {

  d: PredicamentDto;
  private newDefinition: boolean;
<<<<<<< HEAD
  predicament: PredicamentDto;
=======

>>>>>>> c6740c8dc4e6e69e5f3be7ef55127ed511d52617
  private dentistId: number;

  nameCtrl: FormControl;

  /**
   *
   */
  constructor(
<<<<<<< HEAD
    private predicamentSvc: PredicamentService,
=======
>>>>>>> c6740c8dc4e6e69e5f3be7ef55127ed511d52617
    private diagnosticSvc: DiagnosticService,
    private activtedRoute: ActivatedRoute,
    private dentistSvc: PractitionerService,
    private nav: NavController,
  ) {
    this.nameCtrl = new FormControl('', [Validators.required]);
  }

  // /**
  //  *
  //  */
<<<<<<< HEAD
  async ionViewWillEnter(): Promise<void> {
    //const definitionId:any = parseInt(this.activtedRoute.snapshot.paramMap.get('def_id'));
    const definitionId = this.activtedRoute.snapshot.paramMap.get('def_id');

    this.predicament = await this.predicamentSvc.getById(definitionId);
    console.log("this.predicament :" + JSON.stringify(this.predicament));
    //   this.dentistId = await this.dentistSvc.getPractitionerId();
    // this.newDefinition = definitionId == null || Number.isNaN(definitionId);

    //   if (this.newDefinition) {
    //  this.d = {
    //       id: null,
    //    name: null,
    //       createdBy: this.dentistId,
    //       createdOn: null
    // categories: null, acts:null, interventions:null,
    //type:0
    //   }
    //   } else {
    //     this.d = await this.diagnosticSvc.getDefinition(definitionId)
    //   }

    this.nameCtrl.setValue(this.predicament.name);
  }
=======
  // async ionViewWillEnter(): Promise<void> {
  //   const definitionId = parseInt(this.activtedRoute.snapshot.paramMap.get('def_id'));

  //   this.dentistId = await this.dentistSvc.getPractitionerId();
  //   this.newDefinition = definitionId == null || Number.isNaN(definitionId);

  //   if (this.newDefinition) {
  //     this.d = {
  //       id: null,
  //       name: null,
  //       createdBy: this.dentistId,
  //       createdOn: null
  //     }
  //   } else {
  //     this.d = await this.diagnosticSvc.getDefinition(definitionId)
  //   }

  //   this.nameCtrl.setValue(this.d.name);
  // }
>>>>>>> c6740c8dc4e6e69e5f3be7ef55127ed511d52617

  // /**
  //  *
  //  */
<<<<<<< HEAD
  async save(): Promise<void> {
    //   if (this.nameCtrl.value == null || this.nameCtrl.value === '') {
    //     this.nameCtrl.markAsTouched();
    //     this.nameCtrl.setErrors({ 'required': true });
    //     return;
    //   }
    await this.predicamentSvc.update(this.predicament);
   // await this.predicamentSvc.save(this.d);
   // if (this.newDefinition) {
    //  await this.predicamentSvc.save(this.d);
   // }
    //   else {
    //   //   await this.diagnosticSvc.updateDefinition(this.d);
    //   // }

       await this.nav.back();
  }
=======
  // async save(): Promise<void> {
  //   if (this.nameCtrl.value == null || this.nameCtrl.value === '') {
  //     this.nameCtrl.markAsTouched();
  //     this.nameCtrl.setErrors({ 'required': true });
  //     return;
  //   }

  //   // if (this.newDefinition) {
  //   //   await this.diagnosticSvc.saveDefinition(this.d);
  //   // } else {
  //   //   await this.diagnosticSvc.updateDefinition(this.d);
  //   // }

  //   await this.nav.back();
  // }
>>>>>>> c6740c8dc4e6e69e5f3be7ef55127ed511d52617

}
