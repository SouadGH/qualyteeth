import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageService } from 'apps/qualyteeth-patient/src/app/services/storage.service';
import { API_ENDPOINT } from '../../environments/environment';
import { Patient } from 'libs/shared/src/lib/patient.entity';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  constructor(
    private storageSvc: StorageService,
    private httpClient: HttpClient) { }

  /**
   *
   */
  public async getPatient(): Promise<any> {
    const accessToken = await this.storageSvc.get('accessTokenQP');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    })

    const userId = await this.storageSvc.get('useridQP');
    return await this.httpClient.get<Patient>(`${API_ENDPOINT}/patient/${userId}`, { headers: headers }).toPromise();
  }

  /**
   *
   */
  public async update(patient: Patient): Promise<void> {
    const accessToken = await this.storageSvc.get('accessTokenQP');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    })

    await this.httpClient.post(`${API_ENDPOINT}/patient/update`, { patient: patient }, { headers: headers }).toPromise();
  }

}
