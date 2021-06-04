import { IContent } from './IContent';

export interface IGroup extends IContent {
    groupTypeId?: number;
    groupId?: number;
}