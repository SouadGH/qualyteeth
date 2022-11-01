import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  // {
  //   path: '',
  //   loadChildren: () => import('./pages/tabs/tabs.module').then(m => m.TabsPageModule)
  // }
  {
    path: '',
    loadChildren: () => import('./pages/calendar/calendar.module').then(m => m.CalendarPageModule),
    pathMatch: 'full',
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/auth/login/login.module').then(m => m.LoginPageModule),
  },
  {
    path: 'signin',
    loadChildren: () => import('./pages/auth/signin/signin.module').then(m => m.SigninPageModule),
  },
  {
    path: 'qr',
    loadChildren: () => import('./pages/auth/qr/qr.module').then( m => m.QrPageModule)
  },
  {
    path: 'create-surgery',
    loadChildren: () => import('./pages/auth/create-surgery/create-surgery.module').then(m => m.CreateSurgeryPageModule)
  },
  {
    path: 'marketplace',
    loadChildren: () => import('./pages/marketplace/marketplace.module').then(m => m.MarketplacePageModule)
  },
  {
    path: 'patients',
    loadChildren: () => import('./pages/patients/patients.module').then(m => m.PatientsPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'patients/:patient_id/tooth/:fdi_number',
    loadChildren: () => import('./pages/tooth/tooth.module').then(m => m.ToothPageModule),
    canActivate: [AuthGuard]
  },
  // {
  //   path: 'diagnostic/:patient_id',
  //   loadChildren: () => import('./pages/diagnostic/diagnostic.module').then(m => m.DiagnosticPageModule),
  //   canActivate: [AuthGuard]
  // },
  // {
  //   path: 'treatment/:patient_id',
  //   loadChildren: () => import('./pages/treatment/treatment.module').then(m => m.TreatmentPageModule),
  //   canActivate: [AuthGuard]
  // },
  {
    path: 'odontogram/:patient_id',
    loadChildren: () => import('./pages/odontogram/odontogram.module').then(m => m.OdontogramPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'calendar',
    loadChildren: () => import('./pages/calendar/calendar.module').then(m => m.CalendarPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'admin/surgery',
    loadChildren: () => import('./pages/settings/surgery/surgery.module').then(m => m.SurgeryPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'admin/dentists',
    loadChildren: () => import('./pages/settings/dentists/dentists.module').then( m => m.DentistsPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'admin/services',
    loadChildren: () => import('./pages/settings/services/services.module').then( m => m.ServicesPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'admin/treatments',
    loadChildren: () => import('./pages/settings/treatments/treatments.module').then( m => m.TreatmentsPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'admin/diagnostics',
    loadChildren: () => import('./pages/settings/diagnostics/diagnostics.module').then( m => m.DiagnosticsPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'admin/settings',
    loadChildren: () => import('./pages/settings/settings.module').then( m => m.SettingsPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    redirectTo: '/calendar', 
    pathMatch: 'full'
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
