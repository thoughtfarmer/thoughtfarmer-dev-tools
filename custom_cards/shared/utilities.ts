import { IUser } from '../../ApiTools/APIClient/models/user/IUser';

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
        console.log(`Error parsing array for custom card configuration. Value: ${JSON.stringify(array)}`);
        return defaultValue;
    }
    return array;
}


/// Will parse a string config object and return default or expected types
/// params should be an array of single value of an object with {key, type, defaultValue}
/// key: the key to find in the config object
/// type: the type to check and\or convert to. Supports int, float, string, datetime, boolean, arrayString, arrayInt, arrayFloat. All other types are returned as they are parsed.
/// defaultValue: if anything fails the default value will be returned.
export function parseConfig(config, params, throwOnError?: boolean): any {

    let configObject = {};
    const returnObject = {};

    if (config) {
        try {
            configObject = JSON.parse(config);
        } catch (e) {
            // check for legacy format 
            config = config.replace(/(\w+)\s?:/g, '"$1":');

            try {
                configObject = JSON.parse(config);
            } catch (e) {
                if (throwOnError) {
                    throw e;
                }
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
    if (!Array.isArray(params)) {
        returnObject[params.key] = getValue(configObject[params.key], params.type, params.defaultValue);
    } else {
        params.forEach(param => {
            returnObject[param.key] = getValue(configObject[param.key], param.type, param.defaultValue);
        });
    }

    return returnObject;
}

export function formatUtcDateFromString(dateString, format) {
    const date = moment.utc(new Date(dateString)).locale(ctx.session.culture).utcOffset(ctx.session.utcOffset);
    if (format) {
        return date.format(format);
    }
    return date.toLocaleString();
}

export interface IDateRange {
    startDate: string;
    endDate: string;
}

export function parseDateRange(dateRange: string): IDateRange {
    let startDate;
    let endDate;

    switch (dateRange) {
        case 'currentmonth':
            startDate = moment.utc().startOf('month');
            endDate = moment.utc().endOf('month');
            break;
        case 'last2weeks':
            startDate = moment.utc().subtract(14, 'days').startOf('day');
            endDate = moment.utc();
            break;
        default:
            break;
    }    

    return {
        startDate: startDate ? startDate.format('YYYY-MM-DD HH:mm:ss.SSS') : null,
        endDate: endDate ? endDate.format('YYYY-MM-DD HH:mm:ss.SSS') : null
    };
}

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