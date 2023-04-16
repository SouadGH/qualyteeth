import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Tooth } from 'libs/shared/src/lib/tooth.entity';
import { StorageService } from 'apps/qualyteeth-patient/src/app/services/storage.service';
import { API_ENDPOINT } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ToothService {

  /**
   *
   */
  constructor(
    private storageSvc: StorageService,
    private httpClient: HttpClient) { }

  /**
   *
   */
  public async getTooth(fdiNumber: number): Promise<Tooth> {
    const accessToken = await this.storageSvc.get('accessTokenQP');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    })

    return await this.httpClient.get<Tooth>(`${API_ENDPOINT}/tooth/${fdiNumber}`, { headers: headers }).toPromise();
  }
}
