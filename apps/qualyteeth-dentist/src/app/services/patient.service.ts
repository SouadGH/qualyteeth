import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_ENDPOINT } from 'apps/qualyteeth-dentist/src/environments/environment';
import { StorageService } from './storage.service';
import { PatientDto } from 'libs/shared/src/lib/dto/patient.dto';
import { lastValueFrom } from 'rxjs';
import { PractitionerService } from './practitioner.service';
import { PractitionerDto } from 'libs/shared/src/lib/dto/practitioner.dto';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  /**
   *
   */
  constructor(
    private storageSvc: StorageService,
    private practitionerSvc: PractitionerService,
    private httpClient: HttpClient) { }

  /**
   *
   */
  public async add(patient: PatientDto): Promise<void> {
    const accessToken = await this.storageSvc.get('accessTokenQD');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    })

   const userId: string = await this.storageSvc.getUserid(accessToken);
    console.log("new patient is :"+JSON.stringify(patient));
    console.log("userId is :"+userId);
    await lastValueFrom(this.httpClient.post(`${API_ENDPOINT}/patients/add`, { patient: patient, userId: userId }, { headers: headers }));
  }

  /**
   *
   */
  public async getPatient(patientId: string): Promise<PatientDto> {
    // console.trace()
    const accessToken = await this.storageSvc.get('accessTokenQD');
   

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    })

    return await this.httpClient.get<PatientDto>(`${API_ENDPOINT}/patients/${patientId}`, { headers: headers }).toPromise();
  }
}
