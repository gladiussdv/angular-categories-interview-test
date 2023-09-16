import {BaseCategoryModel} from './base-category.model';
import {SubcategoryModel} from './subcategory.model';

export interface CategoryModel extends BaseCategoryModel {
  industry_id?: null;
  subcategories: SubcategoryModel[];
}
