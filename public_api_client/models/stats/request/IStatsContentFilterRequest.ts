import { PageType } from '../../content/PageType';

export interface IStatsContentFilterRequest {
    contentIds?: number[];
    excludeContentIds?: number[];
    pageTypes?: PageType[];
    excludePageTypes?: PageType[];
    sectionIds?: number[];
    excludeSectionIds?: number[];
    ownedBy?: number[];
    excludeOwnedBy?: number[];
    ownedByGroupMembers?: number[];
    excludeOwnedByGroupMembers?: number[];
    ownedBySecurityGroupMembers?: number[];
    excludeOwnedBySecurityGroupMembers?: number[];
    createdBefore?: Date;
    createdAfter?: Date;
    publishedBefore?: Date;
    publishedAfter?: Date;
}
