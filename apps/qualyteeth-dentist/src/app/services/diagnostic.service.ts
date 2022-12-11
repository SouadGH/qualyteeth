import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_ENDPOINT } from 'apps/qualyteeth-dentist/src/environments/environment';
import { DiagnosticDefinition } from 'libs/shared/src/lib/diagnostic-definition.interface';
import { Diagnostic } from 'libs/shared/src/lib/diagnostic.interface';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class DiagnosticService {

  constructor(
    private storageSvc: StorageService,
    private httpClient: HttpClient,
  ) { }

  /**
   *
   */
   public async getDefinition(id: number): Promise<DiagnosticDefinition> {
    const accessToken = await this.storageSvc.get('accessTokenQD');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    });

    return await this.httpClient.get<DiagnosticDefinition>(`${API_ENDPOINT}/diagnostic/definition/${id}`, { headers: headers }).toPromise();
  }

  /**
   *
   */
  //  public async getDefaultDiagnosticDefinitions(): Promise<Array<DiagnosticDefinition>> {
  //   const accessToken = await this.storageSvc.get('accessTokenQD');

  //   const headers = new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     'Authorization': `Bearer ${accessToken}`
  //   });

  //   return await this.httpClient.get<Array<DiagnosticDefinition>>(`${API_ENDPOINT}/diagnostic/definition/default`, { headers: headers }).toPromise();
  // }

  /**
   *
   */
  public async getDefinitionsForDentist(dentistId?: number): Promise<Array<DiagnosticDefinition>> {
    const accessToken = await this.storageSvc.get('accessTokenQD');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    });

    if (dentistId == null) {
      dentistId = await this.storageSvc.getUserid(accessToken);
    }

    return await this.httpClient.get<Array<DiagnosticDefinition>>(`${API_ENDPOINT}/diagnostic/definition/dentist/${dentistId}`, { headers: headers }).toPromise();
  }

  /**
   *
   */
   public async saveDefinition(d: DiagnosticDefinition): Promise<void> {
    const accessToken = await this.storageSvc.get('accessTokenQD');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    });

    const body = {
      'definition': d
    }

    return await this.httpClient.post<void>(`${API_ENDPOINT}/diagnostic/definition/save/`, body, { headers: headers }).toPromise();
  }

  /**
   *
   */
   public async updateDefinition(d: DiagnosticDefinition): Promise<void> {
    const accessToken = await this.storageSvc.get('accessTokenQD');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    });

    const body = {
      'diagnostic': d
    }

    return await this.httpClient.put<void>(`${API_ENDPOINT}/diagnostic/definition/update/`, body, { headers: headers }).toPromise();
  }



  /**
   *
   */
   public async save(diagnostic: Diagnostic): Promise<void> {
    const accessToken = await this.storageSvc.get('accessTokenQD');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    })

    const body = {
      diagnostic: diagnostic
    }

    await this.httpClient.post(`${API_ENDPOINT}/diagnostic/add`, body, { headers: headers }).toPromise();
  }

  /**
   *
   */
  public async getAllForDentist(dentistId?: number): Promise<Array<Diagnostic>> {
    const accessToken = await this.storageSvc.get('accessTokenQD');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    })

    if (dentistId == null) {
      dentistId = await this.storageSvc.getUserid(accessToken);
    }

    return await this.httpClient.get<Array<Diagnostic>>(`${API_ENDPOINT}/diagnostic/dentist/${dentistId}`, { headers: headers }).toPromise();
  }

  /**
   *
   */
   public async getAllForPatient(patientId: number): Promise<Array<Diagnostic>> {
    const accessToken = await this.storageSvc.get('accessTokenQD');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    })

    return await this.httpClient.get<Array<Diagnostic>>(`${API_ENDPOINT}/diagnostic/patient/${patientId}`, { headers: headers }).toPromise();
  }

  /**
   *
   */
   public async getForPatientAndDentist(patientId: number, dentistId?: number): Promise<Array<Diagnostic>> {
    const accessToken = await this.storageSvc.get('accessTokenQD');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    })

    if (dentistId == null) {
      dentistId = await this.storageSvc.getUserid(accessToken);
    }

    return await this.httpClient.get<Array<Diagnostic>>(`${API_ENDPOINT}/diagnostic/patient/${patientId}/dentist/${dentistId}`, { headers: headers }).toPromise();
  }

  /**
   *
   */
   public async getForPatientAndTooth(patientId: number, toothFdiNumber: number): Promise<Array<Diagnostic>> {
    const accessToken = await this.storageSvc.get('accessTokenQD');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    })

    return await this.httpClient.get<Array<Diagnostic>>(`${API_ENDPOINT}/diagnostic/patient/${patientId}/tooth/${toothFdiNumber}`, { headers: headers }).toPromise();
  }

  /**
   *
   */
  //  public async getForPatientAndTeeth(patientId: number, toothFdiNumbers: Array<number>): Promise<Array<Diagnostic>> {
  //   const accessToken = await this.storageSvc.get('accessTokenQD');

  //   const headers = new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     'Authorization': `Bearer ${accessToken}`
  //   })

  //   let teethUrlPart: string = '';
  //   for (let i=0; i<toothFdiNumbers.length; i++) {
  //     teethUrlPart += toothFdiNumbers[i];
  //     if (i < toothFdiNumbers.length - 1) {
  //       teethUrlPart += '|';
  //     }
  //   }
  //   console.log(teethUrlPart)

  //   return await this.httpClient.get<Array<Diagnostic>>(`${API_ENDPOINT}/diagnostic/patient/${patientId}/teeth/${teethUrlPart}`, { headers: headers }).toPromise();
  // }



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

    await this.httpClient.post(`${API_ENDPOINT}/diagnostic/init`, body, { headers: headers }).toPromise();
  }
  
}
