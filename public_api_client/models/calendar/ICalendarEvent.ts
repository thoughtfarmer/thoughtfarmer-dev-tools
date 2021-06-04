import { IDatePortletModel } from './IDatePortletModel';

export interface ICalendarEvent {
    contentId?: number;
    title?: string;
    url?: string;
    startDate?: IDatePortletModel;
    endDate?: IDatePortletModel;
    isAllDay?: boolean;
    eventTypeId?: number;
    when?: string;
    isRepeating?: boolean;
    isMultiDay?: boolean;
    eventLocation?: string;
}