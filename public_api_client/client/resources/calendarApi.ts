import { buildQueryString } from '../../helpers/utility';
import { IApiResponse, ApiHelper } from '../apiHelper';
import { ICalendar } from '../../models/calendar/ICalendar';
import { ICalendarEvents } from '../../models/calendar/ICalendarEvents';
import { IGetCalendarQueryParams } from '../../models/calendar/IGetCalendarQueryParams';
import IEditContent from '../../models/content/IEditContent';

export default class CalendarApi {
    private apiHelper: ApiHelper;

    constructor(apiHelper: ApiHelper) {
        this.apiHelper = apiHelper;
    }

    public getCalendar(contentId: number, queryParams: IGetCalendarQueryParams, ignoreErrors?: boolean): Promise<IApiResponse<ICalendar>> {
        const queryString = buildQueryString(queryParams);
        return this.apiHelper.newApiRequest<ICalendar>({
            url: `calendar/${contentId}?${queryString}`,
            ignoreErrors
        });
    }

    public getEvents(contentId: number, queryParams: IGetCalendarQueryParams, ignoreErrors?: boolean): Promise<IApiResponse<ICalendarEvents[]>> {
        const queryString = buildQueryString(queryParams);
        return this.apiHelper.newApiRequest<ICalendarEvents[]>({
            url: `calendar/${contentId}/events?${queryString}`,
            ignoreErrors
        });
    }

    public createICalEvent(data: FormData, ignoreErrors?: boolean): Promise<IApiResponse<IEditContent>> {
        return this.apiHelper.newApiFormRequest<IEditContent>({
            url: 'calendar/ical',
            data,
            ignoreErrors
        });
    }

}       