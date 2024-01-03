import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { API_ENDPOINT } from '../../environments/environment';
import { StorageService } from './storage.service';
import { SurgeryService } from './surgery.service';
import { lastValueFrom } from 'rxjs';
import { UserDto, UserType } from 'libs/shared/src/lib/dto/user.dto';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public isAuthenticated: boolean;
<<<<<<< HEAD
   public canActivate: boolean;
=======
  // public canActivate: boolean;
>>>>>>> c6740c8dc4e6e69e5f3be7ef55127ed511d52617
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

<<<<<<< HEAD
           this.activate()
             .then(canActivate => { })
             .catch(err => console.error(err));
        })
        .catch(err => console.error(err));
    })
    
=======
          // this.activate()
          //   .then(canActivate => { })
          //   .catch(err => console.error(err));
        })
        .catch(err => console.error(err));
    })

>>>>>>> c6740c8dc4e6e69e5f3be7ef55127ed511d52617
  }

  /**
   *
   */
  private async authenticate(): Promise<boolean> {
    const accessToken = await this.storageSvc.get('accessTokenQD');
<<<<<<< HEAD
   
=======
>>>>>>> c6740c8dc4e6e69e5f3be7ef55127ed511d52617
    this.isAuthenticated = !this.jwtHelper.isTokenExpired(accessToken);
    return this.isAuthenticated;
  }

  /**
   *
   */
<<<<<<< HEAD
   public async activate(): Promise<boolean> {
     if (!this.isAuthenticated) {
       return false;
     }
  //   const surgery: Surgery = await this.surgerySvc.getActiveSurgeryForDentist();
  //   this.canActivate = surgery != null;
     return this.canActivate
   }
=======
  // public async activate(): Promise<boolean> {
  //   if (!this.isAuthenticated) {
  //     return false;
  //   }
  //   const surgery: Surgery = await this.surgerySvc.getActiveSurgeryForDentist();
  //   this.canActivate = surgery != null;
  //   return this.canActivate
  // }
>>>>>>> c6740c8dc4e6e69e5f3be7ef55127ed511d52617

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
  public async signin(data: UserDto): Promise<void> {
    await lastValueFrom(this.httpClient.post(`${API_ENDPOINT}/auth/signin`, data));
  }

  /**
   *
   */
<<<<<<< HEAD
  public async login(username: string, password: string): Promise<any> {
=======
  public async login(username: string, password: string): Promise<void> {
>>>>>>> c6740c8dc4e6e69e5f3be7ef55127ed511d52617
    const body = {
      email: username.toLowerCase(),
      password: password,
    };
<<<<<<< HEAD
    const headers = new HttpHeaders({
      'content-type': 'application/json',
    });
=======

    const headers = new HttpHeaders({
      'content-type': 'application/json',
    });

>>>>>>> c6740c8dc4e6e69e5f3be7ef55127ed511d52617
    const data = await lastValueFrom(this.httpClient.post(`${API_ENDPOINT}/auth/login`, body, {
      headers: headers,
      withCredentials: true,
    }));
<<<<<<< HEAD
  
    await this.storageSvc.set('accessTokenQD', data['access_token']);
     await this.storageSvc.set('useridQD', data['userid']);
    // console.log("accessTokenQD storage :"+ this.storageSvc.get('accessTokenQD'));
    // console.log("userid storage :"+ this.storageSvc.get('useridQD'));
    this.isAuthenticated = true;
     this.canActivate = await this.activate();
    return data;
=======
    await this.storageSvc.set('accessTokenQD', data['access_token']);
    // await this.storageSvc.set('useridQD', data['userid']);

    this.isAuthenticated = true;
    // this.canActivate = await this.activate();
>>>>>>> c6740c8dc4e6e69e5f3be7ef55127ed511d52617
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
