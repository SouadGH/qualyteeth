import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageService } from 'apps/qualyteeth-patient/src/app/services/storage.service';
import { API_ENDPOINT } from '../../environments/environment';
import { Diagnostic } from 'libs/shared/src/lib/diagnostic.entity';
import { SseService } from './sse.service';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DiagnosticService {

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
        this.sseService.getDiagnosticSseEvent(userId).subscribe(data => { });
      })
  }

  /**
   *
   */
  public async getForPatient(): Promise<Array<Diagnostic>> {
    const accessToken = await this.storageSvc.get('accessTokenQP');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    })

    const userid = await this.storageSvc.get('useridQP');

    return await firstValueFrom(this.httpClient.get<Array<Diagnostic>>(`${API_ENDPOINT}/diagnostic/patient/${userid}`, { headers: headers }));
  }

  /**
   *
   */
  public async getForPatientAndDentist(dentistId: number): Promise<Array<Diagnostic>> {
    const accessToken = await this.storageSvc.get('accessTokenQP');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    })

    const userid = await this.storageSvc.get('useridQP');

    return await this.httpClient.get<Array<Diagnostic>>(`${API_ENDPOINT}/diagnostic/patient/${userid}/dentist/` + dentistId, { headers: headers }).toPromise();
  }

  /**
   *
   */
   public async getForPatientAndTooth(toothFdiNumber: number): Promise<Array<Diagnostic>> {
    const accessToken = await this.storageSvc.get('accessTokenQP');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    })

    const userid = await this.storageSvc.get('useridQP');

    return await this.httpClient.get<Array<Diagnostic>>(`${API_ENDPOINT}/diagnostic/patient/${userid}/tooth/` + toothFdiNumber, { headers: headers }).toPromise();
  }
  
}
