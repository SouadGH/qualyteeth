import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import { StorageService } from 'apps/qualyteeth-patient/src/app/services/storage.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NavController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  /**
   *
   */
  constructor(
    private nav: NavController,
    private jwtHelper: JwtHelperService,
    private storageSvc: StorageService) { }

  /**
   *
   */
  async canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {

    const accessToken = await this.storageSvc.get('accessTokenQP');

    if (this.jwtHelper.isTokenExpired(accessToken)) {
      // this.router.navigate(['/home'], { queryParams: { returnUrl: state.url } });
      this.nav.navigateRoot('login');
      return false;
    }
    return true;
  }

}
