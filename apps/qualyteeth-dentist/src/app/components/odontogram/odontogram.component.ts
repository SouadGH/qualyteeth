import { Component, Input, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Diagnostic } from 'libs/shared/src/lib/diagnostic.entity';
import { Tooth } from 'libs/shared/src/lib/tooth.entity';
import { DiagnosticService } from 'apps/qualyteeth-dentist/src/app/services/diagnostic.service';
import { ToothService } from 'apps/qualyteeth-dentist/src/app/services/tooth.service';
import { OdontogramToothComponent } from './tooth/tooth.component';
import { Treatment } from 'libs/shared/src/lib/treatment.entity';
import { TreatmentService } from '../../services/treatment.service';

@Component({
  selector: 'app-odontogram',
  templateUrl: './odontogram.component.html',
  styleUrls: ['./odontogram.component.scss'],
})
export class OdontogramComponent implements OnInit {

  @ViewChildren(OdontogramToothComponent) toothComponents: QueryList<OdontogramToothComponent>;
  @Input() patientId: number;
  @Input() teeth: Array<Tooth & { selectedParts: Array<string>, hasDiagnostic: boolean, hasTreatment: boolean }>;
  @Input() editable: boolean;

  // @Input() showCommands: boolean;

  // @ViewChild('matFabMenu', { static: false }) matFabMenu: MatFabMenuComponent;

  // @ViewChildren(OdontogramToothComponent) allTeeth: OdontogramToothComponent;

  diagnostics: Array<Diagnostic>;
  treatments: Array<Treatment>;

  // teeth: Array<Tooth> = new Array<Tooth>();
  quadrants = {
    'top-left': [],
    'top-right': [],
    'bottom-left': [],
    'bottom-right': []
  };

  focusedTooth: number;

  /**
   * 
   */
  constructor(
    private toothSvc: ToothService,
    private diagnosticSvc: DiagnosticService,
    private treatmentSvc: TreatmentService,
  ) { }

  /**
   * 
   */
  async ngOnInit() {
    // this.teeth = <any>await this.toothsvc.getAll();

    this.diagnostics = await this.diagnosticSvc.getForPatientAndDentist(this.patientId);
    this.treatments = await this.treatmentSvc.getForPatientAndDentist(this.patientId);

    // console.log(this.diagnostics)
    // console.log(this.treatments)

    for (const t of this.teeth) {

      if (this.diagnostics != null) {
        for (const d of this.diagnostics) {
          t.hasDiagnostic = d.teeth.filter(dt => dt.toothFdiNumber === t.fdiNumber).length > 0;
          if (t.hasDiagnostic) {
            break;
          }
        }
      }

      if (this.treatments != null) {
        for (const tr of this.treatments) {
          t.hasTreatment = tr.teeth.filter(trt => trt.toothFdiNumber === t.fdiNumber).length > 0;
          if (t.hasTreatment) {
            break;
          }
        }
      }

      t.selectedParts = new Array<string>();

      const q = Math.floor(t.fdiNumber / 10);
      switch (q) {
        case 1:
          this.quadrants['top-left'].push(t);
          break;

        case 2:
          this.quadrants['top-right'].push(t);
          break;

        case 3:
          this.quadrants['bottom-right'].push(t);
          break;

        case 4:
          this.quadrants['bottom-left'].push(t);
          break;
      }
    }
    // console.log(this.quadrants);

    this.quadrants['top-left'].sort((a, b) => b.fdiNumber - a.fdiNumber)
    this.quadrants['bottom-left'].sort((a, b) => b.fdiNumber - a.fdiNumber)
  }

  /**
   * 
   */
  async select(e: MouseEvent, t: Tooth & { selectedParts: Array<string> }): Promise<void> {
    if (e != null) {
      e.stopImmediatePropagation();
    }

    const idx = t.selectedParts.indexOf('z');
    if (idx > -1) {
      t.selectedParts.splice(idx, 1);
    } else {
      t.selectedParts.push('z');

      for (const tt of this.teeth) {
        const idx = tt.selectedParts.indexOf('z');
        tt.selectedParts = new Array<string>();

        this.toothComponents.forEach(tc => {
          tc.resetClasses();
        });

        if (idx > -1) {
          tt.selectedParts.push('z');
        }
      }
    }

    this.toothSvc.toothSelectedParts.next(t);

    // if (this.matFabMenu.isActive) {
    //   this.matFabMenu.toggle();
    // }
  }

}
