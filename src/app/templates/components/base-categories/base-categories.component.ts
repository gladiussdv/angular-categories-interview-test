import {Observable, of, Subscription, switchMap, tap} from 'rxjs';
import {CategoryModel} from '../../models/category.model';
import {CategoriesService} from '../../services/categories.service';
import {MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {EditCategoryDialogComponent} from '../edit-category-dialog/edit-category-dialog.component';
import {EditDialogDataModel} from '../../models/edit-dialog-data.model';
import {TemplatesRouteConst} from '../../consts/templates-route.const';
import {StatusConst} from '../../consts/status.const';
import {ConfirmDialogComponent} from '../../../shared/components/confirm-dialog/confirm-dialog.component';
import {SubcategoryModel} from '../../models/subcategory.model';
import {Component, OnDestroy} from '@angular/core';

@Component({
  template: '',
  standalone: true
})
export class BaseCategoriesComponent implements OnDestroy {
  categoryList$: Observable<CategoryModel[]> = this.categoriesService.loadedCategories$.pipe(
    tap(v => {
      if (this.selectedCategory?.id) {
        this.selectedCategory = v.find(item => item.id === this.selectedCategory?.id);
      }
    })
  );
  selectedCategory?: CategoryModel;

  editSubscription?: Subscription;
  archiveSubscription?: Subscription;
  editSubcategorySubscription?: Subscription;
  archiveSubcategorySubscription?: Subscription;
  constructor(
    protected readonly categoriesService: CategoriesService,
    protected readonly dialog: MatDialog,
    protected readonly router: Router
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

    this.editSubscription?.unsubscribe();
    this.editSubscription = dialogRef.afterClosed().pipe(
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
    this.archiveSubscription?.unsubscribe();
    this.archiveSubscription = dialogRef.afterClosed().pipe(
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

      this.editSubcategorySubscription?.unsubscribe();
      this.editSubcategorySubscription = dialogRef.afterClosed().pipe(
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

    this.archiveSubcategorySubscription?.unsubscribe();
    this.archiveSubcategorySubscription = dialogRef.afterClosed().pipe(
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

  ngOnDestroy(): void {
    this.editSubscription?.unsubscribe();
    this.archiveSubscription?.unsubscribe();
    this.editSubcategorySubscription?.unsubscribe();
    this.archiveSubcategorySubscription?.unsubscribe();
  }
}
