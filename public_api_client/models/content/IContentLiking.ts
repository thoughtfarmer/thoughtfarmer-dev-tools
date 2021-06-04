export interface IContentLiking {
    userId?: number;
    contentId?: number;
    totalLikes?: number;
    createdDate?: Date;
    isCurrentUser?: boolean;
    isLike?: boolean;
}