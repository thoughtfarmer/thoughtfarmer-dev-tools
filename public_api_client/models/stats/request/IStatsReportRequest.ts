import { IStatsContentFilterRequest } from './IStatsContentFilterRequest';
import { IStatsUserFilterRequest } from './IStatsUserFilterRequest';
import { StatsApiReport } from './StatsApiReport';

export interface IStatsReportRequest {
    userFilters?: IStatsUserFilterRequest;
    contentFilters?: IStatsContentFilterRequest;
    startDate?: string;
    endDate?: string;
    reportsToGenerate: StatsApiReport[];
    includeNoActionUsers?: boolean;
    includeUserGroups?: boolean;
    includeTreePath?: boolean;
    includeLastPageActionDate?: boolean;
}