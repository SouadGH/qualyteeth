import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { API_ENDPOINT } from '../../environments/environment';
import { SurgeryDto } from 'libs/shared/src/lib/dto/surgery.dto';
import { Surgery } from 'apps/qualyteeth-server/src/core/surgery/surgery.entity';

@Injectable({
  providedIn: 'root'
})
export class SurgeryService {

   //public surgerySubject: Subject<Surgery> = new Subject<Surgery>();
   //public activeSurgery: Surgery;

  /**
   *
   */
  constructor(
    private storageSvc: StorageService,
    private httpClient: HttpClient) {
  }

//   /**
//    *
//    */
  public async save(surgery: Surgery): Promise<void> {
    const accessToken = await this.storageSvc.get('accessTokenQD');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    })

    const body = {
      surgery: surgery
    }

   // surgery.id = 
    return await this.httpClient.post<void>(`${API_ENDPOINT}/surgery/add`, body, { headers: headers }).toPromise();
    // this.surgerySubject.next(surgery)
    //return surgery.id;
  }

//   /**
//    *
//    */
//   public async update(surgery: Surgery): Promise<void> {
//     const accessToken = await this.storageSvc.get('accessTokenQD');

//     const headers = new HttpHeaders({
//       'Content-Type': 'application/json',
//       'Authorization': `Bearer ${accessToken}`
//     })

//     await this.httpClient.put<number>(`${API_ENDPOINT}/surgery/update`, { surgery: surgery }, { headers: headers }).toPromise();
//     // this.surgerySubject.next(surgery)
//   }

//   /**
//    *
//    */
  public async link(surgery: Surgery): Promise<void> {
    const accessToken = await this.storageSvc.get('accessTokenQD');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    })

    //if (practitionerId == null) {
     const userId = await this.storageSvc.getUserid(accessToken);
   // }

    return await this.httpClient.post<void>(`${API_ENDPOINT}/surgery/practitioner/link`, { surgery: surgery, userId: userId }, { headers: headers }).toPromise();
  }
  //   /**
//    *
//    */
public async unlink(surgery: Surgery): Promise<void> {
  const accessToken = await this.storageSvc.get('accessTokenQD');

  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${accessToken}`
  })

  //if (practitionerId == null) {
   const userId = await this.storageSvc.getUserid(accessToken);
 // }

  return await this.httpClient.post<void>(`${API_ENDPOINT}/surgery/practitioner/unlink`, { surgery: surgery, userId: userId }, { headers: headers }).toPromise();
}

//   /**
//    *
//    */
//   public async activate(surgery: Surgery, dentistId?: number): Promise<void> {
//     const accessToken = await this.storageSvc.get('accessTokenQD');

//     const headers = new HttpHeaders({
//       'Content-Type': 'application/json',
//       'Authorization': `Bearer ${accessToken}`
//     })

//     if (dentistId == null) {
//       dentistId = await this.storageSvc.getUserid(accessToken);
//     }

//     await this.httpClient.post<void>(`${API_ENDPOINT}/surgery/activate`, { surgeryId: surgery.id, dentistId: dentistId }, { headers: headers }).toPromise();
//     this.activeSurgery = surgery;
//     // this.surgerySubject.next(surgery)
//   }

//   /**
//    *
//    */
   public async update(surgery: Surgery): Promise<void> {
    const accessToken = await this.storageSvc.get('accessTokenQD');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    })

    /*if (dentistId == null) {
      dentistId = await this.storageSvc.getUserid(accessToken);
    }*/

    //await this.httpClient.post<void>(`${API_ENDPOINT}/surgery/deactivate`, { surgeryId: surgery.id, dentistId: dentistId }, { headers: headers }).toPromise();
    
    await this.httpClient.put<void>(`${API_ENDPOINT}/surgery/update`, { surgery: surgery }, { headers: headers }).toPromise();
   
    // this.activeSurgery = null;
    // this.surgerySubject.next(surgery)
  }
//   /**
//    *
//    */
public async getSurgeries():Promise<Array<SurgeryDto>>{
  const accessToken = await this.storageSvc.get('accessTokenQD');

  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${accessToken}`
  })

  return await this.httpClient.get<Array<SurgeryDto>>(`${API_ENDPOINT}/surgery`, { headers: headers }).toPromise();
}
//   /**
//    *
//    */
  public async getSurgery(id: string): Promise<Surgery> {
    const accessToken = await this.storageSvc.get('accessTokenQD');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    })

    return await this.httpClient.get<Surgery>(`${API_ENDPOINT}/surgery/${id}`, { headers: headers }).toPromise();
  }

//   /**
//    *
//    */
  public async getActiveSurgeryForDentist(): Promise<Surgery> {
    const accessToken = await this.storageSvc.get('accessTokenQD');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    })

   // if (practitionerId == null) {
    const  practitionerId = await this.storageSvc.getUserid(accessToken);
  //  }

    return await this.httpClient.get<Surgery>(`${API_ENDPOINT}/surgery/practitioner/${practitionerId}`, { headers: headers }).toPromise();
  }

//   /**
//    *
//    */
   public async getSurgeriesForPractitioner(): Promise<Array<SurgeryDto>> {
     const accessToken = await this.storageSvc.get('accessTokenQD');

     const headers = new HttpHeaders({
       'Content-Type': 'application/json',
       'Authorization': `Bearer ${accessToken}`
     })

   // if (dentistId == null) {
     const  dentistId = await this.storageSvc.getUserid(accessToken);
  //   }

    return await this.httpClient.get<Array<SurgeryDto>>(`${API_ENDPOINT}/surgery/practitioner/${dentistId}/all`, { headers: headers }).toPromise();
  //   return await this.httpClient.get<Array<SurgeryDto>>(`${API_ENDPOINT}/surgery`, { headers: headers }).toPromise();
   
    }
    //   /**
//    *
//    */
   public async getNotSurgeriesForPractitioner(): Promise<Array<SurgeryDto>> {
    const accessToken = await this.storageSvc.get('accessTokenQD');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    })

  // if (dentistId == null) {
    const  dentistId = await this.storageSvc.getUserid(accessToken);
 //   }

   return await this.httpClient.get<Array<SurgeryDto>>(`${API_ENDPOINT}/surgery/practitioner/${dentistId}/Notall`, { headers: headers }).toPromise();
 //   return await this.httpClient.get<Array<SurgeryDto>>(`${API_ENDPOINT}/surgery`, { headers: headers }).toPromise();
  
   }

//   /**
//    *
//    */
//   public async getDentistsForSurgery(surgeryId: number): Promise<Array<Dentist>> {
//     const accessToken = await this.storageSvc.get('accessTokenQD');

//     const headers = new HttpHeaders({
//       'Content-Type': 'application/json',
//       'Authorization': `Bearer ${accessToken}`
//     })

//     return await this.httpClient.get<Array<Dentist>>(`${API_ENDPOINT}/surgery/${surgeryId}/dentists`, { headers: headers }).toPromise();
//   }

//   /**
//    *
//    */
//   public async getPatienstForSurgery(surgeryId: number): Promise<Array<Patient>> {
//     const accessToken = await this.storageSvc.get('accessTokenQD');

//     const headers = new HttpHeaders({
//       'Content-Type': 'application/json',
//       'Authorization': `Bearer ${accessToken}`
//     })

//     return await this.httpClient.get<Array<Patient>>(`${API_ENDPOINT}/surgery/${surgeryId}/patients`, { headers: headers }).toPromise();
//   }
}
