import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Tooth } from 'libs/shared/src/lib/tooth.interface';
import { API_ENDPOINT } from '../../environments/environment';
import { StorageService } from './storage.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToothService {

  public toothSelectedParts: Subject<Tooth & { selectedParts: Array<string> }> = new Subject<Tooth & { selectedParts: Array<string> }>();

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
    const accessToken = await this.storageSvc.get('accessTokenQD');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    })

    return await this.httpClient.get<Tooth>(API_ENDPOINT + '/tooth/' + fdiNumber, { headers: headers }).toPromise();
  }

  /**
   *
   */
  public async getAll(): Promise<Array<Tooth>> {
    const accessToken = await this.storageSvc.get('accessTokenQD');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    })

    return await this.httpClient.get<Array<Tooth>>(`${API_ENDPOINT}/tooth`, { headers: headers }).toPromise();
  }
}
