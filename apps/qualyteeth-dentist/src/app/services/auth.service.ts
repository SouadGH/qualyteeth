import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { API_ENDPOINT } from '../../environments/environment';
import { User, UserType } from 'libs/shared/src/lib/user.entity';
import { StorageService } from './storage.service';
import { SurgeryService } from './surgery.service';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public isAuthenticated: boolean;
  // public canActivate: boolean;
  // public signinData: any;

  /**
   *
   */
  constructor(
    private storageSvc: StorageService,
    private jwtHelper: JwtHelperService,
    private surgerySvc: SurgeryService,
    private httpClient: HttpClient) {

    this.storageSvc.init().then(() => {
      this.authenticate()
        .then(isAuthenticated => {

          // this.activate()
          //   .then(canActivate => { })
          //   .catch(err => console.error(err));
        })
        .catch(err => console.error(err));
    })

  }

  /**
   *
   */
  private async authenticate(): Promise<boolean> {
    const accessToken = await this.storageSvc.get('accessTokenQD');
    this.isAuthenticated = !this.jwtHelper.isTokenExpired(accessToken);
    return this.isAuthenticated;
  }

  /**
   *
   */
  // public async activate(): Promise<boolean> {
  //   if (!this.isAuthenticated) {
  //     return false;
  //   }
  //   const surgery: Surgery = await this.surgerySvc.getActiveSurgeryForDentist();
  //   this.canActivate = surgery != null;
  //   return this.canActivate
  // }

  // /**
  //  *
  //  */
  // public async signin(firstname: string, lastname: string, street: string, streetNb: string, postalCode: string, city: string, password: string, email: string, type: UserType): Promise<void> {
  //   const data: User = {
  //     'firstname': firstname,
  //     'lastname': lastname,
  //     'street': street,
  //     'streetNb': streetNb,
  //     'postalCode': postalCode,
  //     'city': city,
  //     'password': password,
  //     'type': type,
  //     'email': email
  //   }

  //   await lastValueFrom(this.httpClient.post(`${API_ENDPOINT}/auth/signin`, data));
  // }

  /**
   *
   */
  public async signin(data: User): Promise<void> {
    await lastValueFrom(this.httpClient.post(`${API_ENDPOINT}/auth/signin`, data));
  }

  /**
   *
   */
  public async login(username: string, password: string): Promise<void> {
    const data = await lastValueFrom(this.httpClient.post(`${API_ENDPOINT}/auth/login`, { 'username': username, 'password': password, 'type': UserType.PRACTITIONER }));
    await this.storageSvc.set('accessTokenQD', data['access_token']);
    // await this.storageSvc.set('useridQD', data['userid']);

    this.isAuthenticated = true;
    // this.canActivate = await this.activate();
  }

  /**
   *
   */
  public async logout(): Promise<void> {
    await this.storageSvc.set('accessTokenQD', null);
    // await this.storageSvc.set('useridQD', null);
    this.isAuthenticated = false;
    // this.canActivate = false;
  }

  /**
   *
   */
  public async validateUser(username: string, password: string): Promise<boolean> {
    const accessToken = await this.storageSvc.get('accessTokenQD');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    })

    return await this.httpClient.post<boolean>(API_ENDPOINT + '/auth/validate', { username: username, password: password }, { headers: headers }).toPromise();
  }

  /**
   *
   */
  // public async getTempToken(): Promise<string> {

  //   const headers = new HttpHeaders({
  //     'Content-Type': 'application/json'
  //   })

  //   return await this.httpClient.get<string>(`${API_ENDPOINT}/auth/tmp-token`, { headers: headers }).toPromise();
  // }

  /**
   *
   */
  public async getQRChannel(): Promise<string> {
    return await this.httpClient.get<string>(`${API_ENDPOINT}/auth/qr/channel`).toPromise();
  }

  // /**
  //  *
  //  */
  // public async connectToChannel(channel: string): Promise<string> {
  //   return await this.httpClient.post<string>(`${API_ENDPOINT}/auth/qr/connect`, { 'channel': channel }).toPromise();
  // }

}
