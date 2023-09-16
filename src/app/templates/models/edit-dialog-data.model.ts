import {CategoryModel} from './category.model';
import {SubcategoryModel} from './subcategory.model';
import {StatusConst} from '../consts/status.const';

interface EditCategoryDialogDataModel {
  category?: CategoryModel;
  isCategory: true;
  title: string;
  status: StatusConst;
}

interface EditSubcategoryDialogDataModel {
  category?: SubcategoryModel;
  isCategory: false;
  title: string;
  status: StatusConst;
}

export type EditDialogDataModel = EditCategoryDialogDataModel | EditSubcategoryDialogDataModel;
