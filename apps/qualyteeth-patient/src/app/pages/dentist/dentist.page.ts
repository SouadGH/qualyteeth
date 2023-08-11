import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Dentist } from 'libs/shared/src/lib/dentist.entity';
import { PractitionerService } from 'apps/qualyteeth-patient/src/app/services/practitioner.service';
import { Predicament } from 'libs/shared/src/lib/predicament.entity';
import { TreatmentService } from 'apps/qualyteeth-patient/src/app/services/treatment.service';
import { NavController } from '@ionic/angular';
import { Diagnostic } from 'libs/shared/src/lib/diagnostic.entity';
import { DiagnosticService } from '../../services/diagnostic.service';
import { SseService } from '../../services/sse.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dentist',
  templateUrl: './dentist.page.html',
  styleUrls: ['./dentist.page.scss'],
})
export class DentistPage implements OnInit {

  dentistId: number;
  dentist: Dentist;
  diagnostics: Array<any> = new Array<any>();
  treatments: Array<any> = new Array<any>();

  private subscription: Subscription;

  /**
   *
   */
  constructor(
    private dentistSvc: PractitionerService,
    private treatmentSvc: TreatmentService,
    private diagnosticSvc: DiagnosticService,
    private nav: NavController,
    private sseSvc: SseService,
    private activtedRoute: ActivatedRoute) {

  }

  /**
   *
   */
  async ngOnInit() { 
    this.subscription = this.sseSvc.diagnosticSubject.subscribe({
      next: async (d) => {
        this.diagnostics = await this.diagnosticSvc.getForPatientAndDentist(this.dentistId);
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
  async ionViewWillEnter() {
    this.dentistId = parseInt(this.activtedRoute.snapshot.paramMap.get('dentist_id'));
    this.dentist = await this.dentistSvc.getDentist(this.dentistId);
    this.treatments = await this.treatmentSvc.getForPatientAndDentist(this.dentistId);
    this.diagnostics = await this.diagnosticSvc.getForPatientAndDentist(this.dentistId);

    console.log(this.diagnostics)
  }

  /**
   *
   */
  // async requestConnection(): Promise<void> {
  //   await this.dentistSvc.requestConnection(this.dentistId);
  //   this.dentist.status = RequestStatus.REQUESTED;
  // }

  /**
   *
   */
  async mail(): Promise<void> {
    document.location.href = 'mailto:' + this.dentist.email;
  }

  /**
   *
   */
  phoneCall(): void {
    document.location.href = 'tel:' + this.dentist.phoneNumber;
  }

  /**
   * 
   */
  async toTreatments(): Promise<void> {
    if (this.treatments.length === 0) {
      return;
    }
    this.nav.navigateForward('tabs/dentists/' + this.dentist.id + '/treatments')
  }

}
