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
<<<<<<< HEAD
  public async getDocuments(patientId: string, treatmentId?: string): Promise<Array<any>> {
=======
  public async getDocuments(patientId: number, treatmentId?: number): Promise<Array<any>> {
>>>>>>> c6740c8dc4e6e69e5f3be7ef55127ed511d52617
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
<<<<<<< HEAD
  public upload(accessToken: string, file: File, patientId: string, userId: string, treatmentId?: string): Observable<any> {
=======
  public upload(accessToken: string, file: File, patientId: string, dentistId: string, treatmentId?: string): Observable<any> {
>>>>>>> c6740c8dc4e6e69e5f3be7ef55127ed511d52617

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${accessToken}`
    })
    const formData: FormData = new FormData();
    formData.append('document', file, file.name);
    if (treatmentId != null) {
      formData.append('treatmentId', treatmentId.toString());
    }
<<<<<<< HEAD
    formData.append('patientId', patientId);
    formData.append('userId', userId );
=======
    formData.append('patientId', patientId.toString());
    formData.append('dentistId', dentistId.toString());
>>>>>>> c6740c8dc4e6e69e5f3be7ef55127ed511d52617

    const req = new HttpRequest('POST', `${API_ENDPOINT}/document/upload`, formData, {
      headers: headers,
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);
  }

}
