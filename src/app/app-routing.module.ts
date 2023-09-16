import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AppRouteConst} from './shared/consts/app-route.const';

const routes: Routes = [
  { path: '', redirectTo: AppRouteConst.DASHBOARD, pathMatch: 'full'},
  { path: AppRouteConst.DASHBOARD, loadComponent: () => import('./dashboard/dashboard.component').then((x) => x.DashboardComponent),},
  { path: AppRouteConst.TEMPLATES, loadChildren: () => import('./templates/templates.module').then((m) => m.TemplatesModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
