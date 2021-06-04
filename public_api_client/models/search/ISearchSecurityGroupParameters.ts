import SecurityGroupType from './enums/SecurityGroupType';

export interface ISearchSecurityGroupParameters {
    forQuery?: string;
    excludeContentIds?: number[];
    includeArchived?: boolean;
    pageSize?: number;
    pageNumber?: number;
    includeSecurityGroupTypes?: SecurityGroupType;
}