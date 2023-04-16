import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ModalController, NavParams, ToastController } from '@ionic/angular';
import { StorageService } from 'apps/qualyteeth-patient/src/app/services/storage.service';
import { Dentist } from 'libs/shared/src/lib/dentist.entity';
import { Treatment } from 'libs/shared/src/lib/treatment.entity';
import { DentistService } from 'apps/qualyteeth-patient/src/app/services/dentist.service';
import { DocumentService } from 'apps/qualyteeth-patient/src/app/services/document.service';

@Component({
  selector: 'app-treatment',
  templateUrl: './treatment.page.html',
  styleUrls: ['./treatment.page.scss'],
})
export class TreatmentPage implements OnInit {

  treatment: Treatment;
  dentist: Dentist;

  @ViewChild('imgChooser', { static: false }) imgChooser: ElementRef;
  progressInfo = null;

  documents: Array<any> = new Array<any>();

  /**
   *
   */
  constructor(
    public navParams: NavParams,
    private storageSvc: StorageService,
    private dentistSvc: DentistService,
    private documentSvc: DocumentService,
    private modalCtrl: ModalController,
    private toastCtrl: ToastController
  ) {
    this.treatment = navParams.get('treatment')
  }

  /**
   *
   */
  ngOnInit() { }

  /**
   *
   */
  async close(): Promise<void> {
    await this.modalCtrl.dismiss();
  }

  /**
   *
   */
  async ionViewWillEnter(): Promise<void> {
    this.dentist = await this.dentistSvc.getDentist(this.treatment.dentistId);
    await this.loadDocuments();
  }

  /**
   *
   */
  async loadDocuments(): Promise<void> {
    this.documents = await this.documentSvc.getDocuments(this.treatment.id);
    this.documents.forEach(doc => {
      if (doc.filename.toLowerCase().endsWith('png')) {
        doc.icon = 'image-outline';
      } else {
        doc.icon = 'document-outline';
      }
    })
  }

  /**
   *
   */
  async download(doc: any): Promise<void> {
    const accessToken = await this.storageSvc.get('accessTokenQP')
    this.documentSvc.downloadDocument(accessToken, doc.id).subscribe((resp) => {

      const d = resp.body;
      const contentType = resp.headers.get('content-type');

      let blob = new Blob([d], { type: contentType });
      let url = window.URL.createObjectURL(blob);
      // let pwa = window.open(url);
      // if (!pwa || pwa.closed || typeof pwa.closed == 'undefined') {
      //   alert('Please disable your Pop-up blocker and try again.');
      // }
      let a = document.createElement('a');
      document.body.appendChild(a);
      a.setAttribute('style', 'display: none');
      a.href = url;
      a.download = doc.filename;
      a.click();
      window.URL.revokeObjectURL(url);
      a.remove();
    })

  }

  /**
   *
   */
  async newDocument(): Promise<void> {
    this.imgChooser.nativeElement.click();
  }

  /**
   *
   */
  async onImageChosen(e): Promise<void> {

    if (!e || !e.target || !e.target.files) {
      return;
    }
    if (e.target.files.length === 0) {
      return;
    }
    const rawDocument = e.target.files[0];

    await this.upload(rawDocument);
  }

  /**
   *
   */
  private async upload(file: File): Promise<void> {
    this.progressInfo = { value: 0, filename: file.name };

    const accessToken = await this.storageSvc.get('accessTokenQP')
    const userid = await this.storageSvc.get('useridQP');

    this.documentSvc.upload(accessToken, file, userid, this.treatment.id).subscribe(
      async event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progressInfo.value = Math.round(100 * event.loaded / event.total);
        } else if (event instanceof HttpResponse) {
          this.progressInfo = null;

          const toast = await this.toastCtrl.create({
            message: 'Document téléversé avec succès!',
            duration: 2000
          });
          await toast.present();

          await this.loadDocuments();
        }
      },
      async err => {
        this.progressInfo = null;
        console.error(err);

        const toast = await this.toastCtrl.create({
          message: 'Erreur lors du téléversement du document',
          duration: 2000
        });
        await toast.present();
      });
  }

}
