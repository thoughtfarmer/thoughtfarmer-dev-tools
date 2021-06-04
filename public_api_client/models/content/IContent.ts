import { IKeyValuePair } from '../IKeyValuePair';
import { ISimpleUser } from '../user/ISimpleUser';
import { IPageHierarchyItem } from './IPageHierarchyItem';

export interface IContent {
    contentId?: number;
    title?: IKeyValuePair[];
    abbreviatedTitle?: IKeyValuePair[];
    summary?: IKeyValuePair[];
    body?: IKeyValuePair[];
    dateModified?: Date;
    datePosted?: Date;
    datePublished?: Date;
    modifiedId?: number;
    ownerId?: number;
    creatorId?: number;
    createdBy?: ISimpleUser;
    modifiedBy?: ISimpleUser;
    parentId?: number;
    treePath?: string;
    treePathItems?: IPageHierarchyItem[];
    treePathText?: string;
    permissionIsEdit?: boolean;
    permissionIsView?: boolean;
    isPublished?: boolean;
    isPrivate?: boolean;
    isArchived?: boolean;
    isUpdated?: boolean;
    isNew?: boolean;
    isFuture?: boolean;
    allowFiles?: boolean;
    pageType?: string;
    lastModifiedBy?: string;
    mentionedUsers?: ISimpleUser[];
    url?: string;
}

