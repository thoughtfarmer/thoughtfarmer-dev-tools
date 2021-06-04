import DateFacetRange from './enums/DateFacetRange';
import SortType from './enums/SortType';
import SortDirection from './enums/SortDirection';

export interface ISearchGroupParameters {
    forQuery?: string;
    forContentIds?: number[];
    forTags?: number[];
    includeArchived?: boolean;
    forFirstLetterOfTitle?: string;
    forGroupTypes?: number[];
    forOwnedBy?: number[];
    forPublishedDate?: DateFacetRange;
    sortType?: SortType;
    sortDirection?: SortDirection;
    pageSize?: number;
    pageNumber?: number;
}