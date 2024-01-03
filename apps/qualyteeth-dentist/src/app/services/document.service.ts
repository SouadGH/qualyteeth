import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_ENDPOINT } from '../../environments/environment';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  /**
   *
   */
  constructor(private http: HttpClient, private storageSvc: StorageService) { }

  /**
   *
   */
  public downloadDocument(accessToken: string, id: number): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${accessToken}`
    })

    return this.http.get(`${API_ENDPOINT}/document/${id}`, { headers: headers, responseType: 'arraybuffer', observe: 'response' });

    // return this.http.get(`${API_ENDPOINT}/document/${id}`, { headers: headers, responseType: 'arraybuffer'}).toPromise();
  }

  /**
   *
   */
  public async getDocuments(patientId: string, treatmentId?: string): Promise<Array<any>> {
    const accessToken = await this.storageSvc.get('accessTokenQD');

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${accessToken}`
    })

    if (treatmentId != null) {
      return this.http.get<Array<any>>(`${API_ENDPOINT}/document/${patientId}/treatment/${treatmentId}`, { headers: headers }).toPromise();
    } else {
      return this.http.get<Array<any>>(`${API_ENDPOINT}/document/${patientId}/all`, { headers: headers }).toPromise();
    }

  }

  /**
   *
   */
  public upload(accessToken: string, file: File, patientId: string, userId: string, treatmentId?: string): Observable<any> {

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${accessToken}`
    })
    const formData: FormData = new FormData();
    formData.append('document', file, file.name);
    if (treatmentId != null) {
      formData.append('treatmentId', treatmentId.toString());
    }
    formData.append('patientId', patientId);
    formData.append('userId', userId );

    const req = new HttpRequest('POST', `${API_ENDPOINT}/document/upload`, formData, {
      headers: headers,
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);
  }

}
