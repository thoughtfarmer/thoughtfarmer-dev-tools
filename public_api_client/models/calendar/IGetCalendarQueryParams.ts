export interface IGetCalendarQueryParams {
    startIndex?: number; 
    pageSize?: number; 
    startDate?: Date; 
    endDate?: Date; 
    ownedBy?: number; 
    includeRollupEvents?: boolean;
}