import { Training } from './training';

export type TrainingsWithPagination = {
  entities: Training[];
  totalPages: number;
  totalItems: number;
  currentPage: number;
  itemsPerPage: number;
}
