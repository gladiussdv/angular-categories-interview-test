import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CategoryModel} from '../models/category.model';
import {BehaviorSubject, first, Observable, of} from 'rxjs';
import {SubcategoryModel} from '../models/subcategory.model';

@Injectable()
export class CategoriesService {
  search: string = '';
  isPublishedSearch = true;
  data?: {
    archived: CategoryModel[];
    published: CategoryModel[];
  };

  loadCategories: BehaviorSubject<CategoryModel[]> = new BehaviorSubject<CategoryModel[]>([]);
  loadedCategories$ = this.loadCategories.asObservable();

  constructor(
    private readonly httpClient: HttpClient
  ) {
    this.initData();
    this.httpClient.get<{
      archived: CategoryModel[];
      published: CategoryModel[];
    }>('/assets/data.json').pipe(first()).subscribe(v => {
      if (v != null) {
        this.data = v;
        this.refreshItems();
      }
    });
  }

  refreshItems() {
    this.loadCategories.next(this.filterItems(this.search, (this.isPublishedSearch ? this.data?.published : this.data?.archived) ?? []));
  }

  findPublished(search: string) {
    this.search = search;
    this.isPublishedSearch = true;
    this.loadCategories.next(this.filterItems(search, this.data?.published ?? []));
  }

  findArchived(search: string) {
    this.search = search;
    this.isPublishedSearch = false;
    this.loadCategories.next(this.filterItems(search, this.data?.archived ?? []));
  }

  addCategory(category: Omit<CategoryModel, 'id'>): Observable<CategoryModel> {
    if (!this.data) {
      this.initData();
    }
    const savedCategory = {id: this.generateId(), ...category};
    this.data?.published.push(savedCategory);
    return of(savedCategory);
  }

  editCategory(id: number, name: string) {
    return of(this.updateCategoryInArray(id, name, this.data?.published));
  }



  archiveCategory(id: number) {
    if (this.data) {
      const index = this.data.published.findIndex(v => v.id === id);
      if (index > -1) {
        const removedItems = this.data.published.splice(index, 1);
        const item = removedItems[0];
        if (item) {
          this.data.archived.push(item);
          return of(item);
        }
      }
    }
    return of();
  }

  addSubCategory(subcategory: Omit<SubcategoryModel, 'id'>): Observable<SubcategoryModel> {
    if (!this.data) {
      this.initData();
    }
    const savedCategory = {id: this.generateId(), ...subcategory};
    const index = this.data?.published.findIndex(v => v.id === subcategory.category_id);
    const newSubcategory = {id: this.generateId(), ...subcategory};
    if (index != null && index > -1) {
      if (this.data && !this.data?.published[index]?.subcategories) {
        this.data.published[index].subcategories = [];
      }
      this.data?.published[index]?.subcategories.push(newSubcategory);
    }
    return of(savedCategory);
  }

  editSubcategory(id: number, name: string, categoryId: number) {
    return of(this.updateSubcategoryInArray(id, name, categoryId, this.data?.published));
  }



  archiveSubcategory(categoryId: number, id: number) {
    if (this.data) {
      const index = this.data.published.findIndex(v => v.id === categoryId);
      if (index > -1) {
        const category = this.data.published[index];
        const indexSubCategory = category.subcategories.findIndex(v => v.id === id);

        if (indexSubCategory > -1) {
          const removedItems = category.subcategories.splice(indexSubCategory, 1);
          const item = removedItems[0];
          if (item) {
            const archivedIndex = this.data.archived.findIndex(v => v.id === categoryId);
            if (archivedIndex) {
              if (!this.data.archived[archivedIndex].subcategories) {
                this.data.archived[archivedIndex].subcategories = [];
              }
              this.data.archived[archivedIndex].subcategories.push(item);
              return of(item);
            } else {
              let {subcategories, ...other} = category;
              this.data.archived.push({...other, subcategories: [item]});
              return of(item);
            }
          }
        }
      }
    }
    return of();
  }

  private initData() {
    this.data = {
      archived: [],
      published: []
    };
  }

  private filterItems(search: string, array: CategoryModel[]) {
    const filteredCategories = search ? array.filter(v => v.name.includes(search)) : array;
    const filteredWithSubcategories = filteredCategories?.map(v => ({...v, subcategories: (search ? v.subcategories?.filter(item => item.name.includes(search)) : v.subcategories) ?? []}));
    return filteredWithSubcategories ?? [];
  }

  private updateCategoryInArray(id: number, name: string, array?: CategoryModel[]) {
    if (array) {
      for (let i = 0; i < array.length; i++) {
        const category = array[i];
        if(category.id === id) {
          category.name = name;
          return category;
        }
      }
    }
    return;
  }

  private updateSubcategoryInArray(id: number, name: string, categoryId: number, array?: CategoryModel[]) {
    if (array) {
      for (let i = 0; i < array.length; i++) {
        const category = array[i];
        if(category.id === categoryId && category.subcategories != null) {
          for(let j = 0; j < category.subcategories.length; j++) {
            const subcategory = category.subcategories[j];
            if (subcategory.id === id) {
              subcategory.name = name;
              return subcategory;
            }
          }
        }
      }
    }
    return;
  }

  private generateId(): number {
    if (this.data) {
      const total = this.getAllCategories();
      const subcategories = total.map(v => v?.subcategories ?? []);
      const totalWithSubcategories = [...total, ...subcategories.flat()];
      const ids = totalWithSubcategories?.map(v => v.id);
      const maxValue = Math.max(...ids);
      return maxValue + 1;
    }
    return 0;
  }

  private getAllCategories() {
    if (this.data) {
      return [...this.data.published, ...this.data.archived];
    }
    return [];
  }
}
