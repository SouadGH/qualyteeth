import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PatientDto } from 'libs/shared/src/lib/dto/patient.dto';
import { PractitionerDto } from 'libs/shared/src/lib/dto/practitioner.dto';
import { API_ENDPOINT } from '../../environments/environment';
import { AuthService } from './auth.service';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class PractitionerService {

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
  public async getPractitionerId(): Promise<number> {
    const accessToken = await this.storageSvc.get('accessTokenQD');
    return await this.storageSvc.getUserid(accessToken);
  }

  /**
   *
   */
  public async getPractitioner(PractitionerId?: number): Promise<PractitionerDto> {
    const accessToken = await this.storageSvc.get('accessTokenQD');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    })

    if (PractitionerId == null) {
      PractitionerId = await this.storageSvc.getUserid(accessToken);
    }
    return await this.httpClient.get<PractitionerDto>(`${API_ENDPOINT}/PractitionerDto/${PractitionerId}`, { headers: headers }).toPromise();
  }

  /**
   *
   */
  public async update(PractitionerDto: PractitionerDto): Promise<void> {
    const accessToken = await this.storageSvc.get('accessTokenQD');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    })

    await this.httpClient.post(`${API_ENDPOINT}/PractitionerDto/update`, { PractitionerDto: PractitionerDto }, { headers: headers }).toPromise();
  }

  /**
   *
   */
  public async getPatientsForPractitioner(PractitionerId?: number): Promise<Array<PatientDto>> {
    const accessToken = await this.storageSvc.get('accessTokenQD');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    })

    if (PractitionerId == null) {
      PractitionerId = await this.storageSvc.getUserid(accessToken);
    }
    const patients: Array<PatientDto> = await this.httpClient.get<Array<PatientDto>>(`${API_ENDPOINT}/PractitionerDto/${PractitionerId}/patient/all`, { headers: headers }).toPromise();

    return patients;
  }

  // /**
  //  *
  //  */
  // public async getTimetable(PractitionerId?: number): Promise<Array<PractitionerTimetable>> {
  //   const accessToken = await this.storageSvc.get('accessTokenQD');

  //   const headers = new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     'Authorization': `Bearer ${accessToken}`
  //   })

  //   if (PractitionerId == null) {
  //     PractitionerId = await this.storageSvc.getUserid(accessToken);
  //   }

  //   return await this.httpClient.get<Array<PractitionerTimetable>>(`${API_ENDPOINT}/PractitionerDto/${PractitionerId}/timetable`, { headers: headers }).toPromise();
  // }

  // /**
  //  *
  //  */
  // public async updateTimetables(PractitionerId?: number, timetables?: Array<PractitionerTimetable>): Promise<void> {
  //   const accessToken = await this.storageSvc.get('accessTokenQD');

  //   const headers = new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     'Authorization': `Bearer ${accessToken}`
  //   })

  //   if (PractitionerId == null) {
  //     PractitionerId = await this.storageSvc.getUserid(accessToken);
  //   }

  //   await this.httpClient.put(`${API_ENDPOINT}/PractitionerDto/timetable/update`, { PractitionerId: PractitionerId, timetables: timetables }, { headers: headers }).toPromise();
  // }

}
