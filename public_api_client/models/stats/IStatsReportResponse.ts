import { IStatsUserReport } from './IStatsUserReport';
import { IStatsPageReport } from './IStatsPageReport';

export interface IStatsReportResponse {
    user?: IStatsUserReport[];
    page?: IStatsPageReport[];
}