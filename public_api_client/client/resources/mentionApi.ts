import { IApiResponse, ApiHelper } from '../apiHelper';
import { IPagedItems } from 'models/IPagedItems';
import { IMentionReportItem } from 'models/mentions/IMentionReportItem';
import { IMentionLeaderboardReportItem } from 'models/mentions/IMentionLeaderboardReportItem';

export interface IMentionReportRequest {
    parentContentIds?: number[];
    userIds?: number[];
    mentionedUserIds?: number[];
    mentionedGroupContentIds?: number[];
    pageTypes?: string[];
    startDate?: string;
    endDate?: string;
    includeUpdatesToEveryone?: boolean;
    pageSize?: number;
    pageNumber?: number;
}

export interface IMentionLeaderboardReportRequest {
    parentContentIds?: number[];
    mentionedUserIds?: number[];
    startDate?: string;
    endDate?: string;
    includeUpdatesToEveryone?: boolean;
    includeShoutouts: boolean;
    includeUpdates: boolean;
    pageSize?: number;
    pageNumber?: number;
}

export default class MentionApi {
    private apiHelper: ApiHelper;

    constructor(apiHelper: ApiHelper) {
        this.apiHelper = apiHelper;
    }

    public getMentionReport(request: IMentionReportRequest, ignoreErrors?: boolean): Promise<IApiResponse<IPagedItems<IMentionReportItem>>> {        
        return this.apiHelper.newApiRequest<IPagedItems<IMentionReportItem>>({
            url: 'mention/report',
            method: 'POST',
            data: request,
            ignoreErrors
        });
    }  

    public getMentionLeaderboardReport(request: IMentionLeaderboardReportRequest, ignoreErrors?: boolean): Promise<IApiResponse<IPagedItems<IMentionLeaderboardReportItem>>> {        
        return this.apiHelper.newApiRequest<IPagedItems<IMentionLeaderboardReportItem>>({
            url: 'mention/leaderboard',
            method: 'POST',
            data: request,
            ignoreErrors
        });
    }  
}       