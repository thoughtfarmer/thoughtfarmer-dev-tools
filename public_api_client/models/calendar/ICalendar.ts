import { IContent } from '../content/IContent';
import { ICalendarEvent } from './ICalendarEvent';
import { ICalendarEventType } from './ICalendarEventType';

export interface ICalendar extends IContent {
    events?: ICalendarEvent[];
    totalEvents?: number;
    eventTypes?: ICalendarEventType[];
}