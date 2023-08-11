import { SelectionModel } from '@angular/cdk/collections';
import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { DiagnosticService } from 'apps/qualyteeth-dentist/src/app/services/diagnostic.service';
import { PredicamentDto } from 'libs/shared/src/lib/dto/predicament.dto';
import { TreatmentService } from '../../services/treatment.service';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.html',
  styleUrls: ['./activity.scss'],
})
export class ActivityPage {

  loading: boolean;

  private diagnostics: Array<PredicamentDto>;
  private treatments: Array<PredicamentDto>;
  diagnosticsOrTraitements: Array<PredicamentDto>;

  diagnosticsOrTraitementsColumns = ['select', 'date', 'patient', 'teeth', 'diagnosticTreatment', 'comment'];

  selection = new SelectionModel<any>(true, []);

  /**
   *
   */
  constructor(
    private nav: NavController,
    private diagnosticSvc: DiagnosticService,
    private treatmentSVc: TreatmentService,
  ) {

  }

  /**
   *
   */
  async ionViewWillEnter(): Promise<void> {
    this.loading = true;

    // this.diagnostics = await this.diagnosticSvc.getAllForDentist();
    // this.treatments = await this.treatmentSVc.getForDentist();

    console.log(this.diagnostics);
    console.log(this.treatments);

    // this.diagnosticsOrTraitements = this.diagnostics.map(d => ({ ...d, type: 'DIAGNOSTIC' }));
    // this.diagnosticsOrTraitements = this.diagnosticsOrTraitements.concat(this.treatments.map(t => ({ ...t, type: 'TREATMENT' })));
    // this.diagnosticsOrTraitements = this.diagnosticsOrTraitements.sort((a, b) => moment(b.startDate).valueOf() - moment(a.startDate).valueOf());

    this.loading = false;
  }

  /**
   *
   */
  async toothDetails(t: any): Promise<void> {
    this.nav.navigateForward(`patients/${t.patientId}/tooth/${t.toothFdiNumber}`);
  }

  /**
   *
   */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.diagnosticsOrTraitements.length;
    return numSelected === numRows;
  }

  /**
   *
   */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.diagnosticsOrTraitements);
  }

}