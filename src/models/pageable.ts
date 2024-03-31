export interface Pageable<T> {
  content?: T[];
  currentPage?: number;
  totalPages?: number;
  totalElements?: number;
}
