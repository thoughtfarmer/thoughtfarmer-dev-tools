import { IKeyValuePair } from '../IKeyValuePair';

export interface ICustomField {
    customFieldId?: number;
    type?: string;
    name?: string;
    value?: any;
    text?: string;
    editable?: boolean;
    label?: IKeyValuePair[];
}
