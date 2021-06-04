import { buildQueryString } from '../../helpers/utility';
import { IApiResponse, ApiHelper } from '../apiHelper';
import { IContent } from '../../models/content/IContent';
import { IEditContentModel } from '../../models/content/IEditContent';
import { ITag } from '../../models/content/ITag';
import { IActivityItemModel } from '../../models/content/IActivityItemModel';
import { IContentPermissions } from '../../models/content/IContentPermissions';
import { IUser } from '../../models/user/IUser';
import { IComment } from '../../models/content/IComment';
import { IContentLiking } from '../../models/content/IContentLiking';

export default class ContentApi {
    private apiHelper: ApiHelper;

    constructor(apiHelper: ApiHelper) {
        this.apiHelper = apiHelper;
    }

    public getContent(contentId: number, ignoreErrors?: boolean): Promise<IApiResponse<IContent>> {
        return this.apiHelper.newApiRequest<IContent>({
            url: `content/${contentId}`,
            ignoreErrors
        });
    }

    public postContent(postContentModel: IEditContentModel, ignoreErrors?: boolean): Promise<IApiResponse<IContent[]>> {
        return this.apiHelper.newApiRequest<IContent[]>({
            url: 'content',
            method: 'POST',
            data: postContentModel,
            ignoreErrors
        });
    }

    public getMultiContent(contentIds?: number[], ignoreErrors?: boolean): Promise<IApiResponse<IContent[]>> {
        const queryString = buildQueryString({contentIds});
        return this.apiHelper.newApiRequest<IContent[]>({
            url: `content?${queryString}`,
            ignoreErrors
        });
    }

    public deleteContent(contentId: number, ignoreErrors?: boolean): Promise<IApiResponse<string>> {
        return this.apiHelper.newApiRequest<string>({
            url: `content/${contentId}`,
            method: 'DELETE',
            ignoreErrors
        });
    }

    public patchContent(contentId: number, editContentModel: IEditContentModel, ignoreErrors?: boolean): Promise<IApiResponse<IContent>> {
        return this.apiHelper.newApiRequest<IContent>({
            url: `content/${contentId}`,
            method: 'PATCH',
            data: editContentModel,
            ignoreErrors
        });
    }

    public postChangeContentOwner(contentId: number, changeContentOwnerModel: { userId: number }, ignoreErrors?: boolean): Promise<IApiResponse<ITag[]>> {
        return this.apiHelper.newApiRequest<ITag[]>({
            url: `content/${contentId}/changeowner`,
            method: 'POST',
            data: changeContentOwnerModel,
            ignoreErrors
        });
    }

    public getContentChildren(contentId: number, ignoreErrors?: boolean): Promise<IApiResponse<IContent[]>> {
        return this.apiHelper.newApiRequest<IContent[]>({
            url: `content/${contentId}/children`,
            ignoreErrors
        });
    }

    public getContentParents(contentId: number, ignoreErrors?: boolean): Promise<IApiResponse<IContent[]>> {
        return this.apiHelper.newApiRequest<IContent[]>({
            url: `content/${contentId}/parents`,
            ignoreErrors
        });
    }

    public getContentTags(contentId: number, ignoreErrors?: boolean): Promise<IApiResponse<ITag[]>> {
        return this.apiHelper.newApiRequest<ITag[]>({
            url: `content/${contentId}/tags`,
            ignoreErrors
        });
    }

    public getMultiContentTags(contentIds: string, ignoreErrors?: boolean): Promise<IApiResponse<ITag[]>> {
        return this.apiHelper.newApiRequest<ITag[]>({
            url: `content/tags?contentIds=${contentIds}`,
            ignoreErrors
        });
    }

    public postContentTags(contentId: number, tags: string[], ignoreErrors?: boolean): Promise<IApiResponse<ITag[]>> {
        return this.apiHelper.newApiRequest<ITag[]>({
            url: `content/${contentId}/tags`,
            method: 'POST',
            data: tags,
            ignoreErrors
        });
    }

    ///THIS IS CURRENTLY BROKEN TF-23502
    public postMultiContentTags(contentIds: number[], ignoreErrors?: boolean): Promise<IApiResponse<ITag[]>> {
        const queryString = buildQueryString(contentIds);
        return this.apiHelper.newApiRequest<ITag[]>({
            url: `content?${queryString}`,
            ignoreErrors
        });
    }

    public deleteContentTags(contentId: number, ignoreErrors?: boolean): Promise<IApiResponse<string>> {
        return this.apiHelper.newApiRequest<string>({
            url: `content/${contentId}/tags`,
            method: 'DELETE',
            ignoreErrors
        });
    }

    public deleteContentTag(contentId: number, tagId: number, ignoreErrors?: boolean): Promise<IApiResponse<string>> {
        return this.apiHelper.newApiRequest<string>({
            url: `content/${contentId}/tags/${tagId}`,
            method: 'DELETE',
            ignoreErrors
        });
    }

    public getContentActivity(contentId: number, tagId: number, ignoreErrors?: boolean): Promise<IApiResponse<IActivityItemModel[]>> {
        return this.apiHelper.newApiRequest<IActivityItemModel[]>({
            url: `content/${contentId}/activity`,
            ignoreErrors
        });
    }

    public getContentPermissions(contentId: number, ignoreErrors?: boolean): Promise<IApiResponse<IContentPermissions>> {
        return this.apiHelper.newApiRequest<IContentPermissions>({
            url: `content/${contentId}/permissions`,
            ignoreErrors
        });
    }

    public getContentFollowers(contentId: number, ignoreErrors?: boolean): Promise<IApiResponse<IUser[]>> {
        return this.apiHelper.newApiRequest<IUser[]>({
            url: `content/${contentId}/followers`,
            ignoreErrors
        });
    }

    public postContentFollowers(contentId: number, userIds: number[], ignoreErrors?: boolean): Promise<IApiResponse<IUser[]>> {
        return this.apiHelper.newApiRequest<IUser[]>({
            url: `content/${contentId}/followers`,
            method: 'POST',
            data: userIds,
            ignoreErrors
        });
    }

    public deleteContentFollowers(contentId: number, userIds: number[], ignoreErrors?: boolean): Promise<IApiResponse<null>> {
        const queryString = buildQueryString(userIds);
        return this.apiHelper.newApiRequest<null>({
            url: `content/${contentId}/followers?${queryString}`,
            method: 'DELETE',
            ignoreErrors
        });
    }

    public getContentLikes(contentId: number, ignoreErrors?: boolean): Promise<IApiResponse<IUser[]>> {
        return this.apiHelper.newApiRequest<IUser[]>({
            url: `content/${contentId}/likes`,
            ignoreErrors
        });
    }

    public getContentComments(contentId: number, ignoreErrors?: boolean): Promise<IApiResponse<IComment[]>> {
        return this.apiHelper.newApiRequest<IComment[]>({
            url: `content/${contentId}/comments`,
            ignoreErrors
        });
    }

    public postContentLike(contentId: number, ignoreErrors?: boolean): Promise<IApiResponse<IContentLiking>> {
        return this.apiHelper.newApiRequest<IContentLiking>({
            url: `content/${contentId}/like`,
            method: 'POST',
            ignoreErrors
        });
    }

    public deleteContentLike(contentId: number, ignoreErrors?: boolean): Promise<IApiResponse<boolean>> {
        return this.apiHelper.newApiRequest<boolean>({
            url: `content/${contentId}/like`,
            method: 'DELETE',
            ignoreErrors
        });
    }

    public postContentClone(contentId: number, destinationParentId: number, ignoreErrors?: boolean): Promise<IApiResponse<IContent>> {
        return this.apiHelper.newApiRequest<IContent>({
            url: `content/${contentId}/clone/${destinationParentId}`,
            method: 'POST',
            ignoreErrors
        });
    }

    public getPortletContentByCulture(contentId: number, culture: string, ignoreErrors?: boolean): Promise<IApiResponse<any>> {
        return this.apiHelper.newApiRequest<any>({
            url: `content/${contentId}/portlets?culture=${culture}`,
            ignoreErrors
        });
    }
}
