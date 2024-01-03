import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_ENDPOINT } from 'apps/qualyteeth-dentist/src/environments/environment';
import { lastValueFrom } from 'rxjs';
import { StorageService } from './storage.service';
import { PredicamentDto, PredicamentType } from 'libs/shared/src/lib/dto/predicament.dto';
import { PredicamentPlanDto } from 'libs/shared/src/lib/dto/predicament-plan.dto';

@Injectable({
  providedIn: 'root'
})
export class PredicamentPlanService {

  constructor(
    private storageSvc: StorageService,
    private httpClient: HttpClient,
  ) { }

  // /**
  //  *
  //  */
    public async getDefinition(id: PredicamentType): Promise<any> {
    //  public async getDefinition(id: PredicamentType): Promise<any> {
     const accessToken = await this.storageSvc.get('accessTokenQD');

     const headers = new HttpHeaders({
       'Content-Type': 'application/json',
       'Authorization': `Bearer ${accessToken}`
     });
     const userId: string = await this.storageSvc.getUserid(accessToken);
    return await this.httpClient.post(`${API_ENDPOINT}/predicaments/${id}/type/practitioner`, { userId: userId }, { headers: headers }).toPromise();
   
     }
 /**
   *
   */
 public async getPredicamentsPlanForPatient(patientId: string): Promise<Array<PredicamentPlanDto>> {
  const accessToken = await this.storageSvc.get('accessTokenQD');

  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${accessToken}`
  })

  //const userId = await this.storageSvc.getUserid(accessToken);
  const perdicamentsPlan: Array<PredicamentPlanDto> = await this.httpClient.get<Array<PredicamentPlanDto>>(`${API_ENDPOINT}/predicamentsPlan/${patientId}/patient`, { headers: headers }).toPromise();

  return perdicamentsPlan;
}

  // /**
  //  *
  //  */
  // //  public async getDefaultDiagnosticDefinitions(): Promise<Array<DiagnosticDefinition>> {
  // //   const accessToken = await this.storageSvc.get('accessTokenQD');

  // //   const headers = new HttpHeaders({
  // //     'Content-Type': 'application/json',
  // //     'Authorization': `Bearer ${accessToken}`
  // //   });

  // //   return await this.httpClient.get<Array<DiagnosticDefinition>>(`${API_ENDPOINT}/diagnostic/definition/default`, { headers: headers }).toPromise();
  // // }

  // /**
  //  *
  //  */
  /* public async getDefinitionsForDentist(dentistId?: number): Promise<Array<DiagnosticDefinition>> {
     const accessToken = await this.storageSvc.get('accessTokenQD');

     const headers = new HttpHeaders({
       'Content-Type': 'application/json',
       'Authorization': `Bearer ${accessToken}`
     });

     if (dentistId == null) {
      dentistId = await this.storageSvc.getUserid(accessToken);
     }

     return await this.httpClient.get<Array<DiagnosticDefinition>>(`${API_ENDPOINT}/diagnostic/definition/dentist/${dentistId}`, { headers: headers }).toPromise();
   }*/

  // /**
  //  *
  //  */
  //  public async saveDefinition(d: DiagnosticDefinition): Promise<void> {
  //   const accessToken = await this.storageSvc.get('accessTokenQD');

  //   const headers = new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     'Authorization': `Bearer ${accessToken}`
  //   });

  //   const body = {
  //     'definition': d
  //   }

  //   return await this.httpClient.post<void>(`${API_ENDPOINT}/diagnostic/definition/save/`, body, { headers: headers }).toPromise();
  // }

  // /**
  //  *
  //  */
    public async update(predicament: PredicamentDto): Promise<PredicamentDto> {
     const accessToken = await this.storageSvc.get('accessTokenQD');

     const headers = new HttpHeaders({
       'Content-Type': 'application/json',
       'Authorization': `Bearer ${accessToken}`
     });

     const body = {
       'predicament': predicament
     }

     //return await this.httpClient.put<void>(`${API_ENDPOINT}/predicaments/definition/update/`, body, { headers: headers }).toPromise();

     
     //return  await lastValueFrom(this.httpClient.post(`${API_ENDPOINT}/predicaments/add`, { predicament: predicament, userId: userId }, { headers: headers }));
 
    //console.log("dentiste devant service update :"+ practitioner);
    return await this.httpClient.put<PredicamentDto>(`${API_ENDPOINT}/predicaments/${predicament.id}`, body, { headers: headers }).toPromise();
   }


 
  // /**
  //  *
  //  */
   public async getById(id: string): Promise<PredicamentDto> {
     const accessToken = await this.storageSvc.get('accessTokenQD');

     const headers = new HttpHeaders({
       'Content-Type': 'application/json',
       'Authorization': `Bearer ${accessToken}`
     });
     return await this.httpClient.get<PredicamentDto>(`${API_ENDPOINT}/predicaments/${id}`,  { headers: headers }).toPromise();
 
     //return await lastValueFrom(this.httpClient.get<Diagnostic>(`${API_ENDPOINT}/diagnostic/${id}`, { headers: headers }));
   }


  // /**
  //  *
  //  */
    public async save(predicament: PredicamentDto): Promise<void> {
      const accessToken = await this.storageSvc.get('accessTokenQD');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    })
    console.log("accessToken practitioner is :"+accessToken);
   const userId: string = await this.storageSvc.getUserid(accessToken);
   console.log("userId is : "+userId);
   
   await lastValueFrom(this.httpClient.post(`${API_ENDPOINT}/predicaments/add`, { predicament: predicament, userId: userId }, { headers: headers }));
 

  //   const body = {
  //     diagnostic: diagnostic
  //   }

  //   await this.httpClient.post(`${API_ENDPOINT}/diagnostic/add`, body, { headers: headers }).toPromise();
   }

   public async delete(predicament: PredicamentDto): Promise<PredicamentDto> {
    const accessToken = await this.storageSvc.get('accessTokenQD');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    });
   
   return await this.httpClient.delete<PredicamentDto>(`${API_ENDPOINT}/predicaments/${predicament.id}`, { headers: headers }).toPromise();
  }
  // /**
  //  *
  //  */
  // public async getAllForDentist(dentistId?: number): Promise<Array<Diagnostic>> {
  //   const accessToken = await this.storageSvc.get('accessTokenQD');

  //   const headers = new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     'Authorization': `Bearer ${accessToken}`
  //   })

  //   if (dentistId == null) {
  //     dentistId = await this.storageSvc.getUserid(accessToken);
  //   }

  //   return await this.httpClient.get<Array<Diagnostic>>(`${API_ENDPOINT}/diagnostic/dentist/${dentistId}`, { headers: headers }).toPromise();
  // }

  // /**
  //  *
  //  */
  //  public async getAllForPatient(patientId: number): Promise<Array<Diagnostic>> {
  //   const accessToken = await this.storageSvc.get('accessTokenQD');

  //   const headers = new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     'Authorization': `Bearer ${accessToken}`
  //   })

  //   return await this.httpClient.get<Array<Diagnostic>>(`${API_ENDPOINT}/diagnostic/patient/${patientId}`, { headers: headers }).toPromise();
  // }

  // /**
  //  *
  //  */
  //  public async getForPatientAndDentist(patientId: number, dentistId?: number): Promise<Array<Diagnostic>> {
  //   const accessToken = await this.storageSvc.get('accessTokenQD');

  //   const headers = new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     'Authorization': `Bearer ${accessToken}`
  //   })

  //   if (dentistId == null) {
  //     dentistId = await this.storageSvc.getUserid(accessToken);
  //   }

  //   return await this.httpClient.get<Array<Diagnostic>>(`${API_ENDPOINT}/diagnostic/patient/${patientId}/dentist/${dentistId}`, { headers: headers }).toPromise();
  // }

  // /**
  //  *
  //  */
  //  public async getForPatientAndTooth(patientId: number, toothFdiNumber: number): Promise<Array<Diagnostic>> {
  //   const accessToken = await this.storageSvc.get('accessTokenQD');

  //   const headers = new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     'Authorization': `Bearer ${accessToken}`
  //   })

  //   return await this.httpClient.get<Array<Diagnostic>>(`${API_ENDPOINT}/diagnostic/patient/${patientId}/tooth/${toothFdiNumber}`, { headers: headers }).toPromise();
  // }

  // /**
  //  *
  //  */
  // //  public async getForPatientAndTeeth(patientId: number, toothFdiNumbers: Array<number>): Promise<Array<Diagnostic>> {
  // //   const accessToken = await this.storageSvc.get('accessTokenQD');

  // //   const headers = new HttpHeaders({
  // //     'Content-Type': 'application/json',
  // //     'Authorization': `Bearer ${accessToken}`
  // //   })

  // //   let teethUrlPart: string = '';
  // //   for (let i=0; i<toothFdiNumbers.length; i++) {
  // //     teethUrlPart += toothFdiNumbers[i];
  // //     if (i < toothFdiNumbers.length - 1) {
  // //       teethUrlPart += '|';
  // //     }
  // //   }
  // //   console.log(teethUrlPart)

  // //   return await this.httpClient.get<Array<Diagnostic>>(`${API_ENDPOINT}/diagnostic/patient/${patientId}/teeth/${teethUrlPart}`, { headers: headers }).toPromise();
  // // }



  // /**
  //  *
  //  */
  //  public async init(dentistId?: number): Promise<void> {
  //   const accessToken = await this.storageSvc.get('accessTokenQD');

  //   const headers = new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     'Authorization': `Bearer ${accessToken}`
  //   })

  //   if (dentistId == null) {
  //     dentistId = await this.storageSvc.getUserid(accessToken);
  //   }

  //   const body = {
  //     dentistId: dentistId
  //   }

  //   await this.httpClient.post(`${API_ENDPOINT}/diagnostic/init`, body, { headers: headers }).toPromise();
  // }
  
}
