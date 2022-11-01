import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertController, ModalController, NavController, NavParams, ToastController } from '@ionic/angular';
import { ServicingService } from 'apps/qualyteeth-dentist/src/app/services/servicing.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Dentist } from 'libs/shared/src/lib/dentist.interface';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ServiceDefinition } from 'libs/shared/src/lib/service-definition.interface';
import { DentistService } from 'apps/qualyteeth-dentist/src/app/services/dentist.service';
import { ActivatedRoute } from '@angular/router';
import { ServiceLink } from 'libs/shared/src/lib/service.interface';
import { Surgery } from 'libs/shared/src/lib/surgery.interface';
import { SurgeryService } from 'apps/qualyteeth-dentist/src/app/services/surgery.service';
import { MatTable } from '@angular/material/table';

@Component({
  selector: 'app-edit-service',
  templateUrl: './edit-service.page.html',
  styleUrls: ['./edit-service.page.scss'],
})
export class EditServicePage implements OnInit {

  @ViewChild(MatTable) linksTable: MatTable<ServiceLink>;

  isNew: boolean;
  service: ServiceDefinition;

  surgeries: Array<Surgery>;
  activeSurgery: any;

  categoryCtrl: FormControl;
  serviceCategories: Array<string> = new Array<string>();
  filteredCategories: Observable<String[]>;

  // surgery: Surgery;
  addServiceForm: FormGroup;

  // dentistCtrls: Array<FormControl> = new Array<FormControl>();
  dentists: Array<Dentist> = new Array<Dentist>();
  // filteredDentists: Array<Observable<Dentist[]>> = new Array<Observable<Dentist[]>>();

  // dentistServices: Array<any> = new Array<any>();
  links: Array<ServiceLink> = new Array<ServiceLink>();
  columns = ['dentist', 'timing', 'delete']

  /**
   *
   */
  constructor(
    private modalCtrl: ModalController,
    private servicingSvc: ServicingService,
    private activtedRoute: ActivatedRoute,
    private alertCtrl: AlertController,
    private fb: FormBuilder,
    private dentistSvc: DentistService,
    private toastCtrl: ToastController,
    private nav: NavController,
    private surgerySvc: SurgeryService
  ) {

    this.addServiceForm = this.fb.group({
      category: [null],
      name: [null, [Validators.required]],
    });
  }

  /**
   *
   */
  async ionViewWillEnter(): Promise<void> {
    this.surgeries = await this.surgerySvc.getSurgeriesForDentist();
    this.activeSurgery = this.surgeries.find(s => s.active);
    if (this.activeSurgery == null) {
      this.activeSurgery = ''
    }

    const serviceId = parseInt(this.activtedRoute.snapshot.paramMap.get('service_id'));
    this.isNew = serviceId == null || Number.isNaN(serviceId);

    if (this.isNew) {
      const dentistId: number = await this.dentistSvc.getDentistId();

      this.service = {
        id: null,
        name: null,
        category: null,
        createdOn: null,
        createdBy: dentistId
      };
    } else {
      this.service = await this.servicingSvc.getDefinition(serviceId);
    }
    this.addServiceForm.controls['category'].setValue(this.service.category);
    this.addServiceForm.controls['name'].setValue(this.service.name);

    await this.loadData();
  }

  /**
   *
   */
  async loadData(): Promise<void> {
    
    let services: Array<ServiceDefinition>;
    if (this.activeSurgery == null || this.activeSurgery === '') {
      services = await this.servicingSvc.getDefinitionsForDentist();
    }
    else {
      services = await this.servicingSvc.getDefinitionsForSurgery(this.activeSurgery.id);
    }

    this.serviceCategories = Array.from(new Set(services.map(s => s.category)).values());
    this.filteredCategories = this.addServiceForm.controls['category'].valueChanges.pipe(
      startWith(''),
      map(value => this._filterCategory(value))
    );

    this.dentists = new Array<Dentist>();
    if (this.activeSurgery == null || this.activeSurgery === '') {
      const dentist: Dentist = await this.dentistSvc.getDentist();
      this.dentists.push(dentist);
    } else {
      this.dentists = await this.surgerySvc.getDentistsForSurgery(this.activeSurgery.id);
    }

    if (!this.isNew) {
      this.links = await this.servicingSvc.getServiceLinks(this.service.id);
      if (this.linksTable) {
        this.linksTable.renderRows();
      }
    }
  }

  /**
   *
   */
  ngOnInit() { }

  /**
   *
   */
  private _filterCategory(value: string): Array<string> {
    const filterValue = value.toLowerCase().trim();
    return this.serviceCategories.filter(c => c.toLowerCase().indexOf(filterValue) === 0);
  }

  /**
   *
   */
  async addLink(e: Event): Promise<void> {
    const serviceLink: ServiceLink = {
      definitionId: this.service.id,
      dentistId: null,
      timing: null
    };
    this.links.push(serviceLink);

    if (this.linksTable) {
      this.linksTable.renderRows();
    }
  }

  /**
   *
   */
  async deleteLink(i: number): Promise<void> {
    this.links.splice(i, 1);
    if (this.linksTable) {
      this.linksTable.renderRows();
    }
  }

  /**
   *
   */
  async save(): Promise<void> {
    this.service.name = this.addServiceForm.controls['name'].value.trim();
    this.service.category = this.addServiceForm.controls['category'].value;

    console.log(this.links)

    for (const l of this.links) {
      if (l.dentistId == null) {
        const alert = await this.alertCtrl.create({
          header: 'Erreur',
          message: 'Veuillez sélectionner un dentiste',
          buttons: ['OK']
        });
        await alert.present();
        return;
      }

      if (l.timing == null) {
        const alert = await this.alertCtrl.create({
          header: 'Erreur',
          message: 'Veuillez entrer une valeur correcte pour la durée du service',
          buttons: ['OK']
        });
        await alert.present();
        return;
      }

      const dentistsIds: Array<number> = this.links.map(d => d.dentistId);
      if (new Set(dentistsIds).size != dentistsIds.length) {
        const alert = await this.alertCtrl.create({
          header: 'Erreur',
          message: 'Veuillez supprimer les doublons dans la liste des dentistes',
          buttons: ['OK']
        });
        await alert.present();
        return;
      }
    }

    if (this.service.id != null) {
      await this.servicingSvc.updateDefinition(this.service, this.links);
    } else {
      this.service.id = await this.servicingSvc.saveDefinition(this.service, this.links)
    }

    const message = this.isNew ? 'Service créé!' : 'Service modifié';

    const toast = await this.toastCtrl.create({
      message: message,
      duration: 2000
    });
    await toast.present();
    this.nav.pop();
    // this.modalCtrl.dismiss();
  }

}
