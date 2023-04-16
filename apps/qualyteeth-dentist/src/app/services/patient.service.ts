import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_ENDPOINT } from 'apps/qualyteeth-dentist/src/environments/environment';
import { Patient } from 'libs/shared/src/lib/patient.entity';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  /**
   *
   */
  constructor(
    private storageSvc: StorageService,
    private httpClient: HttpClient) { }

  /**
   *
   */
  public async add(patient: Patient, dentistId?: number): Promise<void> {
    const accessToken = await this.storageSvc.get('accessTokenQD');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    })

    if (dentistId == null) {
      dentistId = await this.storageSvc.getUserid(accessToken);
    }

    await this.httpClient.post(`${API_ENDPOINT}/patient/add`, { patient: patient, dentistId: dentistId }, { headers: headers }).toPromise();
  }

  /**
   *
   */
  public async getPatient(patientId: number): Promise<Patient> {
    // console.trace()
    const accessToken = await this.storageSvc.get('accessTokenQD');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    })

    return await this.httpClient.get<Patient>(`${API_ENDPOINT}/patient/${patientId}`, { headers: headers }).toPromise();
  }
}
