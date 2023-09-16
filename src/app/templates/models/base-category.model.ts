import {StatusConst} from '../consts/status.const';

export interface BaseCategoryModel {
  id: number;
  name: string;
  status: StatusConst;
  createdAt: string;
  updatedAt: string;
}
