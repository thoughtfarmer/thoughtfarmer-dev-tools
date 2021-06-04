import { IApiResponse, ApiHelper } from '../apiHelper';
import { IStatsReportRequest } from 'models/stats/request/IStatsReportRequest';
import { IStatsReportResponse } from 'models/stats/IStatsReportResponse';


export default class StatsApi {
    private apiHelper: ApiHelper;

    constructor(apiHelper: ApiHelper) {
        this.apiHelper = apiHelper;
    } 

    public getReport(request: IStatsReportRequest, ignoreErrors?: boolean): Promise<IApiResponse<IStatsReportResponse>> {       
        return this.apiHelper.newApiRequest<IStatsReportResponse>({
            url: 'stats/report',
            method: 'POST',
            data: request,
            ignoreErrors
        });
    }

    public getReportById(reportId: number | string, ignoreErrors?: boolean): Promise<IApiResponse<IStatsReportResponse>> {       
        return this.apiHelper.newApiRequest<IStatsReportResponse>({
            url: `stats/report/${reportId}`,
            method: 'GET',
            ignoreErrors
        });
    }

}       