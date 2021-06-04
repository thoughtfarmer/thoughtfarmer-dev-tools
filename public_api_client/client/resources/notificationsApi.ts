import { IApiResponse, ApiHelper } from '../apiHelper';
import { IEmailProperties } from '../../models/notifications/IEmailProperties';

export default class NotificationsApi {
    private apiHelper: ApiHelper;

    constructor(apiHelper: ApiHelper) {
        this.apiHelper = apiHelper;
    }

    public sendSimpleEmail(email: IEmailProperties, ignoreErrors?: boolean): Promise<IApiResponse<null>> {
        return this.apiHelper.newApiRequest<null>({
            url: 'notifications/email/simple',
            method: 'POST',
            data: email,
            ignoreErrors
        });
    }
}