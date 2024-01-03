import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { DiagnosticService } from 'apps/qualyteeth-dentist/src/app/services/diagnostic.service';
import { PractitionerService } from 'apps/qualyteeth-dentist/src/app/services/practitioner.service';
import { PredicamentService } from 'apps/qualyteeth-dentist/src/app/services/predicament.service';
import { PredicamentDto } from 'libs/shared/src/lib/dto/predicament.dto';

@Component({
  selector: 'app-edit-diagnostic-definition',
  templateUrl: './edit-diagnostic-definition.page.html',
  styleUrls: ['./edit-diagnostic-definition.page.scss'],
})
export class EditDiagnosticDefinitionPage {

  d: PredicamentDto;
  private newDefinition: boolean;
  predicament: PredicamentDto;
  private dentistId: number;

  nameCtrl: FormControl;

  /**
   *
   */
  constructor(
    private predicamentSvc: PredicamentService,
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

  // /**
  //  *
  //  */
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

}
