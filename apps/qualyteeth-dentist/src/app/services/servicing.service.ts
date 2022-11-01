import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_ENDPOINT } from 'apps/qualyteeth-dentist/src/environments/environment';
// import { ServiceDefinition } from 'libs/shared/src/lib/service-definition.interface';
import { ServiceDefinition } from 'libs/shared/src/lib/service-definition.interface';
import { ServiceLink } from 'libs/shared/src/lib/service.interface';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class ServicingService {

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
   public async getDefinition(id: number): Promise<ServiceDefinition> {
    const accessToken = await this.storageSvc.get('accessTokenQD');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    })

    return await this.httpClient.get<ServiceDefinition>(`${API_ENDPOINT}/servicing/definition/${id}`, { headers: headers }).toPromise();
  }

  /**
   *
   */
  public async saveDefinition(service: ServiceDefinition, links?: Array<ServiceLink>): Promise<number> {
    const accessToken = await this.storageSvc.get('accessTokenQD');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    })

    const body = {
      service: service,
      serviceLinks: links
    }

    return await this.httpClient.post<number>(`${API_ENDPOINT}/servicing/definition/save`, body, { headers: headers }).toPromise();
  }

  /**
   *
   */
   public async updateDefinition(service: ServiceDefinition, links?: Array<ServiceLink>): Promise<number> {
    const accessToken = await this.storageSvc.get('accessTokenQD');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    })

    const body = {
      service: service,
      serviceLinks: links
    }

    return await this.httpClient.put<number>(`${API_ENDPOINT}/servicing/definition/update`, body, { headers: headers }).toPromise();
  }

  /**
   *
   */
  // public async updateServiceLink(dentistId: number, surgeryId: number, services: Array<any>): Promise<number> {
  //   const accessToken = await this.storageSvc.get('accessTokenQD');

  //   const headers = new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     'Authorization': `Bearer ${accessToken}`
  //   })

  //   const body = {
  //     surgeryId: surgeryId,
  //     dentistId: dentistId,
  //     services: services
  //   }

  //   return await this.httpClient.put<number>(`${API_ENDPOINT}/servicing/link/update`, body, { headers: headers }).toPromise();
  // }

  /**
   *
   */
  // public async delete(serviceId: number): Promise<void> {
  //   const accessToken = await this.storageSvc.get('accessTokenQD');

  //   const headers = new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     'Authorization': `Bearer ${accessToken}`
  //   })

  //   const body = {
  //     serviceId: serviceId
  //   }

  //   await this.httpClient.post<void>(`${API_ENDPOINT}/servicing/delete`, body, { headers: headers }).toPromise();
  // }

  /**
   *
   */
   public async getDefinitionsForDentist(dentistId?: number): Promise<Array<ServiceDefinition>> {
    const accessToken = await this.storageSvc.get('accessTokenQD');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    })

    if (dentistId == null) {
      dentistId = await this.storageSvc.getUserid(accessToken);
    }

    return await this.httpClient.get<Array<ServiceDefinition>>(`${API_ENDPOINT}/servicing/definition/dentist/${dentistId}`, { headers: headers }).toPromise();
  }

  /**
   *
   */
   public async getDefinitionsForSurgery(surgeryId: number): Promise<Array<any>> {
    const accessToken = await this.storageSvc.get('accessTokenQD');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    })

    return await this.httpClient.get<Array<any>>(`${API_ENDPOINT}/servicing/definition/surgery/${surgeryId}`, { headers: headers }).toPromise();
  }

  /**
   *
   */
  // public async getForSurgery(surgeryId: number): Promise<Array<Service>> {
  //   const accessToken = await this.storageSvc.get('accessTokenQD');

  //   const headers = new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     'Authorization': `Bearer ${accessToken}`
  //   })

  //   return await this.httpClient.get<Array<Service>>(`${API_ENDPOINT}/servicing/surgery/${surgeryId}`, { headers: headers }).toPromise();
  // }

  /**
   *
   */
  public async getServiceLinks(serviceId: number): Promise<Array<ServiceLink>> {
    const accessToken = await this.storageSvc.get('accessTokenQD');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    })

    return await this.httpClient.get<Array<ServiceLink>>(`${API_ENDPOINT}/servicing/links/${serviceId}`, { headers: headers }).toPromise();
  }

  /**
   *
   */
   public async getServiceLinksForDentist(dentistId?: number): Promise<Array<any>> {
    const accessToken = await this.storageSvc.get('accessTokenQD');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    })

    if (dentistId == null) {
      dentistId = await this.storageSvc.getUserid(accessToken);
    }

    return await this.httpClient.get<Array<ServiceLink>>(`${API_ENDPOINT}/servicing/links/dentist/${dentistId}`, { headers: headers }).toPromise();
  }
}
