import { IApiResponse, ApiHelper } from '../apiHelper';
import { INewsFeed } from '../../models/newsfeed/INewsFeed';

export interface INewsFeedCreate {
    contentIds?: number[];
    groupTypeIds?: number[];
    tags?: string[];
    pageSize?: number;
    startIndex?: number;
    showArchived?: boolean;
}

export default class NewsApi {
    private apiHelper: ApiHelper;

    constructor(apiHelper: ApiHelper) {
        this.apiHelper = apiHelper;
    }

    public loadNewsFeed(request: INewsFeedCreate, ignoreErrors?: boolean): Promise<IApiResponse<INewsFeed>> {
        return this.apiHelper.newApiRequest<INewsFeed>({
            url: 'newsfeed',
            method: 'POST',
            data: request,
            ignoreErrors
        });
    }

}