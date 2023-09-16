import {BaseCategoryModel} from './base-category.model';

export interface SubcategoryModel extends BaseCategoryModel {
  category_id: number;
}
