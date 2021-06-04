import { ApiHelper, IApiResponse } from 'client/apiHelper';

export default class ExcelApi {
    private apiHelper: ApiHelper;

    constructor(apiHelper: ApiHelper) {
        this.apiHelper = apiHelper;
    }

    public getExcelContentAsJson(contentId: number, ignoreErrors?: boolean): Promise<IApiResponse<any>> {
        return this.apiHelper.newApiRequest<any>({
            url: `excel/${contentId}`,
            ignoreErrors
        });
    }
}