import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { StorageService } from 'apps/qualyteeth-patient/src/app/services/storage.service';
import { API_ENDPOINT } from '../../environments/environment';
import { UserType } from 'libs/shared/src/lib/user.entity';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public isAuthenticated: boolean;

  /**
   *
   */
  constructor(
    private storageSvc: StorageService,
    private jwtHelper: JwtHelperService,
    private httpClient: HttpClient) {

    this.authenticate()
      .then(isAuthenticated => { })
      .catch(err => console.error(err));

  }

  /**
   *
   */
  private async authenticate(): Promise<boolean> {
    const accessToken = await this.storageSvc.get('accessTokenQP');

    // console.log('access token', accessTokenQP);
    // console.log('token expired', this.jwtHelper.isTokenExpired(accessTokenQP));

    this.isAuthenticated = !this.jwtHelper.isTokenExpired(accessToken);
    return this.isAuthenticated;
  }

  /**
   *
   */
  public async signin(firstname: string, lastname: string, username: string, password: string, email: string, type: UserType): Promise<void> {
    await this.httpClient.post(`${API_ENDPOINT}/auth/signin`,
      {
        'firstname': firstname,
        'lastname': lastname,
        'username': username,
        'password': password,
        'email': email,
        'type': type
      }).toPromise();
  }

  /**
   *
   */
  public async login(username: string, password: string): Promise<void> {
    const data = await this.httpClient.post(`${API_ENDPOINT}/auth/login`, { 'username': username, 'password': password, 'type': 'PATIENT' }).toPromise();
    await this.storageSvc.set('accessTokenQP', data['access_token']);
    await this.storageSvc.set('useridQP', data['userid']);

    this.isAuthenticated = true;
  }

  /**
   *
   */
  public async logout(): Promise<void> {
    await this.storageSvc.set('accessTokenQP', null);
    await this.storageSvc.set('useridQP', null);
    this.isAuthenticated = false;
  }

  /**
   *
   */
  public async validateUser(username: string, password: string): Promise<boolean> {
    const accessToken = await this.storageSvc.get('accessTokenQP');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    })

    return await this.httpClient.post<boolean>(`${API_ENDPOINT}/auth/validate`, { username: username, password: password }, { headers: headers }).toPromise();
  }

  /**
   *
   */
  public async connectToChannel(channel: string): Promise<string> {
    const patientId: number = await this.storageSvc.get('useridQP');
    return await this.httpClient.post<string>(`${API_ENDPOINT}/auth/qr/connect`, { 'channel': channel, 'patientId': patientId }).toPromise();
  }
}
