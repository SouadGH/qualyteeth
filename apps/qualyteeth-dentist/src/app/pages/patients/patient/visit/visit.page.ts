import { Component, OnInit, ViewChild } from '@angular/core';
import { MatStepper } from '@angular/material/stepper';
import { ActivatedRoute } from '@angular/router';
import { PatientService } from 'apps/qualyteeth-dentist/src/app/services/patient.service';
import { ToothService } from 'apps/qualyteeth-dentist/src/app/services/tooth.service';
import { PatientDto } from 'libs/shared/src/lib/dto/patient.dto';
import { PredicamentDto } from 'libs/shared/src/lib/dto/predicament.dto';
import { ToothDto } from 'libs/shared/src/lib/dto/tooth.dto';

@Component({
  selector: 'app-visit',
  templateUrl: './visit.page.html',
  styleUrls: ['./visit.page.scss'],
})
export class VisitPage implements OnInit {

  @ViewChild('stepper', { read: MatStepper, static: false }) stepper: MatStepper;
  patient: PatientDto;

  teeth: Array<ToothDto & { selectedParts: Array<string> }> = new Array<ToothDto & { selectedParts: Array<string> }>();

  diagnostics: Array<PredicamentDto> = new Array<PredicamentDto>();

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
