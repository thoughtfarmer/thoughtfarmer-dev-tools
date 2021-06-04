import { buildQueryString } from '../../helpers/utility';
import { IApiResponse, ApiHelper } from '../apiHelper';
import { ICanUserViewContent } from 'models/user/ICanUserViewContent';
import { ICustomField } from 'models/user/ICustomField';
import { IUser } from '../../models/user/IUser';
import { IUserSession } from 'models/user/IUserSession';
import { IProfileFieldResult } from 'models/user/IProfileField';
import { IUpcomingBirthdays } from 'models/user/IUpcomingBirthdays';
import { ICreateUserRequest } from 'models/user/request/ICreateUserRequest';
import { IUpdateStatusModel } from 'models/user/request/IUpdateStatusModel';
import { IEditUserModel } from 'models/user/request/IEditUserModel';
import { IGroup } from 'models/content/IGroup';

export interface IGetUsersRequest {
    userIds?: number[];
    contentIds?: number[];
    extraFields?: string[];
    includeInactive?: boolean;
}

export interface IGetUsersUpcomingBirthdaysRequest {
    daysAhead?: number;
    customBirthdayFieldId?: number;
    startDay?: string; //date format: 'yyyy-mm-dd'
    endDay?: string; //date format: 'yyyy-mm-dd'
    groupContentIds?: string;
}

export interface IGetUserPhotoCropped {
    userId?: number;
    width?: number;
    height?: number;
}

export default class UsersApi {
    private apiHelper: ApiHelper;

    constructor(apiHelper: ApiHelper) {
        this.apiHelper = apiHelper;
    }

    public getUsers(request?: IGetUsersRequest, ignoreErrors?: boolean): Promise<IApiResponse<IUser[]>> {
        const queryString = buildQueryString(request);
        return this.apiHelper.newApiRequest<IUser[]>({
            url: `users?${queryString}`,
            ignoreErrors
        });
    }

    public getProfileFields(ignoreErrors?: boolean): Promise<IApiResponse<IProfileFieldResult>> {
        return this.apiHelper.newApiRequest<IProfileFieldResult>({
            url: 'users/profilefields',
            ignoreErrors
        });
    }

    public getUser(userId: number, extraFields: string[], ignoreErrors?: boolean): Promise<IApiResponse<IUser>> {
        const queryString = buildQueryString({extraFields});

        return this.apiHelper.newApiRequest<IUser>({
            url: `users/${userId}?${queryString}`,
            ignoreErrors
        });
    }

    public getCurrentUser(ignoreErrors?: boolean): Promise<IApiResponse<IUser>> {
        return this.apiHelper.newApiRequest<IUser>({
            url: 'users/current',
            ignoreErrors
        });
    }

    // if username has a backslash, it must be double backslashes (ex: domain\\user)
    public getUserByUsername(username: string, ignoreErrors?: boolean): Promise<IApiResponse<IUser>> {
        const queryString = buildQueryString({username});

        return this.apiHelper.newApiRequest<IUser>({
            url: `users/username?${queryString}`,
            ignoreErrors
        });
    }

    public getRandomUser(extraFields: string[], ignoreErrors?: boolean): Promise<IApiResponse<IUser>> {
        const queryString = buildQueryString({extraFields});

        return this.apiHelper.newApiRequest<IUser>({
            url: `users/random?${queryString}`,
            ignoreErrors
        });
    }

    public getUserGroups(userId: number, ignoreErrors?: boolean): Promise<IApiResponse<IGroup[]>> {

        return this.apiHelper.newApiRequest<IGroup[]>({
            url: `users/${userId}/groups`,
            ignoreErrors
        });
    }

    public getUserCustomFields(userId: number, ignoreErrors?: boolean): Promise<IApiResponse<ICustomField[]>> {

        return this.apiHelper.newApiRequest<ICustomField[]>({
            url: `users/${userId}/customfields`,
            ignoreErrors
        });
    }

    public getUserCustomField(userId: number, customField: number, ignoreErrors?: boolean): Promise<IApiResponse<ICustomField>> {

        return this.apiHelper.newApiRequest<ICustomField>({
            url: `user/${userId}/customfield/${customField}`,
            ignoreErrors
        });
    }

    public getUsersActiveSessions(maxIdleTime: number, ignoreErrors?: boolean): Promise<IApiResponse<IUserSession[]>> {
        const queryString = buildQueryString({maxIdleTime});

        return this.apiHelper.newApiRequest<IUserSession[]>({
            url: `users/activesessions?${queryString}`,
            ignoreErrors
        });
    }
    
    public getUsersUpcomingBirthdays(request: IGetUsersUpcomingBirthdaysRequest, ignoreErrors?: boolean): Promise<IApiResponse<IUpcomingBirthdays>> {
        const queryString = buildQueryString(request);

        return this.apiHelper.newApiRequest<IUpcomingBirthdays>({
            url: `users/upcomingbirthdays?${queryString}`,
            ignoreErrors
        });
    }

    
    public getUserState(userId: number, key: string, ignoreErrors?: boolean): Promise<IApiResponse<string>> {

        return this.apiHelper.newApiRequest<string>({
            url: `user/${userId}/state/${key}`,
            ignoreErrors
        });
    }

    public updateUserState(userId: number, key: string, value: string, ignoreErrors?: boolean): Promise<IApiResponse<string>> {

        return this.apiHelper.newApiRequest<string>({
            method: 'POST',
            url: `user/${userId}/state/`,
            data: { key, value },
            ignoreErrors
        });
    }

    public getUserManager(userId: number, ignoreErrors?: boolean): Promise<IApiResponse<IUser>> {

        return this.apiHelper.newApiRequest<IUser>({
            url: `user/${userId}/manager`,
            ignoreErrors
        });
    }

    public getUserAlsoReportsTo(userId: number, ignoreErrors?: boolean): Promise<IApiResponse<IUser[]>> {

        return this.apiHelper.newApiRequest<IUser[]>({
            url: `user/${userId}/alsoreportsto`,
            ignoreErrors
        });
    }

    public getUserDirectReports(userId: number, ignoreErrors?: boolean): Promise<IApiResponse<IUser[]>> {

        return this.apiHelper.newApiRequest<IUser[]>({
            url: `user/${userId}/directreports`,
            ignoreErrors
        });
    }

    // TODO: I am not sure the best thing to do here. These are returning the actual file. So perhaps a Blob? Need to research this a bit more.
    // public getUserPhoto(userId: number, ignoreErrors?: boolean): Promise<IApiResponse<any>> {

    //     return this.apiHelper.newApiRequest<any>({
    //         url: `user/${userId}/photo`,
    //         ignoreErrors
    //     });
    // }

    // public getUserPhotoCropped(request: IGetUserPhotoCropped, cropped: boolean, ignoreErrors?: boolean): Promise<IApiResponse<any>> {
    //     const queryString = buildQueryString({cropped});

    //     return this.apiHelper.newApiRequest<any>({
    //         url: `user/${request.userId}/photo/${request.width}/${request.height}?${queryString}`,
    //         ignoreErrors
    //     });
    // }

    public getUserCustomFieldbyGroupAndFieldName(userId: number, groupName: string, customFieldName: string, ignoreErrors?: boolean): Promise<IApiResponse<ICustomField>> {

        return this.apiHelper.newApiRequest<ICustomField>({
            url: `user/${userId}/customField/${groupName}/${customFieldName}`,
            ignoreErrors
        });
    }

    public getUsersWithCustomFieldValue(groupName: string, customFieldName: string, value: string, ignoreErrors?: boolean): Promise<IApiResponse<IUser[]>> {
        const queryString = buildQueryString({value});

        return this.apiHelper.newApiRequest<IUser[]>({
            url: `users/find/customField/${groupName}/${customFieldName}?${queryString}`,
            ignoreErrors
        });
    }

    public getUserCanView(userId: number, contentId: number, ignoreErrors?: boolean): Promise<IApiResponse<boolean>> {

        return this.apiHelper.newApiRequest<boolean>({
            url: `user/${userId}/canview/${contentId}`,
            ignoreErrors
        });
    }

    public getUsersCanView(userIds: string, contentId: number, ignoreErrors?: boolean): Promise<IApiResponse<ICanUserViewContent[]>> {
        const queryString = buildQueryString({userIds});

        return this.apiHelper.newApiRequest<ICanUserViewContent[]>({
            url: `users/canview/${contentId}?${queryString}`,
            ignoreErrors
        });
    }

    public getUserCanEdit(userId: number, contentId: number, ignoreErrors?: boolean): Promise<IApiResponse<boolean>> {

        return this.apiHelper.newApiRequest<boolean>({
            url: `user/${userId}/canedit/${contentId}`,
            ignoreErrors
        });
    }

    public getUserCanEditMulti(userId: number, contentIds: string, ignoreErrors?: boolean): Promise<IApiResponse<IUserCanEditContent[]>> {
        return this.apiHelper.newApiRequest<IUserCanEditContent[]>({
            url: `user/${userId}/canedit?contentIds=${contentIds}`,
            ignoreErrors
        });
    }

    public createUser(request: ICreateUserRequest, ignoreErrors?: boolean): Promise<IApiResponse<IUser>> {
        return this.apiHelper.newApiRequest<IUser>({
            data: request,
            method: 'POST',
            url: 'users',
            ignoreErrors
        });
    }

    public updateStatus(request: IUpdateStatusModel[], ignoreErrors?: boolean): Promise<IApiResponse<null>> {
        return this.apiHelper.newApiRequest<null>({
            data: request,
            method: 'POST',
            url: 'userstatus',
            ignoreErrors
        });
    }

    public updateUser(request: IEditUserModel, userId: number, ignoreErrors?: boolean): Promise<IApiResponse<IUser>> {
        return this.apiHelper.newApiRequest<IUser>({
            data: request,
            method: 'PATCH',
            url: `users/${userId}`,
            ignoreErrors
        });
    }

    public updateCustomField(userId: number, customFieldId: number, value: string, ignoreErrors?: boolean): Promise<IApiResponse<ICustomField>> {
        return this.apiHelper.newApiRequest<ICustomField>({    
            method: 'PATCH',
            url: `users/${userId}/customfields/${customFieldId}?value=${value}`,
            ignoreErrors
        });
    }

    public setManager(userId: number, managerUserId: number, ignoreErrors?: boolean): Promise<IApiResponse<null>> {
        return this.apiHelper.newApiRequest<null>({    
            data: {
                userId: managerUserId
            },        
            method: 'POST',
            url: `user/${userId}/manager/`,
            ignoreErrors
        });
    }
}
