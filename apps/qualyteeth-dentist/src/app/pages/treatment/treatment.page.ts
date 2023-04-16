import { Component, OnInit, ViewChild } from '@angular/core';
import { DateAdapter } from '@angular/material/core';
import { MatDateRangePicker } from '@angular/material/datepicker';
import { MatTableDataSource } from '@angular/material/table';
import { Tooth } from 'libs/shared/src/lib/tooth.entity';
import { ToothService } from 'apps/qualyteeth-dentist/src/app/services/tooth.service';
import { ActivatedRoute } from '@angular/router';
import { OdontogramComponent } from '../../components/odontogram/odontogram.component';
import { Treatment } from 'libs/shared/src/lib/treatment.entity';
import { FormControl } from '@angular/forms';
import { TreatmentDefinition } from 'libs/shared/src/lib/treatment-definition.entity';
import { Subscription } from 'rxjs';
import { AlertController, NavController, ToastController } from '@ionic/angular';
import { TreatmentService } from '../../services/treatment.service';
import { StorageService } from '../../services/storage.service';
import { SpeechRecognitionService } from '../../services/speech-recognition.service';
import { ToothIntervention } from 'libs/shared/src/lib/tooth-intervention.entity';
import { ToothPart } from 'libs/shared/src/lib/tooth-part.entity';
import { DentistService } from '../../services/dentist.service';
import { PatientService } from '../../services/patient.service';
import { Comment } from 'libs/shared/src/lib/treatment-comment.entity';

@Component({
  selector: 'app-treatment',
  templateUrl: './treatment.page.html',
  styleUrls: ['./treatment.page.scss'],
})
export class TreatmentPage implements OnInit {

  @ViewChild('datePicker') datePicker: MatDateRangePicker<any>;
  @ViewChild('odontogram') odontogram: OdontogramComponent;

  date: Date = new Date();
  comment: string;

  patientId: number;
  teeth: Array<Tooth & { selectedParts: Array<string>, hasDiagnostic: boolean, hasTreatment: boolean }>;
  treatments: Array<Treatment>;
  treatmentsColumns = ['date', 'dentist', 'teeth', 'treatment', 'comment', 'status']

  treatmentsControl = new FormControl();
  treatmentsList: Array<TreatmentDefinition> = new Array<TreatmentDefinition>();

  private teethSelectedParts: Array<Tooth & { selectedParts: Array<string> }> = new Array<Tooth & { selectedParts: Array<string> }>();
  dataSource: MatTableDataSource<Tooth & { selectedParts: Array<string> }>;

  speechRecognitionStarted: boolean;
  speechSubscription: Subscription;
  speechCommentStarted: boolean = false;
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
    private treatmentSvc: TreatmentService,
    private storageSvc: StorageService,
    private toothSvc: ToothService,
    private speechSvc: SpeechRecognitionService,
    private activtedRoute: ActivatedRoute,
    private dentistSvc: DentistService,
    private patientSvc: PatientService,
  ) {
    this.adapter.setLocale('fr-CH');

    this.patientId = parseInt(this.activtedRoute.snapshot.paramMap.get('patient_id'));

    this.dataSource = new MatTableDataSource<Tooth & { selectedParts: Array<string> }>();

    this.toothSvc.toothSelectedParts.subscribe(
      (t: Tooth & { selectedParts: Array<string> }) => {
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

    await this.startSpeechRecognition();
    const toast = await this.toastCtrl.create({
      message: 'Reconnaissance vocale démarrée',
      duration: 2000
    });
    await toast.present();

    this.treatmentsList = await this.treatmentSvc.getDefinitionsForDentist();
    this.treatments = await this.treatmentSvc.getForPatientAndDentist(this.patientId);

    console.log(this.treatmentsList)
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
          this.speechTreatmentStarted = false;
          this.speechCommentStarted = false;
          return;
        }

        if (this.speechSvc.matches('traitement', m.messages)) {
          this.speechTreatmentStarted = !this.speechTreatmentStarted;
          this.speechSelectionStarted = false;
          this.speechCommentStarted = false;
          return;
        }

        if (this.speechSvc.matches('commentaire', m.messages)) {
          this.speechCommentStarted = !this.speechCommentStarted;
          this.speechSelectionStarted = false;
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
        if (!this.speechSelectionStarted && !this.speechTreatmentStarted && !this.speechCommentStarted) {
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
  async openDatePicker(): Promise<void> {
    this.datePicker.open();
  }

  /**
   *
   */
  async save(): Promise<void> {

    if (this.treatmentsControl.value == null) {
      const alert = await this.alertCtrl.create({
        header: 'Erreur',
        message: 'Veuillez sélectionner un traitement',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }

    // const dentistId = await this.storageSvc.getUserid();

    const treatment: Treatment = {
      definition: this.treatmentsControl.value,
      dentist: await this.dentistSvc.getDentist(),
      patient: await this.patientSvc.getPatient(this.patientId),
      creationDate: this.date,
      comments: [{ text: this.comment }],
      interventions: new Array<ToothIntervention>(),
    }

    this.dataSource.data.forEach(t => {
      const dt: ToothIntervention = {
        tooth: t,
        parts: t.selectedParts.map(p => { const tp: ToothPart = { name: p }; return tp }),
      }
      treatment.interventions.push(dt);
    })

    await this.treatmentSvc.save(treatment);

    const toast = await this.toastCtrl.create({
      message: 'Traitement enregistré!',
      duration: 2000
    });
    await toast.present();

    // await this.modalCtrl.dismiss();
    this.nav.pop();
  }

  /**
   *
   */
  async remove(e: Event, el: Tooth & { selectedParts: Array<string> }): Promise<void> {
    const i: number = this.dataSource.data.findIndex(t => t.fdiNumber = el.fdiNumber);
    console.log(i)
    // if (i > -1) {
    //   this.dataSource.data = this.dataSource.data.splice(i, 1);
    // }
  }

}
