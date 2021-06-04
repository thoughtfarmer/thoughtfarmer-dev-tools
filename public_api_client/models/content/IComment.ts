export interface IComment {
    commentId?: number;
    contentId?: number;
    posterId?: number;
    totalLikes?: number;
    commentText?: string;
    datePosted?: Date;
    deleted?: boolean;
    editedDate?: Date;
    hasBeenEdited?: boolean;
}