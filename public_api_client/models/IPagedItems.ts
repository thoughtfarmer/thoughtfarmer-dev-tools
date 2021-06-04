export interface IPagedItems<T> {
    items: T[];
    pageNumber: number;
    pageSize: number;    
    totalItems: number;
    hasMore: boolean;
}