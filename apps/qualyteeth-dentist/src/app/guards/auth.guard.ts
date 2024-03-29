import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NavController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { StorageService } from '../services/storage.service';
import { SurgeryService } from '../services/surgery.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  /**
   *
   */
  constructor(
    private router: Router,
    private nav: NavController,
    private jwtHelper: JwtHelperService,
    private surgerySvc: SurgeryService,
    private authSvc: AuthService,
    private storageSvc: StorageService) { }

  /**
   *
   */
  async canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {

    const accessToken = await this.storageSvc.get('accessTokenQD');

    if (this.jwtHelper.isTokenExpired(accessToken)) {
      this.nav.navigateRoot('login');
      return false;
    } 
    // else {
    //   const surgery: Surgery = await this.surgerySvc.getActiveSurgeryForDentist();
    //   const userId = await this.storageSvc.getUserid(accessToken);
    //   if (surgery == null) {
    //     this.authSvc.signinData = { userId: userId };
    //     this.nav.navigateRoot('create-surgery');
    //     return false;
    //   }
    // }
    return true;
  }

}
