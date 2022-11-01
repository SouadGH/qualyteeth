import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageService } from 'apps/qualyteeth-patient/src/app/services/storage.service';
import { API_ENDPOINT } from 'apps/qualyteeth-patient/src/environments/environment';
import { ServiceDefinition } from 'libs/shared/src/lib/service-definition.interface';

@Injectable({
  providedIn: 'root'
})
export class ServicingService {

  /**
   *
   */
  constructor(
    private storageSvc: StorageService,
    private httpClient: HttpClient) { }

  /**
   *
   */
  // public async getForSurgery(surgeryId: number): Promise<Array<Service>> {
  //   const accessToken = await this.storageSvc.get('accessTokenQP');

  //   const headers = new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     'Authorization': `Bearer ${accessToken}`
  //   })

  //   return await this.httpClient.get<Array<Service>>(`${API_ENDPOINT}/servicing/surgery/${surgeryId}`, { headers: headers }).toPromise();
  // }

  /**
   *
   */
  public async getDentists(serviceId: number): Promise<Array<any>> {
    const accessToken = await this.storageSvc.get('accessTokenQP');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    })

    return await this.httpClient.get<Array<any>>(`${API_ENDPOINT}/servicing/${serviceId}/dentists`, { headers: headers }).toPromise();
  }

  /**
   *
   */
  public async getDefinition(id: number): Promise<ServiceDefinition> {
    const accessToken = await this.storageSvc.get('accessTokenQP');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    })

    return await this.httpClient.get<ServiceDefinition>(`${API_ENDPOINT}/servicing/definition/${id}`, { headers: headers }).toPromise();
  }

  /**
   *
   */
   public async getServicesForPatient(patientId?: number): Promise<Array<any>> {
    const accessToken = await this.storageSvc.get('accessTokenQP');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    })

    if (patientId == null) {
      patientId = await this.storageSvc.getUserid(accessToken);
    }

    return await this.httpClient.get<Array<any>>(`${API_ENDPOINT}/servicing/patient/${patientId}`, { headers: headers }).toPromise();
  }
}
