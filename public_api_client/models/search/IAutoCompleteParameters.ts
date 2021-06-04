import { PageType } from 'models/content/PageType';

export interface IAutoCompleteParameters {
    query?: string;
    includeUsers?: boolean;
    includePages?: boolean;
    includeSecurityGroups?: boolean;
    includePageTypes?: PageType[];
    excludeContentIds?: number[];
    excludeUserIds?: number[];
    excludeSecurityGroupIds?: number[];
}