import {Component} from '@angular/core';
import {BaseCategoriesComponent} from '../base-categories/base-categories.component';
import {CategoriesService} from '../../services/categories.service';
import {MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {generateAlphabet} from '../../../shared/utils/generateAlphabet';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent extends BaseCategoriesComponent {

  alphabet = generateAlphabet().join('');
  constructor(
    protected override readonly categoriesService: CategoriesService,
    protected override readonly dialog: MatDialog,
    protected override readonly router: Router
  ) {
    super(categoriesService, dialog, router);
  }

  protected readonly length = length;
}
