import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'apps/qualyteeth-patient/src/app/guards/auth.guard';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'odontogram',
        loadChildren: () => import('../odontogram/odontogram.module').then(m => m.OdontogramPageModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'odontogram/tooth/:fdi_number',
        loadChildren: () => import('../tooth/tooth.module').then(m => m.ToothPageModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'dentists',
        loadChildren: () => import('../dentists/dentists.module').then(m => m.DentistsPageModule),
        canActivate: [AuthGuard]
      },
      // {
      //   path: 'dentists/:dentist_id',
      //   loadChildren: () => import('../dentist/dentist.module').then(m => m.DentistPageModule),
      //   canActivate: [AuthGuard]
      // },
      // {
      //   path: 'surgeries',
      //   loadChildren: () => import('../surgeries/surgeries.module').then(m => m.SurgeriesPageModule),
      //   canActivate: [AuthGuard]
      // },
      {
        path: 'calendar',
        loadChildren: () => import('../calendar/calendar.module').then(m => m.CalendarPageModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'documents',
        loadChildren: () => import('../documents/documents.module').then(m => m.DocumentsPageModule),
        canActivate: [AuthGuard]
      },
      {
        path: '',
        redirectTo: '/tabs/odontogram',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/odontogram',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule { }
