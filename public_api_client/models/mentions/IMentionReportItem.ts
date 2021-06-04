import { ISimpleUser } from 'models/user/ISimpleUser';

export interface IMentionReportItem {
    contentId?: number;
    isComment?: boolean;
    pageType?: string;
    createdBy?: ISimpleUser;
    parentContentId?: number;
    createdDate?: Date;
    mentionedUser?: ISimpleUser;
    mentionedGroupContentId?: number;
}