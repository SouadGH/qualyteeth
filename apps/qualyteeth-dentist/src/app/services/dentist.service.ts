import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_ENDPOINT } from '../../environments/environment';
import { Dentist } from 'libs/shared/src/lib/dentist.entity';
import { DentistTimetable } from 'libs/shared/src/lib/dentist-timetable.entity';
import { Patient } from 'libs/shared/src/lib/patient.entity';
import { AuthService } from './auth.service';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class DentistService {

  /**
   *
   */
  constructor(
    private storageSvc: StorageService,
    private authSvc: AuthService,
    private httpClient: HttpClient) { }

  /**
   *
   */
  public async getDentistId(): Promise<number> {
    const accessToken = await this.storageSvc.get('accessTokenQD');
    return await this.storageSvc.getUserid(accessToken);
  }

  /**
   *
   */
  public async getDentist(dentistId?: number): Promise<Dentist> {
    const accessToken = await this.storageSvc.get('accessTokenQD');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    })

    if (dentistId == null) {
      dentistId = await this.storageSvc.getUserid(accessToken);
    }
    return await this.httpClient.get<Dentist>(`${API_ENDPOINT}/dentist/${dentistId}`, { headers: headers }).toPromise();
  }

  /**
   *
   */
  public async update(dentist: Dentist): Promise<void> {
    const accessToken = await this.storageSvc.get('accessTokenQD');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    })

    await this.httpClient.post(`${API_ENDPOINT}/dentist/update`, { dentist: dentist }, { headers: headers }).toPromise();
  }

  /**
   *
   */
  public async getPatientsForDentist(dentistId?: number): Promise<Array<Patient>> {
    const accessToken = await this.storageSvc.get('accessTokenQD');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    })

    if (dentistId == null) {
      dentistId = await this.storageSvc.getUserid(accessToken);
    }
    const patients: Array<Patient> = await this.httpClient.get<Array<Patient>>(`${API_ENDPOINT}/dentist/${dentistId}/patient/all`, { headers: headers }).toPromise();

    return patients;
  }

  /**
   *
   */
  public async getTimetable(dentistId?: number): Promise<Array<DentistTimetable>> {
    const accessToken = await this.storageSvc.get('accessTokenQD');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    })

    if (dentistId == null) {
      dentistId = await this.storageSvc.getUserid(accessToken);
    }

    return await this.httpClient.get<Array<DentistTimetable>>(`${API_ENDPOINT}/dentist/${dentistId}/timetable`, { headers: headers }).toPromise();
  }

  /**
   *
   */
  public async updateTimetables(dentistId?: number, timetables?: Array<DentistTimetable>): Promise<void> {
    const accessToken = await this.storageSvc.get('accessTokenQD');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    })

    if (dentistId == null) {
      dentistId = await this.storageSvc.getUserid(accessToken);
    }

    await this.httpClient.put(`${API_ENDPOINT}/dentist/timetable/update`, { dentistId: dentistId, timetables: timetables }, { headers: headers }).toPromise();
  }

}
