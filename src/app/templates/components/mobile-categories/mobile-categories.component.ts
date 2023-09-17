import { Component } from '@angular/core';
import {BaseCategoriesComponent} from '../base-categories/base-categories.component';
import {CategoriesService} from '../../services/categories.service';
import {MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';

@Component({
  selector: 'app-mobile-categories',
  templateUrl: './mobile-categories.component.html',
  styleUrls: ['./mobile-categories.component.scss']
})
export class MobileCategoriesComponent extends BaseCategoriesComponent {
  constructor(
    protected override readonly categoriesService: CategoriesService,
    protected override readonly dialog: MatDialog,
    protected override readonly router: Router
  ) {
    super(categoriesService, dialog, router);
  }
}
