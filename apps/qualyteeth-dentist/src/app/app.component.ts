import { Component, OnInit } from '@angular/core';

import { MenuController, NavController, Platform, PopoverController } from '@ionic/angular';
// import { SplashScreen } from '@ionic-native/splash-screen/ngx';
// import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthService } from './services/auth.service';
import { SseService } from './services/sse.service';
import { AppService } from './services/app.service';
import { SurgeryService } from './services/surgery.service';
import { ToolbarMenuComponent } from './components/toolbar-menu/toolbar-menu.component';
import { Router } from '@angular/router';
import { StorageService } from './services/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {

  // surgery: Surgery;

  constructor(
    private platform: Platform,
    // private splashScreen: SplashScreen,
    // private statusBar: StatusBar,
    private nav: NavController,
    private menu: MenuController,
    public authSvc: AuthService,
    private sseService: SseService,
    public surgerySvc: SurgeryService,
    private storageSvc: StorageService,
    public appSvc: AppService,
    private popoverCtrl: PopoverController,
    private router: Router
  ) {
    this.storageSvc.init().then(() => {
      this.initializeApp().then(() => {
        console.log('Qualyteeth initialized!');
      })
    })

    // this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(
    //   (event) => {
    //     // console.log(event['url'].split('/'));
    //     this.appSvc.currentPage = '/' + event['url'].split('/')[1];
    //   });
  }

  /**
   *
   */
   async ngOnInit() {
    await this.storageSvc.init();
  }

  /**
   *
   */
  async initializeApp() {
    this.platform.ready().then(() => {
      // this.statusBar.styleDefault();
      // this.splashScreen.hide();
    });

    const userId = await this.storageSvc.getUserid();

    this.surgerySvc.getActiveSurgeryForDentist().then(s => this.surgerySvc.activeSurgery = s);

    // this.surgery = await this.surgerySvc.getActiveSurgeryForDentist();

    // this.sseService
    //   .getServerSentEvent(userId)
    //   .subscribe(data => { });

    // this.surgerySvc.surgerySubject.subscribe(
    //   (surgery: Surgery) => this.surgery = surgery);
  }

  /**
   *
   */
  async go(page: string): Promise<void> {
    this.appSvc.currentPage = page;
    // console.log(this.appSvc.currentPage)
    await this.menu.close();
    this.nav.navigateRoot(page);
  }

  /**
   *
   */
  async pop(ev: any): Promise<void> {
    const popover = await this.popoverCtrl.create({
      component: ToolbarMenuComponent,
      event: ev,
      translucent: true
    });
    return await popover.present();
  }
}
