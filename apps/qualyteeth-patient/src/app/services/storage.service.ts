import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private _storage: Storage | null = null;

  constructor(
    private storage: Storage,
    private jwtHelper: JwtHelperService) {
    this.init();
  }

  async init() {
    // If using, define drivers here: await this.storage.defineDriver(/*...*/);
    const storage = await this.storage.create();
    this._storage = storage;
  }

  public async set(key: string, value: any): Promise<void> {
    await this._storage?.set(key, value);
  }

  public async get(key: string): Promise<any> {
    return await this._storage?.get(key);
  }

  /**
   *
   */
   public async getUserid(accessToken?: string): Promise<number | null> {
    accessToken = accessToken == null ? await this.get('accessTokenQP') : accessToken;
    const token = this.jwtHelper.decodeToken(accessToken);
    return token != null ? parseInt(token['sub']) : null;
  }
}