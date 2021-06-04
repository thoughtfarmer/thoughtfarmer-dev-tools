import { AutoCompleteItemType } from './enums/AutoCompleteItemType';

export interface IAutoCompleteItem {
    itemId: number;
    name: string;
    itemType: AutoCompleteItemType;
}