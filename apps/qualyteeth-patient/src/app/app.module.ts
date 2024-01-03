import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
// import { SplashScreen } from '@ionic-native/splash-screen/ngx';
// import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { IonicStorageModule } from '@ionic/storage-angular';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { ToolbarMenuComponent } from './components/toolbar-menu/toolbar-menu.component';
import { ProfilePage } from './pages/profile/profile.page';
import { MaterialModule } from './material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToolbarTitleModule } from './components/toolbar-title/toolbar-title.module';
import { FeedbackPage } from './pages/feedback/feedback.page';
import { StorageService } from './services/storage.service';
import { LoginPage } from './pages/auth/login/login.page';
import { TreatmentPage } from './pages/treatment/treatment.page';

@NgModule({
  declarations: [
    AppComponent,
    ToolbarMenuComponent,
    ProfilePage,
    FeedbackPage,
    LoginPage,
    // TreatmentPage
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
    ToolbarTitleModule
  ],
  providers: [
    // StatusBar,
    // SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService,
    StorageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
