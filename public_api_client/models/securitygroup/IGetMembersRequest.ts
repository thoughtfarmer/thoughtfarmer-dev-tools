export interface IGetMembersRequest {
    id: number;
    pageSize?: number;
    pageNumber?: number;
    includeInactive?: number;
    extraFields?: string;
}
