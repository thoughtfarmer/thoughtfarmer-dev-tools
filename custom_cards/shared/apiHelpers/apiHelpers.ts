
import { IPagedItems } from '../../../public_api_client/models/IPagedItems';
import { IApiResponse } from '../../../public_api_client/client/apiHelper';
import ApiClient from '../../../public_api_client//client/apiClient';

/**
 * Helper function that will tie Promises to Actions by name. When the Promise completes the Action will be fired using the ThoughtFarmer Flux dispatcher. 
 * All components listening for the action will be notified.
 * @example 
 * const getContent = this._apiClient.content.getContent(this.props.sourceId);
 * firePromise(ctx, `getContentAction_${customPortletId}`, getContent);
 * @param  {any} ctx - The ThoughtFarmer ctx object available globally in all cards
 * @param  {string} actionName - The name of the action. Keep these unique per card instance, otherwise, multiple cards on the same page may inadvertently call each other's listeners.
 * @param  {Promise<any>|Promise<any>[]} apiCall - The single Promise or array of Promises you wish to fire off. In reality, all instantiated Promises will have been fired off by the time they get here. However, their responses may not be ready yet.  
 * @param  {any} arg1? - optional additional argument that will be passed along to all listeners
 * @param  {any} arg2? - optional additional argument that will be passed along to all listeners
 */
export function firePromise(ctx: any, actionName: string, apiCall: Promise<any> | Promise<any>[], arg1?: any, arg2?: any) {    
    if (Array.isArray(apiCall)) {
        Promise.all(apiCall).then((responses) => {
            const data = responses.map(response => response.data || response.body || response);
            ctx.customPortlets.fireEvent(actionName, true, data, arg1, arg2);
        }).catch((error) => {
            ctx.customPortlets.fireEvent(actionName, false, error, arg1, arg2);
        });
    } else {
        apiCall.then( (response) => {
            ctx.customPortlets.fireEvent(actionName, true, response.data || response.body || response, arg1, arg2);
        }).catch( (error) => {
            ctx.customPortlets.fireEvent(actionName, false, error, arg1, arg2);
        });
    }    
}

/**
 * Helper function that will tie Promises with the same response type to Actions by name. When all the Promises complete, the data will be concatenated into a single response array. Then the Action will be fired using the ThoughtFarmer Flux dispatcher. 
 * All components listening for the action will be notified.
 * @example 
 * let batch = uniqueLeaderUserIds.splice(0, 100);
 * const promises = [];
 * do {
 *     promises.push(this._apiClient.users.getUsers({
 *         userIds: batch
 *     }));
 *     batch = uniqueLeaderUserIds.splice(0, 100);
 * } while (batch.length);
 *
 * fireBatchPromises(ctx, this._loadUsersAction, promises);
 * @param  {any} ctx - The ThoughtFarmer ctx object available globally in all cards
 * @param  {string} actionName - The name of the action. Keep these unique per card instance, otherwise, multiple cards on the same page may inadvertently call each other's listeners.
 * @param  {Promise<any>|Promise<any>[]} apiCall - An array of Promises with responses that should all be the same type. All results will be concatenated into a single array.
 * @param  {any} arg1? - optional additional argument that will be passed along to all listeners
 * @param  {any} arg2? - optional additional argument that will be passed along to all listeners
 */
export function fireBatchPromises(ctx: any, actionName: string, apiCall: Promise<any>[], arg1?: any, arg2?: any) {
    Promise.all(apiCall).then((responses) => {       
        const data = responses.reduce((a, b) => {
            return a.concat(b.data || b.body || b);
        }, []);
        ctx.customPortlets.fireEvent(actionName, true, data, arg1, arg2);
    }).catch((error) => {
        ctx.customPortlets.fireEvent(actionName, false, error, arg1, arg2);
    });
}

declare interface IPagedRequest {
    pageNumber: number;
    pageSize: number;
}

declare interface ISimpleResponse<T> {
    success: boolean;
    data: T;
}
/**
 * For any public API call that returns IPagedItems\<T\> this call will generate all of the Promises to fetch every page. It will then return all responses as a single array once they are all complete. 
 * @example
 * const request: IMentionReportRequest = {
 *     startDate,
 *     endDate,
 *     parentContentIds: this.props.coreValueContentIds,
 *     pageSize: 1000, 
 *     pageNumber: 0,
 *     pageTypes: ['ShoutOut']
 * };
 * 
 * // There may be more than 1000 items total. To calculate all the Promises required we use getAllPagedItemsPromise
 * const getAll = getAllPagedItemsPromise<IMentionReportItem>(this._apiClient, this._apiClient.mention.getMentionReport, request);
 * firePromise(ctx, this._loadReportAction, getAll);               
 * @param  {ApiClient} apiInstance - The instance of the ApiClient you are using. Used to make additional pages calls if required.
 * @param  {(request:Partial<IPagedRequest>)=>Promise<IApiResponse<IPagedItems<T>>>} apiCall - The paged API call function you want to use. DO NOT call the function. This is simply the function 
 * @param  {Partial<IPagedRequest>} request
 * @returns Promise
 */
export function getAllPagedItemsPromise<T>(apiInstance: ApiClient, apiCall: (request: Partial<IPagedRequest>) => Promise<IApiResponse<IPagedItems<T>>>, request: Partial<IPagedRequest>): Promise<ISimpleResponse<T[]>> {

    return apiCall.call(apiInstance, request).then((response) => {
        if (!response.success) {
            return Promise.reject(response);
        }
        if (response.data.hasMore) {
            const items: T[] = response.data.items;
            const promises: Promise<any>[] = [];
            const pageSize = response.data.pageSize;
            const totalItems = response.data.totalItems;
            let pageNumber = response.data.pageNumber;
            while ((pageNumber + 1) * pageSize < totalItems) {
                pageNumber++;
                request.pageNumber = pageNumber;
                promises.push(apiCall.call(apiInstance, request));
            }

            return new Promise((resolve, reject) => {
                Promise.all(promises).then((responses) => {
                    const flattenedResponses = responses.reduce((a, b) => {
                        return a.concat(b.data.items);
                    }, items);
                    return resolve({
                        success: true,
                        data: flattenedResponses
                    });
                }).catch( (reason) => {
                    reject(reason);
                });
            });
        } else {
            return Promise.resolve({
                success: true,
                data: response.data.items
            });
        }
    });    
}

