import { IGetMembersRequest } from '../../models/securitygroup/IGetMembersRequest';
import { IApiResponse, ApiHelper } from '../apiHelper';
import { buildQueryString } from '../../helpers/utility';
import { IPagedItems } from '../../models/IPagedItems';
import { IUser } from '../../models/user/IUser';

export default class SecurityGroupApi {
    private apiHelper: ApiHelper;

    constructor(apiHelper: ApiHelper) {
        this.apiHelper = apiHelper;
    }

    public getMembers(request: IGetMembersRequest, ignoreErrors?: boolean): Promise<IApiResponse<IPagedItems<IUser>>> {
        const queryString = buildQueryString(request);
        return this.apiHelper.newApiRequest<null>({
            url: `securitygroup/${request.id}/members?${queryString}`,
            method: 'GET',
            ignoreErrors
        });
    }
}