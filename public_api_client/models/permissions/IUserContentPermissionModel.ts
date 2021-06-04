export interface IUserContentPermissionModel {
    userId: number;
    contentId: number;
    canEdit: boolean;
    canView: boolean;
}