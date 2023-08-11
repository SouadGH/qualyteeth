import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_ENDPOINT } from 'apps/qualyteeth-dentist/src/environments/environment';
import { StorageService } from './storage.service';
import { FeedbackDto } from 'libs/shared/src/lib/dto/feedback.dto';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  /**
   *
   */
  constructor(
    private storageSvc: StorageService,
    private httpClient: HttpClient,
  ) { }

  /**
   *
   */
  public async saveFeedback(feedback: FeedbackDto): Promise<void> {
    const accessToken = await this.storageSvc.get('accessTokenQD');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    })

    const userId = await this.storageSvc.getUserid(accessToken);

    const body = {
      userid: userId,
      feedback: feedback
    }

    await this.httpClient.post(API_ENDPOINT + '/feedback/add', body, { headers: headers }).toPromise();
  }
}
