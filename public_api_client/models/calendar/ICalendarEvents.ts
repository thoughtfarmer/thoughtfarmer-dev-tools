import { ICalendarEvent } from './ICalendarEvent';
import { ICalendarEventType } from './ICalendarEventType';

export interface ICalendarEvents {
    events?: ICalendarEvent[];
    totalEvents?: number;
    eventTypes?: ICalendarEventType[];
}