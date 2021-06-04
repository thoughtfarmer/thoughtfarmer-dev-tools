export interface IStatsUserFilterRequest {
    userIds?: number[];
    excludeUserIds?: number[];
    groupIds?: number[];
    excludeGroupIds?: number[];
    securityGroupIds?: number[];
    excludeSecurityGroupIds?: number[];
    includeInactive?: boolean;
}
