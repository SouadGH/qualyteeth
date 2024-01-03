import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_ENDPOINT } from '../../environments/environment';
import { StorageService } from './storage.service';
import { Subject } from 'rxjs';
import { ToothDto } from 'libs/shared/src/lib/dto/tooth.dto';

@Injectable({
  providedIn: 'root'
})
export class ToothService {

  public toothSelectedParts: Subject<ToothDto & { selectedParts: Array<string> }> = new Subject<ToothDto & { selectedParts: Array<string> }>();

  /**
   *
   */
  constructor(
    private storageSvc: StorageService,
    private httpClient: HttpClient) { }

  /**
   *
   */
  public async getTooth(fdiNumber: number): Promise<ToothDto> {
    const accessToken = await this.storageSvc.get('accessTokenQD');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    })

    return await this.httpClient.get<ToothDto>(API_ENDPOINT + '/tooth/' + fdiNumber, { headers: headers }).toPromise();
  }

  /**
   *
   */
  public async getAll(): Promise<Array<ToothDto>> {
    const accessToken = await this.storageSvc.get('accessTokenQD');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    })

    return await this.httpClient.get<Array<ToothDto>>(`${API_ENDPOINT}/teeth`, { headers: headers }).toPromise();
  }
}
