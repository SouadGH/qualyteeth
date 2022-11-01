import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { DiagnosticDefinition } from 'libs/shared/src/lib/diagnostic-definition.interface';
import { DentistService } from 'apps/qualyteeth-dentist/src/app/services/dentist.service';
import { DiagnosticService } from 'apps/qualyteeth-dentist/src/app/services/diagnostic.service';

@Component({
  selector: 'app-edit-diagnostic-definition',
  templateUrl: './edit-diagnostic-definition.page.html',
  styleUrls: ['./edit-diagnostic-definition.page.scss'],
})
export class EditDiagnosticDefinitionPage implements OnInit {

  d: DiagnosticDefinition;
  private newDefinition: boolean;

  private dentistId: number;

  nameCtrl: FormControl;

  /**
   *
   */
  constructor(
    private diagnosticSvc: DiagnosticService,
    private activtedRoute: ActivatedRoute,
    private dentistSvc: DentistService,
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
    const definitionId = parseInt(this.activtedRoute.snapshot.paramMap.get('def_id'));

    this.dentistId = await this.dentistSvc.getDentistId();
    this.newDefinition = definitionId == null || Number.isNaN(definitionId);

    if (this.newDefinition) {
      this.d = {
        id: null,
        name: null,
        createdBy: this.dentistId,
        createdOn: null
      }
    } else {
      this.d = await this.diagnosticSvc.getDefinition(definitionId)
    }

    this.nameCtrl.setValue(this.d.name);
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
      await this.diagnosticSvc.saveDefinition(this.d);
    } else {
      await this.diagnosticSvc.updateDefinition(this.d);
    }

    await this.nav.back();
  }

}
