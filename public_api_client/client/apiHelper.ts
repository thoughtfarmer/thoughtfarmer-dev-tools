export interface IApiRequest {
    url: string;
    data?: object;
    method?: string;
    ignoreErrors?: boolean;
}

export interface IApiFormRequest {
    url: string;
    data?: FormData;
    ignoreErrors?: boolean;
}

export interface IApiResponse<T> {
    success: boolean;
    statusCode: number;
    data: T;
    rawResponse: string;
    xhr: XMLHttpRequest;
}

export class ApiHelper {

    private apiRootUrl: string;
    private apiToken: string;

    private impersonateToken: string;
    private impersonateEnabled = false;

    constructor(apiRootUrl?: string, apiToken?: string) {
        this.apiRootUrl = apiRootUrl;
        this.apiToken = apiToken;
    }

    public newApiFormRequest<T>(request: IApiFormRequest): Promise<IApiResponse<T>> {

        const xhr = new XMLHttpRequest();
        const promise = this.getEventListenerPromise<T>(request, xhr);
        xhr.open('POST', `${this.apiRootUrl}/${request.url}`, true);
        this.setTfAuthorization(xhr);
        if (tf && tf.core) {
            xhr.setRequestHeader(tf.core.Headers.CSRF_TOKEN, tf.core.getCsrfToken(ctx));
        }
        xhr.send(request.data);
        return promise;

    }

    public newApiRequest<T>(request: IApiRequest): Promise<IApiResponse<T>> {
        
        let requestData = null;

        if (!request.method) {
            request.method = 'GET';
        }

        if (typeof (request.data) === 'object' && request.data != null && Object.keys(request.data).length !== 0) {
            if (request.method !== 'GET') {
                requestData = JSON.stringify(request.data);
            } else {
                const queryStringToken = request.url.indexOf('?') > -1 ? '&' : '?';
                request.url = request.url + queryStringToken + this.serialize(request.data);
                requestData = null; // for GETs with data, we serialize and add as querystring
            }
        }
        
        const xhr = new XMLHttpRequest();
        const promise = this.getEventListenerPromise<T>(request, xhr);
        xhr.open(request.method, `${this.apiRootUrl}/${request.url}`, true);
        this.setTfAuthorization(xhr);       
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(requestData);
        return promise;

    }

    private setTfAuthorization(xhr: XMLHttpRequest) {
        if (this.apiToken || (this.impersonateEnabled && this.impersonateToken)) {
            xhr.setRequestHeader('Authorization', this.impersonateEnabled ? this.impersonateToken : this.apiToken);
        }        
    }

    private getEventListenerPromise<T>(request: IApiRequest | IApiFormRequest, xhr: XMLHttpRequest) {

        return new Promise<IApiResponse<T>>((resolve, reject) => {
            xhr.addEventListener('load', () => {
                const response: IApiResponse<T> = {
                    success: (xhr.status >= 200) && (xhr.status <= 206),
                    statusCode: xhr.status,
                    data: this.tryParseResponse(xhr.responseText),
                    rawResponse: xhr.responseText,
                    xhr
                };
                if (!response.success && !request.ignoreErrors) {
                    reject(response);
                } else {
                    resolve(response);
                }
            });

            xhr.addEventListener('error', () => {
                const response: IApiResponse<T> = {
                    success: false,
                    statusCode: xhr.status,
                    data: null,
                    rawResponse: xhr.responseText,
                    xhr
                };
                if (request.ignoreErrors) {
                    resolve(response);
                } else {
                    reject(response);
                }
            });

        });
    }

    private tryParseResponse<T>(response: string): T {
        let parsed: T = null;
        try {
            parsed = JSON.parse(response);
        } catch (e) { /*do nothing*/ }
        return parsed;
    }

    private serialize(obj: object) {
        const segments = [];
        for (const p in obj) {
            // eslint-disable-next-line no-prototype-builtins
            if (obj.hasOwnProperty(p) && obj[p] !== undefined && obj[p] !== null) {
                segments.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
            }
        }
        return segments.join('&');
    }

}