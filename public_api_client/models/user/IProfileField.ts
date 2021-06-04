import { ICustomFieldType } from './ICustomFieldType';
import { IProfileDetailsInternalFields } from './IProfileDetailsInternalFields';

export interface IProfileFieldResult {
    fields: IProfileField[];
}

export interface IProfileField {
    label?: string;
    fieldName?: string;
    fieldMappingName?: string;
    customFieldId?: number;
    customFieldGroupId?: number;
    groupLabel?: string;
    customFieldType?: ICustomFieldType;
    isSystemField?: boolean;
    internalField?: IProfileDetailsInternalFields;
}


