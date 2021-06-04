import { IApiResponse, ApiHelper } from '../apiHelper';
import { ICardDataResponse } from '../../models/cardData/ICardDataResponse';
import { ICustomPortletStoreResponse } from '../../models/cardData/ICustomPortletStoreResponse';
import { Portlet } from '../../models/cardData/Portlet';

export interface ICardDataRequest {
    contentIds: number[];
    cards: Portlet[];
}

export interface ICustomPortletStoreRequest {
    portletTemplateId: number;
    key: string;
}

export default class CardDataApi {
    private apiHelper: ApiHelper;

    constructor(apiHelper: ApiHelper) {
        this.apiHelper = apiHelper;
    }

    public getCardData(request?: ICardDataRequest, ignoreErrors?: boolean): Promise<IApiResponse<ICardDataResponse[]>> {
        return this.apiHelper.newApiRequest<ICardDataResponse[]>({
            method: 'POST',
            data: request,
            url: 'carddata',
            ignoreErrors
        });
    }

    public getPortletStoreDataByKey(request: ICustomPortletStoreRequest, ignoreErrors?: boolean): Promise<IApiResponse<ICustomPortletStoreResponse>> {
        return this.apiHelper.newApiRequest<ICustomPortletStoreResponse>({
            url: `customportlets/${request.portletTemplateId}/data/${request.key}`,
            ignoreErrors
        });
    }

    public getPortletStoreDataMultiKeys(portletTemplateId: number, keys: string[], ignoreErrors?: boolean): Promise<IApiResponse<ICustomPortletStoreResponse[]>> {
        return this.apiHelper.newApiRequest<ICustomPortletStoreResponse[]>({
            url: `customportlets/${portletTemplateId}/multiData?keys=${keys.join()}`,
            ignoreErrors
        });
    }

    public getPortletStoreDataByLikeKey(request: ICustomPortletStoreRequest, ignoreErrors?: boolean): Promise<IApiResponse<ICustomPortletStoreResponse[]>> {
        return this.apiHelper.newApiRequest<ICustomPortletStoreResponse[]>({
            url: `customportlets/${request.portletTemplateId}/data?likeKey=${request.key}`,
            ignoreErrors
        });
    }

    public deletePortletStoreDataByLikeKey(request: ICustomPortletStoreRequest, ignoreErrors?: boolean): Promise<IApiResponse<string>> {
        return this.apiHelper.newApiRequest<string>({
            url: `customportlets/${request.portletTemplateId}/data?likeKey=${request.key}`,
            method: 'DELETE',
            ignoreErrors
        });
    }

    public deletePortletStoreDataByKey(request: ICustomPortletStoreRequest, ignoreErrors?: boolean): Promise<IApiResponse<string>> {
        return this.apiHelper.newApiRequest<string>({
            url: `customportlets/${request.portletTemplateId}/data/${request.key}`,
            method: 'DELETE',
            ignoreErrors
        });
    }

    public putPortletStoreDataByKey(portletTemplateId: number, data: any, ignoreErrors?: boolean): Promise<IApiResponse<string>> {
        return this.apiHelper.newApiRequest<string>({
            url: `customportlets/${portletTemplateId}/data`,
            method: 'PUT',
            data: data,
            ignoreErrors
        });
    }

}
