import { Pipe, PipeTransform } from '@angular/core';
import { Dentist } from 'libs/shared/src/lib/dentist.entity';
import { DentistService } from '../services/dentist.service';


@Pipe({
  name: 'dentist'
})
export class DentistPipe implements PipeTransform {

  /**
   *
   */
  constructor(private dentistSvc: DentistService) { }

  /**
   *
   */
  async transform(dentistId: number): Promise<string> {
    const d: Dentist = await this.dentistSvc.getDentist(dentistId)
    // console.log(d)
    if (d == null) {
      return null;
    }
    return `${d.userData.firstname} ${d.userData.lastname}`;
  }
}