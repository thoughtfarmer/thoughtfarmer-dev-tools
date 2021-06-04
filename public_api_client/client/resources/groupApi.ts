import { IApiResponse, ApiHelper } from '../apiHelper';

export default class GroupApi {
    private apiHelper: ApiHelper;

    constructor(apiHelper: ApiHelper) {
        this.apiHelper = apiHelper;
    }

    public isGroupMember(contentId: number, userId: number, ignoreErrors?: boolean): Promise<IApiResponse<boolean>> {

        return this.apiHelper.newApiRequest<boolean>({
            url: `groups/${contentId}/users/${userId}`,
            ignoreErrors
        });
    }
}