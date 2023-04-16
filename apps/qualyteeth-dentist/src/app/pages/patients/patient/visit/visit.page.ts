import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Patient } from 'libs/shared/src/lib/patient.entity';
import { MatStepper } from '@angular/material/stepper';
import { Tooth } from 'libs/shared/src/lib/tooth.entity';
import { ToothService } from 'apps/qualyteeth-dentist/src/app/services/tooth.service';
import { Diagnostic } from 'libs/shared/src/lib/diagnostic.entity';
import { PatientService } from 'apps/qualyteeth-dentist/src/app/services/patient.service';

@Component({
  selector: 'app-visit',
  templateUrl: './visit.page.html',
  styleUrls: ['./visit.page.scss'],
})
export class VisitPage implements OnInit {

  @ViewChild('stepper', { read: MatStepper, static: false }) stepper: MatStepper;
  patient: Patient;

  teeth: Array<Tooth & { selectedParts: Array<string> }> = new Array<Tooth & { selectedParts: Array<string> }>();

  diagnostics: Array<Diagnostic> = new Array<Diagnostic>();

  diagnosticColumn: string[] = ['date'];

  /**
   *
   */
  constructor(
    private patientSvc: PatientService,
    private activtedRoute: ActivatedRoute,
    private toothsvc: ToothService,
  ) {
  }

  /**
   *
   */
  async ngOnInit() {
    this.teeth = <any>await this.toothsvc.getAll();
  }

  /**
   *
   */
  async ionViewWillEnter() {
    const patientId = parseInt(this.activtedRoute.snapshot.paramMap.get('patient_id'));
    this.patient = await this.patientSvc.getPatient(patientId);
  }

  // /**
  //  *
  //  */
  // async toDiagnostic(): Promise<void> {

  //   const modal = await this.modalCtrl.create({
  //     component: DiagnosticPage,
  //     cssClass: 'diagnostic-modal',
  //     componentProps: {
  //       // 'patients': [],
  //       // 'event': this.calendarEvent,
  //       teeth: this.teeth.filter(t => t.selectedParts.length > 0)
  //     }
  //   });
  //   await modal.present();
  // }

}
