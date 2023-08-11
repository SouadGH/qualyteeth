import { Pipe, PipeTransform } from '@angular/core';
import { PatientService } from '../services/patient.service';
import { PatientDto } from 'libs/shared/src/lib/dto/patient.dto';


@Pipe({
  name: 'patient'
})
export class PatientPipe implements PipeTransform {

  /**
   *
   */
  constructor(private patientSvc: PatientService) { }

  /**
   *
   */
  async transform(patientId: number): Promise<string> {
    const p: PatientDto = await this.patientSvc.getPatient(patientId);
    // console.log(d)
    if (p == null) {
      return null;
    }
    return `${p.user.firstname} ${p.user.lastname}`;
  }
}