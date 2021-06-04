
import { IPagedItems } from '../../../../ApiTools/APIClient/models/IPagedItems';
import { IApiResponse } from '../../../../ApiTools/APIClient/client/apiHelper';
import ApiClient from '../../../../ApiTools/APIClient/client/apiClient';

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

// Meant for batching the same API call and returning all results as a single array. 
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


export function subscribeActionPromises(ctx: any, actionName: string, apiCalls: Promise<any>[],
    callback: (success: boolean, data?: any) => void, unsubscribe?: () => void): () => void {

    if (unsubscribe) {
        unsubscribe();
    }

    ctx.customPortlets.addEventListener(actionName, callback);

    Promise.all(apiCalls).then((responses) => {
        const data = responses.map(response => response.data || response.body || response);
        ctx.customPortlets.fireEvent(actionName, true, data);
    }).catch((error) => {
        ctx.customPortlets.fireEvent(actionName, false, error);
    });

    return () => {
        ctx.customPortlets.removeEventListener(actionName, callback);
    };
}

declare interface IPagedRequest {
    pageNumber: number;
    pageSize: number;
}

declare interface ISimpleResponse<T> {
    success: boolean;
    data: T;
}

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

