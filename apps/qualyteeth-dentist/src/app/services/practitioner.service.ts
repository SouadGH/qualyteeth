import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PatientDto } from 'libs/shared/src/lib/dto/patient.dto';
import { PractitionerDto } from 'libs/shared/src/lib/dto/practitioner.dto';
import { API_ENDPOINT } from '../../environments/environment';
import { AuthService } from './auth.service';
import { StorageService } from './storage.service';
import { lastValueFrom } from 'rxjs';

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
  public async getPractitionerId(): Promise<string> {
    const accessToken = await this.storageSvc.get('accessTokenQD');
    return await this.storageSvc.getUserid(accessToken);
  }

  /**
   *
   */
  public async getPractitioner(practitionerId?: string): Promise<PractitionerDto> {
    const accessToken = await this.storageSvc.get('accessTokenQD');
<<<<<<< HEAD
    
=======
>>>>>>> c6740c8dc4e6e69e5f3be7ef55127ed511d52617

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    })
<<<<<<< HEAD
    practitionerId = await this.storageSvc.get('useridQD');    
   
    if (practitionerId == null) {
      practitionerId = await this.storageSvc.getUserid(accessToken);
    }
    
    return await this.httpClient.get<PractitionerDto>(`${API_ENDPOINT}/practitioner/${practitionerId}`, { headers: headers }).toPromise();
  }

  

=======

    if (practitionerId == null) {
      practitionerId = await this.storageSvc.getUserid(accessToken);
    }
    return await this.httpClient.get<PractitionerDto>(`${API_ENDPOINT}/practitioner/${practitionerId}`, { headers: headers }).toPromise();
  }

>>>>>>> c6740c8dc4e6e69e5f3be7ef55127ed511d52617
  /**
   *
   */
  public async getByUserId(userId?: string): Promise<PractitionerDto> {
    const accessToken = await this.storageSvc.get('accessTokenQD');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    })

    if (userId == null) {
      userId = await this.storageSvc.getUserid(accessToken);
    }
    
    return await lastValueFrom(this.httpClient.get<PractitionerDto>(`${API_ENDPOINT}/practitioner/user/${userId}`, { headers: headers }));
  }

  /**
   *
   */
  public async update(practitioner: PractitionerDto): Promise<void> {
    const accessToken = await this.storageSvc.get('accessTokenQD');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    })
<<<<<<< HEAD
    console.log("dentiste devant service update :"+ practitioner);
    await this.httpClient.post(`${API_ENDPOINT}/practitioner/update`, { practitioner: practitioner }, { headers: headers }).toPromise();
=======

    await this.httpClient.post(`${API_ENDPOINT}/PractitionerDto/update`, { practitioner: practitioner }, { headers: headers }).toPromise();
>>>>>>> c6740c8dc4e6e69e5f3be7ef55127ed511d52617
  }

  /**
   *
   */
  public async getPatientsForPractitioner(): Promise<Array<PatientDto>> {
    const accessToken = await this.storageSvc.get('accessTokenQD');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    })

    const userId = await this.storageSvc.getUserid(accessToken);
    const patients: Array<PatientDto> = await this.httpClient.get<Array<PatientDto>>(`${API_ENDPOINT}/practitioner/${userId}/patient/all`, { headers: headers }).toPromise();

    return patients;
  }

  // /**
  //  *
  //  */
<<<<<<< HEAD
   public async getTimetable(PractitionerId?: string): Promise<Array<any>> {
     const accessToken = await this.storageSvc.get('accessTokenQD');

     const headers = new HttpHeaders({
       'Content-Type': 'application/json',
       'Authorization': `Bearer ${accessToken}`
     })

     if (PractitionerId == null) {
       PractitionerId = await this.storageSvc.getUserid(accessToken);
     }

     return await this.httpClient.get<Array<any>>(`${API_ENDPOINT}/practitioner/${PractitionerId}/timetable`, { headers: headers }).toPromise();
   }
=======
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
>>>>>>> c6740c8dc4e6e69e5f3be7ef55127ed511d52617

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
