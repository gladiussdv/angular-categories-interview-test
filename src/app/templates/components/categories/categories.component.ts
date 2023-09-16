import {Component} from '@angular/core';
import {CategoriesService} from '../../services/categories.service';
import {Observable, of, switchMap, tap} from 'rxjs';
import {CategoryModel} from '../../models/category.model';
import {SubcategoryModel} from '../../models/subcategory.model';
import {MatDialog} from '@angular/material/dialog';
import {EditCategoryDialogComponent} from '../edit-category-dialog/edit-category-dialog.component';
import {EditDialogDataModel} from '../../models/edit-dialog-data.model';
import {Router} from '@angular/router';
import {TemplatesRouteConst} from '../../consts/templates-route.const';
import {StatusConst} from '../../consts/status.const';
import {ConfirmDialogComponent} from '../../../shared/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent {
  categoryList$: Observable<CategoryModel[]> = this.categoriesService.loadedCategories$.pipe(
    tap(v => {
      if (this.selectedCategory?.id) {
        this.selectedCategory = v.find(item => item.id === this.selectedCategory?.id);
      }
    })
  );
  selectedCategory?: CategoryModel;
  constructor(
    private readonly categoriesService: CategoriesService,
    private readonly dialog: MatDialog,
    private readonly router: Router
  ) {}

  onSelectCategory(category?: CategoryModel) {
    this.selectedCategory = category;
  }

  edit (item?: CategoryModel) {
    const dialogRef = this.dialog.open<EditCategoryDialogComponent, EditDialogDataModel, CategoryModel | Omit<CategoryModel, 'id'>>(EditCategoryDialogComponent, {
      data: {
        title: 'Edit category',
        isCategory: true,
        category: item,
        status: this.router.url.endsWith(TemplatesRouteConst.ARCHIVED) ? StatusConst.ARCHIVED : StatusConst.PUBLISHED
      }
    });

    dialogRef.afterClosed().pipe(
      switchMap(result => {
        if (result) {
          const id = (result as CategoryModel).id;
          if(id != null) {
            return this.categoriesService.editCategory(id, result.name);
          } else {
            return this.categoriesService.addCategory(result as Omit<CategoryModel, 'id'>);
          }
        }
        return of();
      })
    ).subscribe(() => {
      this.categoriesService.refreshItems();
    });
  }

  archive (item: CategoryModel) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent);
    dialogRef.afterClosed().pipe(
      switchMap(result => {
        if(result) {
          return this.categoriesService.archiveCategory(item.id);
        }
        return of();
      })
    ).subscribe(() => {
      this.categoriesService.refreshItems();
    });
  }

  editSubcategory (item?: SubcategoryModel) {
    if (this.selectedCategory?.id) {
      const dialogRef = this.dialog.open<
        EditCategoryDialogComponent,
        EditDialogDataModel,
        SubcategoryModel | Omit<SubcategoryModel, 'id'>
      >(EditCategoryDialogComponent, {
        data: {
          title: 'Edit subcategory',
          isCategory: false,
          category: item,
          status: this.router.url.endsWith(TemplatesRouteConst.ARCHIVED) ? StatusConst.ARCHIVED : StatusConst.PUBLISHED
        }
      });

      dialogRef.afterClosed().pipe(
        switchMap(result => {
          if (result) {
            const id = (result as SubcategoryModel).id;
            if (id != null) {
              return this.categoriesService.editSubcategory(id, result.name, result.category_id);
            } else {
              return this.categoriesService.addSubCategory({...result, category_id: this.selectedCategory?.id} as Omit<SubcategoryModel, 'id'>);
            }
          }
          return of();
        })
      ).subscribe(() => {
        this.categoriesService.refreshItems();
      });
    }
  }

  archiveSubcategory (item: SubcategoryModel) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent);
    dialogRef.afterClosed().pipe(
      switchMap(result => {
        if(result) {
          return this.categoriesService.archiveSubcategory(item.category_id, item.id);
        }
        return of();
      })
    ).subscribe(() => {
      this.categoriesService.refreshItems();
    });
  }
}
