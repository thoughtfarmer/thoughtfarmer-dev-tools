import { IPageHierarchyItem } from 'models/content/IPageHierarchyItem';
import { ISimpleUser } from 'models/user/ISimpleUser';

export interface IStatsPageReport {
    contentId?: number;
    url?: string;
    title?: string;
    pageType?: string;   
    pageTypeLocalized?: string;   
    views?: number;
    uniqueViews?: number;
    creates?: number;
    edits?: number;
    uniqueEdits?: number;
    downloads?: number;
    uniqueDownloads?: number;
    startPlays?: number;
    uniqueStartPlays?: number;
    finishPlays?: number;
    uniqueFinishPlays?: number;
    likes?: number;
    follows?: number;
    comments?: number;
    bookmarks?: number;
    shares?: number;
    lastActionDate?: Date;
    totalActions?: number;
    modifiedDate?: Date;
    publishedDate?: Date;
    isArchived?: boolean;
    isPublished?: boolean;
    owner?: ISimpleUser;
    treePath?: IPageHierarchyItem[];
}