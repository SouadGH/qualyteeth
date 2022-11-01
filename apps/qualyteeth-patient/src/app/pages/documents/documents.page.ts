import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { PopoverController, ToastController } from '@ionic/angular';
import { StorageService } from 'apps/qualyteeth-patient/src/app/services/storage.service';
import { ToolbarMenuComponent } from 'apps/qualyteeth-patient/src/app/components/toolbar-menu/toolbar-menu.component';
import { DocumentService } from 'apps/qualyteeth-patient/src/app/services/document.service';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.page.html',
  styleUrls: ['./documents.page.scss'],
})
export class DocumentsPage implements OnInit {

  @ViewChild('imgChooser', { static: false }) imgChooser: ElementRef;
  progressInfo = null;

  documents: Array<any> = null;

  filteredBy: string = 'all';

  private imageSuffixes = ['.png', '.jpg', '.jpeg', '.gif', '.bmp'];

  /**
   *
   */
  constructor(
    private popoverCtrl: PopoverController,
    private storageSvc: StorageService,
    private toastCtrl: ToastController,
    private documentSvc: DocumentService
  ) { }

  /**
   *
   */
  ngOnInit() { }

  /**
   *
   */
  async ionViewWillEnter(): Promise<void> {
    await this.loadDocuments();
  }

  /**
   *
   */
  async loadDocuments(): Promise<void> {
    this.documents = await this.documentSvc.getDocuments();
    if (this.filteredBy === 'image') {
      this.documents = this.documents.filter(d => this.imageSuffixes.some(s => d.filename.toLowerCase().endsWith(s)))
    }

    this.documents.forEach(doc => {
      if (this.imageSuffixes.some(s => doc.filename.toLowerCase().endsWith(s))) {
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
  async pop(ev: any): Promise<void> {
    const popover = await this.popoverCtrl.create({
      component: ToolbarMenuComponent,
      event: ev,
      translucent: true
    });
    return await popover.present();
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

    const accessToken = await this.storageSvc.get('accessTokenQP');
    const userid = await this.storageSvc.get('useridQP');

    this.documentSvc.upload(accessToken, file, userid).subscribe(
      async event => {
        // console.log(event);
        if (event.type === HttpEventType.UploadProgress) {
          this.progressInfo.value = Math.round(100 * event.loaded / event.total);
          // console.log(this.progressInfo.value);
        } else if (event instanceof HttpResponse) {
          // console.log(event)
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

  /**
   *
   */
  async filterBy(event: MatSelectChange): Promise<void> {
    this.filteredBy = event.value;
    await this.loadDocuments();
  }

}
