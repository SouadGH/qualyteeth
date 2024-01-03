import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageService } from 'apps/qualyteeth-patient/src/app/services/storage.service';
import { API_ENDPOINT } from 'apps/qualyteeth-patient/src/environments/environment';
import { Dentist } from 'libs/shared/src/lib/dentist.entity';
import { ServiceDefinition } from 'libs/shared/src/lib/service-definition.entity';
import { Surgery } from 'libs/shared/src/lib/surgery.entity';

@Injectable({
  providedIn: 'root'
})
export class SurgeryService {

  /**
   *
   */
  constructor(
    private storageSvc: StorageService,
    private httpClient: HttpClient) {
  }

  /**
   *
   */
  public async getSurgery(id: number): Promise<Surgery> {
    const accessToken = await this.storageSvc.get('accessTokenQP');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    })

    return await this.httpClient.get<Surgery>(`${API_ENDPOINT}/surgery/${id}`, { headers: headers }).toPromise();
  }

  /**
   *
   */
  public async getSurgeriesForPatient(patientId?: number): Promise<Array<Surgery>> {
    const accessToken = await this.storageSvc.get('accessTokenQP');
    

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    });

    if (patientId == null) {
      patientId = await this.storageSvc.get('useridQP');
    }

    return await this.httpClient.get<Array<Surgery>>(`${API_ENDPOINT}/surgery/patient/${patientId}/all`, { headers: headers }).toPromise();
  }

  /**
   *
   */
  public async getSurgeryForDentist(dentistId: number): Promise<Surgery> {
    const accessToken = await this.storageSvc.get('accessTokenQP');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    })

    return await this.httpClient.get<Surgery>(`${API_ENDPOINT}/surgery/dentist/${dentistId}`, { headers: headers }).toPromise();
  }

  /**
   *
   */
  public async getDentistsForSurgery(surgeryId: number): Promise<Array<Dentist>> {
    const accessToken = await this.storageSvc.get('accessTokenQP');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    })

    return await this.httpClient.get<Array<Dentist>>(`${API_ENDPOINT}/surgery/${surgeryId}/dentists`, { headers: headers }).toPromise();
  }

  /**
   *
   */
  public async getServicesForSurgery(surgeryId: number): Promise<Array<ServiceDefinition>> {
    const accessToken = await this.storageSvc.get('accessTokenQP');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    })

    return await this.httpClient.get<Array<ServiceDefinition>>(`${API_ENDPOINT}/surgery/${surgeryId}/services`, { headers: headers }).toPromise();
  }

  /**
   *
   */
  // public async findConnectedSurgeries(): Promise<Array<Surgery>> {
  //   const accessToken = await this.storageSvc.get('accessTokenQP');

  //   const headers = new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     'Authorization': `Bearer ${accessToken}`
  //   })

  //   const userid = await this.storageSvc.get('useridQP');

  //   return await this.httpClient.get<Array<Surgery>>(`API_ENDPOINT/patient/${userid}/surgeries`, { headers: headers }).toPromise();
  // }

   /**
   *
   */
  public async link(surgeryId: number): Promise<number> {
    const accessToken = await this.storageSvc.get('accessTokenQP');
    const userId = await this.storageSvc.get('useridQP');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    })

    return await this.httpClient.post<number>(`${API_ENDPOINT}/surgery/patient/link`, { surgeryId: surgeryId, patientId: userId }, { headers: headers }).toPromise();
  }

  /**
   *
   */
  public async search(name: string, postalCode: string): Promise<Surgery> {
    const accessToken = await this.storageSvc.get('accessTokenQP');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    })

    const body = {
      name: name,
      postalCode: postalCode
    }

    return await this.httpClient.post<any>(`${API_ENDPOINT}/surgery/search`, body, { headers: headers }).toPromise();
  }
}
