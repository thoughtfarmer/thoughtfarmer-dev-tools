import { SortType } from './enums/SortType';
import { SortDirection } from './enums/SortDirection';
import { DateFilter } from './enums/DateFilter';

export interface ISearchUserParameters {
    forQuery?: string;
    forTags?: number[];
    forGroups?: number[];
    forAnyOfTheseGroups?: number[];
    forFirstLetterOfLastName?: string;
    forCustomFields?: Record<number, number[]>;
    forCustomFieldDates?: Record<string, Record<DateFilter, string>>;
    forBirthdayDay?: number;
    forBirthdayMonth?: number;
    forBirthdayYear?: number;
    forAnniversaryDay?: number;
    forAnniversaryMonth?: number;
    forAnniversaryYear?: number;
    pageSize: number;
    pageNumber: number;
    sortType?: SortType;
    sortDirection?: SortDirection;
}