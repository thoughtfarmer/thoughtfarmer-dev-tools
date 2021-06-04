import { ApiHelper, IApiResponse } from 'client/apiHelper';

export interface IJwtResponse {
    encodedJwt: string;
}

export default class JwtApi {
    private apiHelper: ApiHelper;

    constructor(apiHelper: ApiHelper) {
        this.apiHelper = apiHelper;
    }

    public getVidyardToken(uuid: string | number, roleId: string, ignoreErrors?: boolean): Promise<IApiResponse<IJwtResponse>> {
        return this.apiHelper.newApiRequest<IJwtResponse>({
            method: 'POST',
            url: `jwt/vidyard/${uuid}`,
            data: { roleId },
            ignoreErrors
        });
    }

}