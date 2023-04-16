import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { API_ENDPOINT } from 'apps/qualyteeth-dentist/src/environments/environment';
import { Dentist } from 'libs/shared/src/lib/dentist.entity';
import { Patient } from 'libs/shared/src/lib/patient.entity';
import { Surgery } from 'libs/shared/src/lib/surgery.entity';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class SurgeryService {

  // public surgerySubject: Subject<Surgery> = new Subject<Surgery>();
  public activeSurgery: Surgery;

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
  public async save(surgery: Surgery): Promise<number> {
    const accessToken = await this.storageSvc.get('accessTokenQD');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    })

    const body = {
      surgery: surgery
    }

    surgery.id = await this.httpClient.post<number>(`${API_ENDPOINT}/surgery/add`, body, { headers: headers }).toPromise();
    // this.surgerySubject.next(surgery)
    return surgery.id;
  }

  /**
   *
   */
  public async update(surgery: Surgery): Promise<void> {
    const accessToken = await this.storageSvc.get('accessTokenQD');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    })

    await this.httpClient.put<number>(`${API_ENDPOINT}/surgery/update`, { surgery: surgery }, { headers: headers }).toPromise();
    // this.surgerySubject.next(surgery)
  }

  /**
   *
   */
  public async link(surgery: Surgery, dentistId?: number): Promise<number> {
    const accessToken = await this.storageSvc.get('accessTokenQD');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    })

    if (dentistId == null) {
      dentistId = await this.storageSvc.getUserid(accessToken);
    }

    return await this.httpClient.post<number>(`${API_ENDPOINT}/surgery/dentist/link`, { surgeryId: surgery.id, dentistId: dentistId }, { headers: headers }).toPromise();
  }

  /**
   *
   */
  public async activate(surgery: Surgery, dentistId?: number): Promise<void> {
    const accessToken = await this.storageSvc.get('accessTokenQD');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    })

    if (dentistId == null) {
      dentistId = await this.storageSvc.getUserid(accessToken);
    }

    await this.httpClient.post<void>(`${API_ENDPOINT}/surgery/activate`, { surgeryId: surgery.id, dentistId: dentistId }, { headers: headers }).toPromise();
    this.activeSurgery = surgery;
    // this.surgerySubject.next(surgery)
  }

  /**
   *
   */
   public async deactivate(surgery: Surgery, dentistId?: number): Promise<void> {
    const accessToken = await this.storageSvc.get('accessTokenQD');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    })

    if (dentistId == null) {
      dentistId = await this.storageSvc.getUserid(accessToken);
    }

    await this.httpClient.post<void>(`${API_ENDPOINT}/surgery/deactivate`, { surgeryId: surgery.id, dentistId: dentistId }, { headers: headers }).toPromise();
    this.activeSurgery = null;
    // this.surgerySubject.next(surgery)
  }

  /**
   *
   */
  public async getSurgery(id: number): Promise<Surgery> {
    const accessToken = await this.storageSvc.get('accessTokenQD');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    })

    return await this.httpClient.get<Surgery>(`${API_ENDPOINT}/surgery/${id}`, { headers: headers }).toPromise();
  }

  /**
   *
   */
  public async getActiveSurgeryForDentist(dentistId?: number): Promise<Surgery> {
    const accessToken = await this.storageSvc.get('accessTokenQD');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    })

    if (dentistId == null) {
      dentistId = await this.storageSvc.getUserid(accessToken);
    }

    return await this.httpClient.get<Surgery>(`${API_ENDPOINT}/surgery/dentist/${dentistId}`, { headers: headers }).toPromise();
  }

  /**
   *
   */
  public async getSurgeriesForDentist(dentistId?: number): Promise<Array<Surgery>> {
    const accessToken = await this.storageSvc.get('accessTokenQD');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    })

    if (dentistId == null) {
      dentistId = await this.storageSvc.getUserid(accessToken);
    }

    return await this.httpClient.get<Array<Surgery>>(`${API_ENDPOINT}/surgery/dentist/${dentistId}/all`, { headers: headers }).toPromise();
  }

  /**
   *
   */
  public async getDentistsForSurgery(surgeryId: number): Promise<Array<Dentist>> {
    const accessToken = await this.storageSvc.get('accessTokenQD');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    })

    return await this.httpClient.get<Array<Dentist>>(`${API_ENDPOINT}/surgery/${surgeryId}/dentists`, { headers: headers }).toPromise();
  }

  /**
   *
   */
  public async getPatienstForSurgery(surgeryId: number): Promise<Array<Patient>> {
    const accessToken = await this.storageSvc.get('accessTokenQD');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    })

    return await this.httpClient.get<Array<Patient>>(`${API_ENDPOINT}/surgery/${surgeryId}/patients`, { headers: headers }).toPromise();
  }
}
