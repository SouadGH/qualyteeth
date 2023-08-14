import { Pipe, PipeTransform } from '@angular/core';
import { PractitionerService } from '../services/practitioner.service';
import { PractitionerDto } from 'libs/shared/src/lib/dto/practitioner.dto';


@Pipe({
  name: 'dentist'
})
export class DentistPipe implements PipeTransform {

  /**
   *
   */
  constructor(private dentistSvc: PractitionerService) { }

  /**
   *
   */
  async transform(dentistId: string): Promise<string> {
    const d: PractitionerDto = await this.dentistSvc.getPractitioner(dentistId)
    // console.log(d)
    if (d == null) {
      return null;
    }
    return `${d.user.firstname} ${d.user.lastname}`;
  }
}