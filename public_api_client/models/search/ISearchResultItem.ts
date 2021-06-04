export interface ISearchResultItem {
    contentId?: number;
    userId?: number;
    summary?: string;
    title?: string;
    isArchived?: boolean;
    score?: number;
    treePath?: TreePathItem[];
    datePublished?: Date;
    url?: string;
    resultIndex?: number;
}