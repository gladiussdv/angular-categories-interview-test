import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TemplatesRoutingModule } from './templates-routing.module';
import { TemplatesComponent } from './components/templates/templates.component';
import {MatIconModule} from '@angular/material/icon';
import { CategoriesComponent } from './components/categories/categories.component';
import {MatTabsModule} from '@angular/material/tabs';
import {MatInputModule} from '@angular/material/input';
import {ReactiveFormsModule} from '@angular/forms';
import {MatListModule} from '@angular/material/list';
import {HttpClientModule} from '@angular/common/http';
import {CategoriesService} from './services/categories.service';
import {MatButtonModule} from '@angular/material/button';
import { EditCategoryDialogComponent } from './components/edit-category-dialog/edit-category-dialog.component';
import { CategoryActionsComponent } from './components/category-actions/category-actions.component';
import {SharedModule} from '../shared/shared.module';
import {MatDialogModule} from '@angular/material/dialog';
import { MobileCategoriesComponent } from './components/mobile-categories/mobile-categories.component';
import { CategoriesPageComponent } from './components/categories-page/categories-page.component';
import {MatMenuModule} from '@angular/material/menu';


@NgModule({
  declarations: [
    TemplatesComponent,
    CategoriesComponent,
    EditCategoryDialogComponent,
    CategoryActionsComponent,
    MobileCategoriesComponent,
    CategoriesPageComponent
  ],
  imports: [
    CommonModule,
    TemplatesRoutingModule,
    MatIconModule,
    MatTabsModule,
    MatInputModule,
    ReactiveFormsModule,
    MatListModule,
    HttpClientModule,
    MatButtonModule,
    SharedModule,
    MatDialogModule,
    MatMenuModule
  ],
  providers: [
    CategoriesService
  ]
})
export class TemplatesModule { }
