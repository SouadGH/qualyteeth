import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { MatDateRangePicker } from '@angular/material/datepicker';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { AlertController, NavController, ToastController } from '@ionic/angular';
import { OdontogramComponent } from 'apps/qualyteeth-dentist/src/app/components/odontogram/odontogram.component';
import { DiagnosticService } from 'apps/qualyteeth-dentist/src/app/services/diagnostic.service';
import { SpeechRecognitionService } from 'apps/qualyteeth-dentist/src/app/services/speech-recognition.service';
import { StorageService } from 'apps/qualyteeth-dentist/src/app/services/storage.service';
import { PredicamentDto } from 'libs/shared/src/lib/dto/predicament.dto';
import { ToothDto } from 'libs/shared/src/lib/dto/tooth.dto';
import { Subscription } from 'rxjs';
import { ToothService } from '../../services/tooth.service';
import { TreatmentService } from '../../services/treatment.service';

@Component({
  selector: 'page-odontogram',
  templateUrl: './odontogram.page.html',
  styleUrls: ['./odontogram.page.scss'],
})
export class OdontogramPage implements OnInit {

  @ViewChild('datePicker') datePicker: MatDateRangePicker<any>;
  @ViewChild('odontogram') odontogram: OdontogramComponent;

  date: Date = new Date();
  comment: string;

  patientId: number;
  teeth: Array<ToothDto & { selectedParts: Array<string>, hasDiagnostic: boolean, hasTreatment: boolean }>;

  diagnostics: Array<PredicamentDto>;
  diagnosticsColumns = ['date', 'dentist', 'teeth', 'diagnostic', 'comment', 'status']

  treatments: Array<PredicamentDto>;

  diagnosticsControl = new FormControl();
  diagnosticsList: Array<PredicamentDto> = new Array<PredicamentDto>();

  treatmentsControl = new FormControl();
  treatmentsList: Array<PredicamentDto> = new Array<PredicamentDto>();

  diagnostic: PredicamentDto;
  treatment: PredicamentDto;

  private teethSelectedParts: Array<ToothDto & { selectedParts: Array<string> }> = new Array<ToothDto & { selectedParts: Array<string> }>();
  dataSource: MatTableDataSource<ToothDto & { selectedParts: Array<string> }>;

  speechRecognitionStarted: boolean;
  speechSubscription: Subscription;
  speechCommentStarted: boolean = false;
  speechDiagnosticStarted: boolean = false;
  speechTreatmentStarted: boolean = false;
  speechSelectionStarted: boolean = false;

  /**
   *
   */
  constructor(
    private nav: NavController,
    private adapter: DateAdapter<any>,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private diagnosticSvc: DiagnosticService,
    private treatmentSvc: TreatmentService,
    private storageSvc: StorageService,
    private toothSvc: ToothService,
    private speechSvc: SpeechRecognitionService,
    private activtedRoute: ActivatedRoute
  ) {
    this.adapter.setLocale('fr-CH');

    this.patientId = parseInt(this.activtedRoute.snapshot.paramMap.get('patient_id'));

    this.dataSource = new MatTableDataSource<ToothDto & { selectedParts: Array<string> }>();

    this.toothSvc.toothSelectedParts.subscribe(
      (t: ToothDto & { selectedParts: Array<string> }) => {
        const i = this.teethSelectedParts.findIndex(tt => tt.fdiNumber === t.fdiNumber);
        if (i > -1) {
          this.teethSelectedParts.splice(i, 1);
        }

        this.teethSelectedParts.push(t);
        this.teethSelectedParts = this.teethSelectedParts.filter(tt => tt.selectedParts.length > 0);

        this.dataSource.data = [];
        this.dataSource.data = this.teethSelectedParts;
      })
  }

  /**
   *
   */
  async ngOnInit() { }

  /**
   *
   */
  async ionViewWillEnter(): Promise<void> {

    this.teeth = <any>await this.toothSvc.getAll();

    const examId = parseInt(this.activtedRoute.snapshot.paramMap.get('examination_id'));
    if (examId != null) {
      // this.diagnostic = await this.diagnosticSvc.getById(examId);
      // this.treatment = await this.treatmentSvc.getById(examId);

      console.log(this.diagnostic)
      console.log(this.treatment)
    }

    await this.startSpeechRecognition();
    const toast = await this.toastCtrl.create({
      message: 'Reconnaissance vocale démarrée',
      duration: 2000
    });
    await toast.present();

    // this.diagnosticsList = await this.diagnosticSvc.getDefinitionsForDentist();
    // this.diagnostics = await this.diagnosticSvc.getForPatientAndDentist(this.patientId);

    // this.treatmentsList = await this.treatmentSvc.getDefinitionsForDentist();
    // this.treatments = await this.treatmentSvc.getForPatientAndDentist(this.patientId);

    console.log(this.diagnostics)
    console.log(this.treatments)

    // console.log(this.odontogram);
  }

  /**
   *
   */
  async ionViewWillLeave(): Promise<void> {
    if (this.speechRecognitionStarted && this.speechSubscription != null) {
      this.speechSvc.stop();
      this.speechSubscription.unsubscribe();
    }
  }

  /**
   *
   */
  async startSpeechRecognition(): Promise<void> {
    if (this.speechRecognitionStarted === true) {
      this.speechSvc.stop();
      this.speechRecognitionStarted = false;
      return;
    }

    this.speechSvc.init();
    this.speechSvc.start();
    this.speechRecognitionStarted = true;

    // if (this.speechSvc.recognition != null) {
    // this.speechSvc.recognition.lang = 'fr-CH';
    // }

    if (this.speechSubscription != null) {
      this.speechSubscription.unsubscribe();
      this.speechSubscription = null;
    }

    this.speechSubscription = this.speechSvc.message.subscribe(
      async m => {
        console.log(m);

        if (!m.success) {
          return
        }

        if (this.speechSvc.matches('selection', m.messages)) {
          this.speechSelectionStarted = !this.speechCommentStarted;
          this.speechDiagnosticStarted = false;
          this.speechTreatmentStarted = false;
          this.speechCommentStarted = false;
          return;
        }

        if (this.speechSvc.matches('diagnostic', m.messages)) {
          this.speechDiagnosticStarted = !this.speechDiagnosticStarted;
          this.speechTreatmentStarted = false;
          this.speechSelectionStarted = false;
          this.speechCommentStarted = false;
          return;
        }

        if (this.speechSvc.matches('traitement', m.messages)) {
          this.speechTreatmentStarted = !this.speechTreatmentStarted;
          this.speechDiagnosticStarted = false;
          this.speechSelectionStarted = false;
          this.speechCommentStarted = false;
          return;
        }

        if (this.speechSvc.matches('commentaire', m.messages)) {
          this.speechCommentStarted = !this.speechCommentStarted;
          this.speechSelectionStarted = false;
          this.speechDiagnosticStarted = false;
          this.speechTreatmentStarted = false;
          return;
        }

        // selection
        if (this.speechSelectionStarted) {
          const maxKey = this.speechSvc.maxSimilarities(m.messages, this.teeth.map(t => t.fdiNumber.toString()));
          if (!maxKey) {
            return
          }

          const selectedTooth = this.teeth.find(t => t.fdiNumber === parseInt(maxKey));
          this.odontogram.select(null, selectedTooth);

          return;
        }

        // diagnostics
        if (this.speechDiagnosticStarted) {
          const maxKey = this.speechSvc.maxSimilarities(m.messages, this.diagnosticsList.map(d => d.name));
          if (!maxKey) {
            return
          }

          const value = this.diagnosticsList.find(v => v.name.toLowerCase() === maxKey.toLowerCase());
          this.diagnosticsControl.setValue(value);
          return;
        }

        // treatments
        if (this.speechTreatmentStarted) {
          const maxKey = this.speechSvc.maxSimilarities(m.messages, this.treatmentsList.map(d => d.name));
          if (!maxKey) {
            return
          }

          const value = this.treatmentsList.find(v => v.name.toLowerCase() === maxKey.toLowerCase());
          this.treatmentsControl.setValue(value);
          return;
        }

        // comments
        if (this.speechCommentStarted) {
          this.comment = !this.comment ? m.messages[0] : this.comment + '\n' + m.messages[0];
          return;
        }

        // save
        if (!this.speechSelectionStarted && !this.speechDiagnosticStarted && !this.speechCommentStarted && !this.speechTreatmentStarted) {
          if (this.speechSvc.matches('sauvegarder', m.messages)) {
            await this.save();
          }
          else if (this.speechSvc.matches('sauver', m.messages)) {
            await this.save();
          }
          else if (this.speechSvc.matches('enregistrer', m.messages)) {
            await this.save();
          }
        }
      },

      async (error) => {
        this.speechRecognitionStarted = false;
        this.speechSubscription.unsubscribe();
        this.speechSubscription = null;
        if (error === 'no-speech') {
          await this.startSpeechRecognition();
        }
        // else  if (error === 'speech-ended') {
        //   await this.startSpeechRecognition();
        // }
        else if (error === 'sound-ended') {
          await this.startSpeechRecognition();
        }
        else if (error === 'not-allowed') {
          if (navigator.mediaDevices) {
            try {
              navigator.mediaDevices.getUserMedia({ audio: true });
              await this.startSpeechRecognition();
            } catch (err) {
              console.error(err);
              const toast = await this.toastCtrl.create({
                message: 'Erreur - Permission microphone non accordée',
                duration: 2000
              });
              await toast.present();
            }
          }
          else {
            console.error(error);
            const toast = await this.toastCtrl.create({
              message: 'Erreur - Permission microphone non accordée',
              duration: 2000
            });
            await toast.present();
          }
        }
        else {
          console.error(error);
          const toast = await this.toastCtrl.create({
            message: 'Erreur - Reconnaissance vocale terminée',
            duration: 2000
          });
          await toast.present();
        }
      },
      () => { });
  }

  /**
   *
   */
  // async close(): Promise<void> {
  //   if (this.speechRecognitionStarted && this.speechSubscription != null) {
  //     this.speechSubscription.unsubscribe();
  //   }

  //   await this.modalCtrl.dismiss();
  // }

  /**
   *
   */
  async openDatePicker(): Promise<void> {
    this.datePicker.open();
  }

  /**
   *
   */
  async save(): Promise<void> {

    if (this.diagnosticsControl.value == null && this.treatmentsControl.value == null) {
      const alert = await this.alertCtrl.create({
        header: 'Erreur',
        message: 'Veuillez sélectionner un diagnostique ou un traitement',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }

    const dentistId = await this.storageSvc.getUserid();

    // if (this.diagnosticsControl.value != null) {
    //   const diagnostic: Diagnostic = {
    //     id: null,
    //     definitionId: this.diagnosticsControl.value['id'],
    //     dentistId: dentistId,
    //     patientId: this.patientId,
    //     startDate: this.date,
    //     comment: this.comment,
    //     createdOn: new Date(),
    //     teeth: new Array<DiagnosticTooth>(),
    //   }

    //   this.dataSource.data.forEach(t => {
    //     const dt: DiagnosticTooth = {
    //       toothFdiNumber: t.fdiNumber,
    //       toothParts: t.selectedParts,
    //     }
    //     diagnostic.teeth.push(dt);
    //   })

    //   // await this.diagnosticSvc.save(diagnostic);
    // }

    // if (this.treatmentsControl.value != null) {
    //   const treatment: Treatment = {
    //     id: null,
    //     definitionId: this.treatmentsControl.value['id'],
    //     dentistId: dentistId,
    //     patientId: this.patientId,
    //     startDate: this.date,
    //     comment: this.comment,
    //     createdOn: new Date(),
    //     teeth: new Array<TreatmentTooth>(),
    //   }

    //   this.dataSource.data.forEach(t => {
    //     const dt: TreatmentTooth = {
    //       toothFdiNumber: t.fdiNumber,
    //       toothParts: t.selectedParts,
    //     }
    //     treatment.teeth.push(dt);
    //   })

    //   // await this.treatmentSvc.save(treatment);
    // }

    const toast = await this.toastCtrl.create({
      message: 'Sauvegardé!',
      duration: 2000
    });
    await toast.present();

    // await this.modalCtrl.dismiss();
    this.nav.pop();
  }

  /**
   *
   */
  async remove(e: Event, el: ToothDto & { selectedParts: Array<string> }): Promise<void> {
    const i: number = this.dataSource.data.findIndex(t => t.fdiNumber = el.fdiNumber);
    console.log(i)
    // if (i > -1) {
    //   this.dataSource.data = this.dataSource.data.splice(i, 1);
    // }
  }

  /**
   *
   */
  //  async toothDetails(t: any): Promise<void> {
  //   this.nav.navigateForward(`patients/${this.patientId}/ToothDto/${t.toothFdiNumber}`);
  // }

  /**
   *
   */
  //  getTeethFdiNumbers(tt: Array<any>) : Array<number> {
  //   return tt.map(t => t.toothFdiNumber);
  // }

}

