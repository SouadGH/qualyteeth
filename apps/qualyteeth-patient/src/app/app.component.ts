import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
// import { SplashScreen } from '@ionic-native/splash-screen/ngx';
// import { StatusBar } from '@ionic-native/status-bar/ngx';
import { StorageService } from 'apps/qualyteeth-patient/src/app/services/storage.service';
import { SseService } from './services/sse.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    // private splashScreen: SplashScreen,
    // private statusBar: StatusBar,
    private storageSvc: StorageService,
    private sseService: SseService

  ) {
    this.initializeApp();
  }

  /**
   *
   */
  // async ngOnInit() {
  //   const userId = await this.storageSvc.get('useridQP');

  //   this.sseService.getServerSentEvent(userId).subscribe(data => { });
  //   this.sseService.getDiagnosticSseEvent(userId).subscribe(data => { });
  // }

  /**
   *
   */
  initializeApp() {
    this.platform.ready().then(() => {
      // this.statusBar.styleDefault();
      // this.splashScreen.hide();
    });
  }

  private initSse() {
    
  }
}
