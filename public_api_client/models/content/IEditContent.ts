import { PageType } from './PageType';

export interface IEditContentModel {
    title: string;
    parentId: number;
    body?: string;
    culture?: string;
    isPublished?: boolean;
    isArchived?: boolean;
    pageType?: PageType;
    linkUri?: string;
    publishedDate?: Date;
    mailingListEmail?: string;
    startDate?: string;
    endDate?: string;
    isAllDay?: boolean;
    eventTypeId?: number;
    eventLocation?: string;
    scratchpadGuid?: string;
    sharedContentId?: number;
    sharedUrl?: string;
}