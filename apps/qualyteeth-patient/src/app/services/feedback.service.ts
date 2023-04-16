import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageService } from 'apps/qualyteeth-patient/src/app/services/storage.service';
import { API_ENDPOINT } from 'apps/qualyteeth-patient/src/environments/environment';
import { Feedback } from 'libs/shared/src/lib/feedback.entity';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

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
  public async saveFeedback(feedback: Feedback): Promise<void> {
    const accessToken = await this.storageSvc.get('accessTokenQP');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    })

    const userid = await this.storageSvc.get('useridQP');

    const body = {
      userid: userid,
      feedback: feedback
    }

    await this.httpClient.post(`${API_ENDPOINT}/feedback/add`, body, { headers: headers }).toPromise();
  }
}
