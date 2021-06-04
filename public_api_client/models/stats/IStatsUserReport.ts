export interface IStatsUserReport {
    fullName?: string;
    userId?: number;
    contentId?: number;
    edits?: number;
    uniqueEdits?: number;    
    creates?: number;
    comments?: number;
    likes?: number;
    bookmarks?: number;
    follows?: number;
    shares?: number;
    views?: number;
    uniqueViews?: number;
    downloads?: number;
    uniqueDownloads?: number;
    startPlays?: number;
    uniqueStartPlays?: number;
    finishPlays?: number;
    uniqueFinishPlays?: number;
    totalActions?: number;
    groups?: string;
}