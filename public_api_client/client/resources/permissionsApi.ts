import { IApiResponse, ApiHelper } from '../apiHelper';
import { IUserContentPermissionModel } from 'models/permissions/IUserContentPermissionModel';

export default class PermissionsApi {
    private apiHelper: ApiHelper;

    constructor(apiHelper: ApiHelper) {
        this.apiHelper = apiHelper;
    }

    public getUserPermissionsForPages(userId: number, contentIds: number[], ignoreErrors?: boolean): Promise<IApiResponse<IUserContentPermissionModel[]>> {
        return this.apiHelper.newApiRequest<boolean>({
            url: `permissions/user/${userId}`,
            method: 'POST',
            data: contentIds,
            ignoreErrors
        });
    }

    public getPagePermissionsForUsers(contentId: string, userIds: number[], ignoreErrors?: boolean): Promise<IApiResponse<IUserContentPermissionModel[]>> {
        return this.apiHelper.newApiRequest<ICanUserViewContent[]>({
            url: `permissions/page/${contentId}`,
            method: 'POST',
            data: userIds,
            ignoreErrors
        });
    }
}