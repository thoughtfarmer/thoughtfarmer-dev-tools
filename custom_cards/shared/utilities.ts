import { IUser } from '../../public_api_client/models/user/IUser';

/**
 * This function will return a randomly generated guid. Ideal for using when populating scratchpads or unique keys.
 */
export function guid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        const r = Math.random() * 16 | 0,
            // eslint-disable-next-line eqeqeq
            v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

function parseArray(array, defaultValue, type) {
    let mapFunction: any = String;
    if (type === 'int') {
        mapFunction = parseInt;
    } else if (type === 'float') {
        mapFunction = parseFloat;
    } 

    try {
        if (typeof (array) === 'string') {
            array = array.split(',');
            array = array.map(v => mapFunction(v.trim()));
        } else if (type === 'object') {
            array = array.map(v => typeof v === 'object' && v !== null && v);
            array.filter(v => v !== 'undefined');
        } else if (Array.isArray(array)) {
            array = array.map(v => mapFunction(typeof (v) === 'string' ? v.trim() : v));
        }
    } catch (_e) {
        // eslint-disable-next-line no-console
        console.log(`Error parsing array for custom card configuration. Value: ${JSON.stringify(array)}`);
        return defaultValue;
    }
    return array;
}

export interface IConfigurtationItem {
    key: string;
    type: string;
    defaultValue: any;
}

/**
 * Will parse a string config object and return default or expected types. Params is of type `IConfigurationItem`: 
 *   - **key**: the key to find in the config object
 *   - **type**: the type to check and\or convert to. Supports int, float, string, datetime, boolean, arrayString, arrayInt, arrayFloat, arrayObject. All other types are returned as they are parsed.
 *   - **defaultValue**: if anything fails the default value will be returned.
 * @example
 * const params: IConfigurtationItem[] = [
 *     { key: 'sourceId', type: 'int', defaultValue: 0 },
 *     { key: 'showTitle', type: 'boolean', defaultValue: false },
 *     { key: 'contentIds', type: 'arrayInt', defaultValue: [] },
 *     { key: 'icon', type: 'string', defaultValue: null }
 * ];
 * 
 * const config = parseConfig(portletConfig, params);
 * replaceView(<MyComponent {...config} />);
 * @param  {any} cardConfiguration - This is the card configuration object. Typically just pass in the special global portletConfig to get the user configured object for an instance of a custom card.
 * @param  {any} params - This is the default params object. 
 * @param  {boolean} throwOnError? - Normally this function will simply fall back to the default params object for any parsing errors. Set this to true to throw an exception on parsing errors.
 * @returns any
 */
export function parseConfig(cardConfiguration: any, params: IConfigurtationItem[], throwOnError?: boolean): any {

    let configObject = {};
    const returnObject = {};

    if (cardConfiguration) {
        try {
            configObject = JSON.parse(cardConfiguration);
        } catch (e) {
            // check for legacy format 
            cardConfiguration = cardConfiguration.replace(/(\w+)\s?:/g, '"$1":');

            try {
                configObject = JSON.parse(cardConfiguration);
            } catch (e) {
                if (throwOnError) {
                    throw e;
                }
                // eslint-disable-next-line no-console
                console.log(e);
            }
        }
    }

    const getValue = function (value, type, defaultValue) {
        if (typeof (value) === 'undefined' || value === null) {
            return defaultValue;
        }
        switch (type) {
            case 'int':
                value = parseInt(value);
                return isNaN(value) ? defaultValue : value;
            case 'float':
                value = parseFloat(value);
                return isNaN(value) ? defaultValue : value;
            case 'string':
                return value.toString();
            case 'boolean':
            case 'bool':
                return !!value;
            case 'datetime':
                value = new Date(value);
                return isNaN(value.getTime()) ? defaultValue : value;
            case 'arrayString':
                return parseArray(value, defaultValue, 'string');
            case 'arrayInt':
                return parseArray(value, defaultValue, 'int');
            case 'arrayFloat':
                return parseArray(value, defaultValue, 'float');
            case 'arrayObject':
                return parseArray(value, defaultValue, 'object');
            default:
                return value;
        }
    };

    params.forEach(param => {
        returnObject[param.key] = getValue(configObject[param.key], param.type, param.defaultValue);
    });

    return returnObject;
}
/**
 * Will convert a UTC date time string to localized date string using the current ThoughtFarmer user's culture and UTC offset settings.
 * @param  {string} dateString - A UTC date string
 * @param  {string} format? - Optional to override the default toLocaleString format. Use a format of your choosing (e.g. "YYYY-MM-DD HH:mm").
 */
export function formatUtcDateFromString(dateString: string, format?: string) {
    const date = moment.utc(new Date(dateString)).locale(ctx.session.culture).utcOffset(ctx.session.utcOffset);
    if (format) {
        return date.format(format);
    }
    return date.toLocaleString();
}

/**
 * Sorts and array of IUser by last name, then by first name.
 * @param  {IUser[]} users - Array of users to sort.
 * @returns IUser[] - The sorted array of users.
 */
export function sortUsers(users: IUser[]): IUser[] {
    return users.sort((a: IUser, b: IUser) => {
        if (a.lastName > b.lastName) {
            return 1;
        } else if (a.lastName < b.lastName) { 
            return -1;
        }    
        
        if (a.firstName < b.firstName) { 
            return -1;
        } else if (a.firstName > b.firstName) {
            return 1;
        } else { 
            return 0;
        }
    });
}