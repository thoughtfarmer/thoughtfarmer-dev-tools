import { ISimpleUser } from '../../models/user/ISimpleUser';

export interface IMentionLeaderboardReportItem {
    count?: number;
    parentContentId?: number;
    mentionedUser?: ISimpleUser;
}