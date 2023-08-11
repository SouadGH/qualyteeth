import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_ENDPOINT } from '../../environments/environment';
import { StorageService } from './storage.service';
import { lastValueFrom } from 'rxjs';
import { ActDto } from 'libs/shared/src/lib/dto/act.dto';

@Injectable({
  providedIn: 'root'
})
export class TreatmentService {

  /**
   *
   */
  constructor(
    private storageSvc: StorageService,
    private httpClient: HttpClient) { }


  // /**
  //  *
  //  */
  // public async getTreatmentDefinition(id: number): Promise<TreatmentDefinition> {
  //   const accessToken = await this.storageSvc.get('accessTokenQD');

  //   const headers = new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     'Authorization': `Bearer ${accessToken}`
  //   });

  //   return await this.httpClient.get<TreatmentDefinition>(`${API_ENDPOINT}/treatment/definition/${id}`, { headers: headers }).toPromise();
  // }

  /**
   *
   */
  public async getActsForDefinition(id: number): Promise<Array<ActDto>> {
    const accessToken = await this.storageSvc.get('accessTokenQD');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    });

    return await this.httpClient.get<Array<ActDto>>(`${API_ENDPOINT}/treatment/definition/acts/${id}`, { headers: headers }).toPromise();
  }

  // /**
  //  *
  //  */
  // public async getDefaultDefinitions(): Promise<Array<TreatmentDefinition>> {
  //   const accessToken = await this.storageSvc.get('accessTokenQD');

  //   const headers = new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     'Authorization': `Bearer ${accessToken}`
  //   });

  //   return await this.httpClient.get<Array<TreatmentDefinition>>(`${API_ENDPOINT}/treatment/definition/default`, { headers: headers }).toPromise();
  // }

  /**
   *
   */
  // public async getDefinitionsForDentist(dentistId?: number): Promise<Array<TreatmentDefinition>> {
  //   const accessToken = await this.storageSvc.get('accessTokenQD');

  //   const headers = new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     'Authorization': `Bearer ${accessToken}`
  //   });

  //   if (dentistId == null) {
  //     dentistId = await this.storageSvc.getUserid(accessToken);
  //   }

  //   return await this.httpClient.get<Array<TreatmentDefinition>>(`${API_ENDPOINT}/treatment/definition/dentist/${dentistId}`, { headers: headers }).toPromise();
  // }

  /**
   *
   */
  // public async saveDefinition(t: TreatmentDefinition): Promise<void> {
  //   const accessToken = await this.storageSvc.get('accessTokenQD');

  //   const headers = new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     'Authorization': `Bearer ${accessToken}`
  //   });

  //   const body = {
  //     'treatment': t
  //   }

  //   return await this.httpClient.post<void>(`${API_ENDPOINT}/treatment/definition/save/`, body, { headers: headers }).toPromise();
  // }

  /**
   *
   */
  public async deleteDefinition(tId: string): Promise<void> {
    const accessToken = await this.storageSvc.get('accessTokenQD');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    });

    const body = {
      definitionId: tId
    }

    await lastValueFrom(this.httpClient.put<void>(`${API_ENDPOINT}/treatment/definition/delete`, body, { headers: headers }));
  }

  /**
   *
   */
  // public async updateDefinition(t: TreatmentDefinition): Promise<void> {
  //   const accessToken = await this.storageSvc.get('accessTokenQD');

  //   const headers = new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     'Authorization': `Bearer ${accessToken}`
  //   });

  //   const body = {
  //     'treatment': t
  //   }

  //   return await this.httpClient.put<void>(`${API_ENDPOINT}/treatment/definition/update/`, body, { headers: headers }).toPromise();
  // }



  /**
   *
   */
  // public async getById(id: number): Promise<Treatment> {
  //   const accessToken = await this.storageSvc.get('accessTokenQD');

  //   const headers = new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     'Authorization': `Bearer ${accessToken}`
  //   });

  //   return await lastValueFrom(this.httpClient.get<Treatment>(`${API_ENDPOINT}/treatment/${id}`, { headers: headers }));
  // }


  /**
   *
   */
  // public async getForDentist(dentistId?: number): Promise<Array<Treatment>> {
  //   const accessToken = await this.storageSvc.get('accessTokenQD');

  //   const headers = new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     'Authorization': `Bearer ${accessToken}`
  //   });

  //   if (dentistId == null) {
  //     dentistId = await this.storageSvc.getUserid(accessToken);
  //   }

  //   return await this.httpClient.get<Array<Treatment>>(`${API_ENDPOINT}/treatment/dentist/${dentistId}`, { headers: headers }).toPromise();
  // }

  /**
   *
   */
  // public async getForPatient(patientId: number): Promise<Array<Treatment>> {
  //   const accessToken = await this.storageSvc.get('accessTokenQD');

  //   const headers = new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     'Authorization': `Bearer ${accessToken}`
  //   });

  //   return await this.httpClient.get<Array<Treatment>>(`${API_ENDPOINT}/treatment/patient/${patientId}`, { headers: headers }).toPromise();
  // }

  /**
   *
   */
  // public async getForPatientAndDentist(patientId: number, dentistId?: number): Promise<Array<Treatment>> {
  //   const accessToken = await this.storageSvc.get('accessTokenQD');

  //   const headers = new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     'Authorization': `Bearer ${accessToken}`
  //   });

  //   if (dentistId == null) {
  //     dentistId = await this.storageSvc.getUserid(accessToken);
  //   }

  //   return await this.httpClient.get<Array<Treatment>>(`${API_ENDPOINT}/treatment/patient/${patientId}/dentist/${dentistId}`, { headers: headers }).toPromise();
  // }

  /**
   *
   */
  // public async getForPatientAndDentistAndTooth(patientId: number, toothFdiNumber: number, dentistId?: number): Promise<Array<Treatment>> {
  //   const accessToken = await this.storageSvc.get('accessTokenQD');

  //   const headers = new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     'Authorization': `Bearer ${accessToken}`
  //   });

  //   if (dentistId == null) {
  //     dentistId = await this.storageSvc.getUserid(accessToken);
  //   }

  //   return await this.httpClient.get<Array<Treatment>>(`${API_ENDPOINT}/treatment/patient/${patientId}/dentist/${dentistId}/tooth/${toothFdiNumber}`, { headers: headers }).toPromise();
  // }

  /**
   *
   */
  // public async save(treatment: Treatment): Promise<void> {
  //   const accessToken = await this.storageSvc.get('accessTokenQD');

  //   const headers = new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     'Authorization': `Bearer ${accessToken}`
  //   });

  //   await this.httpClient.post<void>(`${API_ENDPOINT}/treatment/save/`, { treatment: treatment }, { headers: headers }).toPromise();
  // }


  /**
   *
   */
  public async getActs(): Promise<Array<ActDto>> {
    const accessToken = await this.storageSvc.get('accessTokenQD');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    });

    return await this.httpClient.get<Array<ActDto>>(`${API_ENDPOINT}/treatment/acts/`, { headers: headers }).toPromise();
  }

  /**
   *
   */
  public async init(dentistId?: number): Promise<void> {
    const accessToken = await this.storageSvc.get('accessTokenQD');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    })

    if (dentistId == null) {
      dentistId = await this.storageSvc.getUserid(accessToken);
    }

    const body = {
      dentistId: dentistId
    }

    await this.httpClient.post(`${API_ENDPOINT}/treatment/init`, body, { headers: headers }).toPromise();
  }
}
