import { Component } from '@angular/core';

@Component({
  selector: 'app-link-service',
  templateUrl: './link-service.page.html',
  styleUrls: ['./link-service.page.scss'],
})
export class LinkServicePage {

  // services: Array<ServiceDefinition> = new Array<ServiceDefinition>();
  // filteredServices: Observable<ServiceDefinition[]>;

  // surgery: Surgery;
  // dentist: any;

  // addServiceForm: FormGroup;

  // /**
  //  *
  //  */
  // constructor(
  //   private modalCtrl: ModalController,
  //   private navParams: NavParams,
  //   private servicingSvc: ServicingService,
  //   private fb: FormBuilder,
  // ) {
  //   this.surgery = this.navParams.get('surgery');
  //   this.dentist = this.navParams.get('dentist');
  //   this.services = this.navParams.get('services');

  //   this.addServiceForm = this.fb.group({
  //     name: [null, [Validators.required]],
  //     timing: [null, [Validators.required]],
  //   });
  // }

  // /**
  //  *
  //  */
  // async ngOnInit() {
  //   await this.initDropdown();
  //  }

  // /**
  //  * 
  //  */
  // async initDropdown(): Promise<void> {
  //   const services = this.services.filter(s => this.dentist.services.find(ds => ds.id === s.id) == null);

  //   this.filteredServices = this.addServiceForm.controls['name'].valueChanges.pipe(
  //     startWith(''),
  //     // map(s => { console.log(services); return s; }),
  //     map(value => typeof value == 'object' ? this.display(value) : value),
  //     map(value => value ? this._filterService(value) : services.slice())
  //   );
  // }

  // /**
  //  *
  //  */
  // private _filterService(value: string): Array<ServiceDefinition> {
  //   // console.log(value)
  //   const filterValue = value.toLowerCase().trim();
  //   return this.services.filter(c => c.name.toLowerCase().indexOf(filterValue) === 0);
  // }

  // /**
  //  *
  //  */
  // display(s: ServiceDefinition): string {
  //   if (s == null) {
  //     return '';
  //   }
  //   return `${s.name}`;
  // }

  // /**
  //  *
  //  */
  // async delete(s: ServiceDefinition): Promise<void> {
  //   this.dentist.services = this.dentist.services.filter(sv => sv.id != s.id);
  //   await this.initDropdown();
  // }

  // /**
  //  *
  //  */
  // async close(): Promise<void> {
  //   await this.modalCtrl.dismiss();
  // }

  // /**
  //  *
  //  */
  // async update(): Promise<void> {
  //   const newService: any = this.addServiceForm.controls['name'].value;
  //   const timing: number = this.addServiceForm.controls['timing'].value;

  //   if (newService != null && timing != null) {
  //     newService.timing = timing;
  //     this.dentist.services.push(newService);
  //   }

  //   // await this.servicingSvc.updateServiceLink(this.dentist.id, this.surgery.id, this.dentist.services)
  //   await this.modalCtrl.dismiss();
  // }

}
