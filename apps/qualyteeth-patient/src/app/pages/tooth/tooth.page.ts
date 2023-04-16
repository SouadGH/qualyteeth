import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Tooth } from 'libs/shared/src/lib/tooth.entity';
import { Treatment } from 'libs/shared/src/lib/treatment.entity';
import { ToothService } from 'apps/qualyteeth-patient/src/app/services/tooth.service';
import { TreatmentService } from 'apps/qualyteeth-patient/src/app/services/treatment.service';
import { Diagnostic } from 'libs/shared/src/lib/diagnostic.entity';
import { DiagnosticService } from '../../services/diagnostic.service';
import { Dentist } from 'libs/shared/src/lib/dentist.entity';
import { DentistService } from '../../services/dentist.service';
import { Subscription } from 'rxjs';
import { SseService } from '../../services/sse.service';

@Component({
  selector: 'app-tooth',
  templateUrl: './tooth.page.html',
  styleUrls: ['./tooth.page.scss'],
})
export class ToothPage implements OnInit {

  tooth: Tooth;
  diagnostics: Array<any> = new Array<any>();
  treatments: Array<any> = new Array<any>();

  dentists = {};

  private subscription: Subscription;

  /**
   *
   */
  constructor(
    private toothSvc: ToothService,
    private diagnosticSvc: DiagnosticService,
    private treatmentSvc: TreatmentService,
    private dentistSvc: DentistService,
    private sseSvc: SseService,
    private activtedRoute: ActivatedRoute) {
  }

  /**
   *
   */
   async ngOnInit() { 
    this.subscription = this.sseSvc.diagnosticSubject.subscribe({
      next: async (d) => {
        await this.initDiagnosics();
      },
      error: (e) => {
        console.error(e);
        throw e;
      }
    })
  }

  /**
   *
   */
  async ionViewWillLeave(): Promise<void> {
    this.subscription.unsubscribe();
  }

  /**
   *
   */
  async ionViewWillEnter(): Promise<void> {
    const fdiNumber = parseInt(this.activtedRoute.snapshot.paramMap.get('fdi_number'));

    this.tooth = await this.toothSvc.getTooth(fdiNumber);

    await this.initDiagnosics();
    await this.initTreatments();
  }

  /**
   *
   */
  async initDiagnosics(): Promise<void> {
    this.diagnostics = await this.diagnosticSvc.getForPatientAndTooth(this.tooth.fdiNumber);

    for (const d of this.diagnostics) {
      let dentist: Dentist = this.dentists[d.dentistId];
      if (dentist == null) {
        dentist = await this.dentistSvc.getDentist(d.dentistId);
      }
      d.dentist = dentist;
    }

    console.log(this.diagnostics)
  }

  /**
   *
   */
   async initTreatments(): Promise<void> {
    this.treatments = await this.treatmentSvc.getForPatientAndTooth(this.tooth.fdiNumber);

    for (const t of this.treatments) {
      let dentist: Dentist = this.dentists[t.dentistId];
      if (dentist == null) {
        dentist = await this.dentistSvc.getDentist(t.dentistId);
      }
      t.dentist = dentist;
    }
   }

}
