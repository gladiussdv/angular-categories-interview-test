import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TemplatesComponent} from './components/templates/templates.component';
import {TemplatesRouteConst} from './consts/templates-route.const';
import {CategoriesComponent} from './components/categories/categories.component';

const routes: Routes = [
  {
    path: '',
    component: TemplatesComponent,
    children: [
      {
        path: '',
        redirectTo: TemplatesRouteConst.PUBLISHED,
        pathMatch: 'full'
      },
      {
        path: TemplatesRouteConst.PUBLISHED,
        component: CategoriesComponent
      },
      {
        path: TemplatesRouteConst.ARCHIVED,
        component: CategoriesComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TemplatesRoutingModule { }
