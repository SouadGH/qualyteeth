import { Pipe, PipeTransform } from '@angular/core';
import { Patient } from 'libs/shared/src/lib/patient.interface';
import { PatientService } from '../services/patient.service';


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
    const p: Patient = await this.patientSvc.getPatient(patientId);
    // console.log(d)
    if (p == null) {
      return null;
    }
    return `${p.firstname} ${p.lastname}`;
  }
}