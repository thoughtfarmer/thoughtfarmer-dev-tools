import { IKeyValuePair } from 'models/IKeyValuePair';

export interface ICalendarEventType {
    color?: string;
    eventTypeId?: number;
    className?: string;
    default?: boolean;
    active?: boolean;
    label?: IKeyValuePair;
}