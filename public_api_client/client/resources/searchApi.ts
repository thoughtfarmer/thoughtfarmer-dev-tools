import { IApiResponse, ApiHelper } from '../apiHelper';
import { ISearchContentParameters } from '../../models/search/ISearchContentParameters';
import { ISearchGroupParameters } from '../../models/search/ISearchGroupParameters';
import { ISearchUserParameters } from '../../models/search/ISearchUserParameters';
import { IPagedItems } from '../../models/IPagedItems';
import { ISearchResultItem } from '../../models/search/ISearchResultItem';
import { IUser } from 'models/user/IUser';
import { IAutoCompleteParameters } from 'models/search/IAutoCompleteParameters';
import { IAutoCompleteItem } from 'models/search/IAutoCompleteItem';

export default class SearchApi {
    private apiHelper: ApiHelper;

    constructor(apiHelper: ApiHelper) {
        this.apiHelper = apiHelper;
    }

    public searchGroups(request: ISearchGroupParameters, ignoreErrors?: boolean): Promise<IApiResponse<IPagedItems<ISearchResultItem>>> {
        return this.apiHelper.newApiRequest<IPagedItems<ISearchResultItem>>({
            url: 'search/groups',
            method: 'POST',
            data: request,
            ignoreErrors
        });       
    }  

    public searchUsers(request: ISearchUserParameters, ignoreErrors?: boolean): Promise<IApiResponse<IPagedItems<IUser>>> {
        return this.apiHelper.newApiRequest<IPagedItems<IUser>>({
            url: 'search/users',
            method: 'POST',
            data: request,
            ignoreErrors
        });
    }  

    public searchContent(request: ISearchContentParameters, ignoreErrors?: boolean): Promise<IApiResponse<IPagedItems<ISearchResultItem>>> {
        return this.apiHelper.newApiRequest<IPagedItems<ISearchResultItem>>({
            url: 'search',
            method: 'POST',
            data: request,
            ignoreErrors
        });
    }  

    public searchAutoComplete(request: IAutoCompleteParameters, ignoreErrors?: boolean): Promise<IApiResponse<IAutoCompleteItem[]>> {
        return this.apiHelper.newApiRequest<IAutoCompleteItem[]>({
            url: 'search/autocomplete',
            method: 'POST',
            data: request,
            ignoreErrors
        });
    }  

}


