import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
// import { SplashScreen } from '@ionic-native/splash-screen/ngx';
// import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicStorageModule } from '@ionic/storage-angular';

import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { ToolbarMenuComponent } from './components/toolbar-menu/toolbar-menu.component';
import { ProfilePage } from './pages/profile/profile.page';
import { QrCodePage } from './pages/qr-code/qr-code.page';
import { ToolbarTitleModule } from './components/toolbar-title/toolbar-title.module';
import { SigninPage } from './pages/auth/signin/signin.page';
import { LoginPage } from './pages/auth/login/login.page';
import { FeedbackPage } from './pages/feedback/feedback.page';
import { MatFabMenuModule } from '@angular-material-extensions/fab-menu';
import { StorageService } from './services/storage.service';

import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import resourceTimeGridPlugin from '@fullcalendar/resource-timegrid'
import resourceDayGridPlugin from '@fullcalendar/resource-daygrid';
import interactionPlugin from '@fullcalendar/interaction';

FullCalendarModule.registerPlugins([
  dayGridPlugin,
  timeGridPlugin,
  interactionPlugin, 
  resourceDayGridPlugin, 
  resourceTimeGridPlugin
]);

@NgModule({
  declarations: [
    AppComponent,
    ToolbarMenuComponent,
    ProfilePage,
    QrCodePage,
    SigninPage,
    LoginPage,
    FeedbackPage
  ],
  entryComponents: [],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    MaterialModule,
    IonicStorageModule.forRoot(),
    BrowserAnimationsModule,
    ToolbarTitleModule,
    MatFabMenuModule,
    FullCalendarModule
    // SpeechModule,
  ],
  providers: [
    // StatusBar,
    // SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    // { provide: 'SPEECH_LANG', useValue: 'fr-CH' },
    JwtHelperService,
    StorageService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
