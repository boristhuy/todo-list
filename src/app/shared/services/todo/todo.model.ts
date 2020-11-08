import {Tag} from '../tag/tag.model';

export interface Todo {
  id?: number;
  title: string;
  completed?: boolean;
  tags: Tag[];
}
