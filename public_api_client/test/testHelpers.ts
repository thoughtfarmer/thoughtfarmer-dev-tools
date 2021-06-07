/* eslint-disable no-console */
export const sendApiTest = (apiCall: Promise<any>, name?: string) => {

    apiCall.then((response) => {
        console.log(`Success - ${response.statusCode} ${response.success} - ${name || ''}`,
            response.data);
    }).catch((error) => {
        console.warn(`Error - ${name || ''}`,
            error);
    });
    
};

export const sendMultipleApiTest = (apiCalls: Array<Promise<any>>) => {

    Promise.all(apiCalls).then((response) => {
        console.log('Success');
        console.log(response);
    }).catch((error) => {
        console.warn('Error', error);
    });

};

