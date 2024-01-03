import { Component, OnInit } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SurgeryService } from 'apps/qualyteeth-dentist/src/app/services/surgery.service';
import { ActivatedRoute } from '@angular/router';
import { PractitionerService } from 'apps/qualyteeth-dentist/src/app/services/practitioner.service';
import { Surgery } from 'apps/qualyteeth-server/src/core/surgery/surgery.entity';

@Component({
  selector: 'app-edit-surgery',
  templateUrl: './edit-surgery.page.html',
  styleUrls: ['./edit-surgery.page.scss'],
})
export class EditSurgeryPage implements OnInit {

  isNew: any;
   surgery: Surgery;

  surgeryForm: FormGroup;

  /**
   *
   */
  constructor(
    private nav: NavController,
    private activtedRoute: ActivatedRoute,
    private surgerySvc: SurgeryService,
    private toastCtrl: ToastController,
    private dentistSvc: PractitionerService,
    private fb: FormBuilder,
  ) { 
    this.surgeryForm = this.fb.group({
      name: [null, [Validators.required]],
      addressLine1: [null, [Validators.required]],
      addressLine2: [null],
      postalCode: [null, [Validators.required]],
      city: [null, [Validators.required]],
    });
  }

  /**
   *
   */
  ngOnInit() {}

  async ionViewWillEnter(): Promise<void> {
    const surgeryId = this.activtedRoute.snapshot.paramMap.get('surgery_id');
    this.isNew = surgeryId == null || surgeryId;
    if (!this.isNew  ) {
      //const dentistId = await this.dentistSvc.getDentistId();

        this.surgery = {
        //id: null,
        name: null,
        city: null,
        postalCode: null,
        addressLine1:null,
        addressLine2: null,
        //createdBy: dentistId,
        //createdOn: null,
        active: false,
        //deleted: false,
      };
    } else {
       this.surgery = await this.surgerySvc.getSurgery(surgeryId);
     
     
     }

    this.surgeryForm.controls['name'].setValue(this.surgery.name);
    this.surgeryForm.controls['addressLine1'].setValue(this.surgery.addressLine1);
    this.surgeryForm.controls['addressLine2'].setValue(this.surgery.addressLine2);
    this.surgeryForm.controls['postalCode'].setValue(this.surgery.postalCode);
    this.surgeryForm.controls['city'].setValue(this.surgery.city);
  }

  /**
   *
   */
  async add(): Promise<void> {
    this.surgeryForm.markAllAsTouched();
    if (!this.surgeryForm.valid) {
      return;
    }

    const name: string = this.surgeryForm.controls['name'].value.trim();
    const addressLine1: string = this.surgeryForm.controls['addressLine1'].value.trim();
    const addressLine2: string = this.surgeryForm.controls['addressLine2'].value;
    const postalCode: string = this.surgeryForm.controls['postalCode'].value;
    const city: string = this.surgeryForm.controls['city'].value.trim();

    
    this.surgery.name = name;
    this.surgery.addressLine1 = addressLine1;
    this.surgery.addressLine2 = addressLine2;
    this.surgery.city = city;
    this.surgery.postalCode = postalCode;
   
    let message: string = '';
   
    if (!this.isNew) {      
      //this.surgery.id = 
      await this.surgerySvc.save(this.surgery);
      //await this.surgerySvc.link(this.surgery);
      message = 'Cabinet enregistré!';
    } else {
      alert("Cabinet modifié!");
      await this.surgerySvc.update(this.surgery);
      message = 'Cabinet modifié!';
    }

    const toast = await this.toastCtrl.create({
      message: message,
      duration: 2000
    });
    await toast.present();
    
    this.nav.pop();
  }

}
