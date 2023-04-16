import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageService } from 'apps/qualyteeth-patient/src/app/services/storage.service';
import { API_ENDPOINT } from '../../environments/environment';
import { Treatment } from 'libs/shared/src/lib/treatment.entity';
import { SseService } from './sse.service';

@Injectable({
  providedIn: 'root'
})
export class TreatmentService {

  /**
   *
   */
  constructor(
    private storageSvc: StorageService,
    private httpClient: HttpClient,
    private sseService: SseService
  ) {
    this.storageSvc.get('useridQP')
      .then((userId) => {
        this.sseService.getTreatmentSseEvent(userId).subscribe(data => { });
      })
  }

  /**
   *
   */
  public async getForPatient(): Promise<Array<Treatment>> {
    const accessToken = await this.storageSvc.get('accessTokenQP');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    })

    const userid = await this.storageSvc.get('useridQP');

    return await this.httpClient.get<Array<Treatment>>(`${API_ENDPOINT}/treatment/patient/${userid}`, { headers: headers }).toPromise();
  }

  /**
   *
   */
  public async getForPatientAndDentist(dentistId: number): Promise<Array<Treatment>> {
    const accessToken = await this.storageSvc.get('accessTokenQP');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    })

    const userid = await this.storageSvc.get('useridQP');

    return await this.httpClient.get<Array<Treatment>>(`${API_ENDPOINT}/treatment/patient/${userid}/dentist/` + dentistId, { headers: headers }).toPromise();
  }

  /**
   *
   */
  public async getForPatientAndTooth(toothFdiNumber: number): Promise<Array<Treatment>> {
    const accessToken = await this.storageSvc.get('accessTokenQP');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    })

    const userid = await this.storageSvc.get('useridQP');

    return await this.httpClient.get<Array<Treatment>>(`${API_ENDPOINT}/treatment/patient/${userid}/tooth/` + toothFdiNumber, { headers: headers }).toPromise();
  }

}
