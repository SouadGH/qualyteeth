import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageService } from 'apps/qualyteeth-patient/src/app/services/storage.service';
import { Dentist } from 'libs/shared/src/lib/dentist.entity';
import { API_ENDPOINT } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DentistService {

  /**
   *
   */
  constructor(
    private storageSvc: StorageService,
    private httpClient: HttpClient
  ) { }

  /**
   *
   */
  public async findConnectedDentists(): Promise<Array<Dentist>> {
    const accessToken = await this.storageSvc.get('accessTokenQP');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    })

    const userid = await this.storageSvc.get('useridQP');

    const dentists: Array<Dentist> = await this.httpClient.get<Array<Dentist>>(API_ENDPOINT + '/patient/' + userid + '/dentists', { headers: headers }).toPromise();
    return dentists;
  }

  /**
   *
   */
   public async getDentist(dentistId: number): Promise<Dentist> {
    const accessToken = await this.storageSvc.get('accessTokenQP');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    })

    return await this.httpClient.get<Dentist>(`${API_ENDPOINT}/dentist/${dentistId}`, { headers: headers }).toPromise();
  }

  /**
   *
   */
   public async findAll(): Promise<Array<Dentist>> {
    const accessToken = await this.storageSvc.get('accessTokenQP');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    })

    return await this.httpClient.get<Array<Dentist>>(`${API_ENDPOINT}/dentist/dentists/all`, { headers: headers }).toPromise();
  } 

  /**
   *
   */
  public async connect(dentistId: number): Promise<void> {
    const accessToken = await this.storageSvc.get('accessTokenQP');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    })

    const userid = await this.storageSvc.get('useridQP');

    const body = {
      patientId: userid,
      dentistId: dentistId
    }

    await this.httpClient.post(API_ENDPOINT + '/dentist/connect', body, { headers: headers }).toPromise();
  }

  // /**
  //  *
  //  */
  // public async search(firstname: string, lastname: string, postalCode: string): Promise<Dentist> {
  //   const accessToken = await this.storageSvc.get('accessTokenQP');

  //   const headers = new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     'Authorization': `Bearer ${accessToken}`
  //   })

  //   const body = {
  //     firstname: firstname,
  //     lastname: lastname,
  //     postalCode: postalCode
  //   }

  //   return await this.httpClient.post<any>(API_ENDPOINT + '/dentist/search', body, { headers: headers }).toPromise();
  // }
}
