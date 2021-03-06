/**
 * ThoughtFarmer FormFlow API
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: v1
 *
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
import * as models from './models';
export interface ApiFormField {
    fieldId?: number;
    parentSectionId?: number;
    parentFieldId?: number;
    fieldType?: string;
    sortOrder?: number;
    label?: Array<models.StringStringKeyValuePair>;
    helpText?: Array<models.StringStringKeyValuePair>;
    isRequired?: boolean;
    isDeleted?: boolean;
    hasOtherOption?: boolean;
    options?: Array<models.ApiFormFieldOption>;
    defaultValue?: string;
    maxLength?: number;
    children?: Array<models.ApiFormField>;
    additionalConfig?: {
        [key: string]: object;
    };
}
