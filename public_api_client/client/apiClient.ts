import { ApiHelper } from './apiHelper';
import UsersApi from './resources/usersApi';
import ContentApi from './resources/contentApi';
import FeaturedImageApi from './resources/featuredImageApi';
import CardDataApi from './resources/cardDataApi';
import CalendarApi from './resources/calendarApi';
import StatsApi from './resources/statsApi';
import MentionApi from './resources/mentionApi';
import SearchApi from './resources/searchApi';
import JwtApi from './resources/jwtApi';
import NewsApi from './resources/newsApi';
import PermissionsApi from './resources/permissionsApi';
import ExcelApi from './resources/excelApi';
import NotificationsApi from './resources/notificationsApi';
import SecurityGroupApi from './resources/securityGroupApi';
import GroupApi from './resources/groupApi';

export default class ApiClient {

    public apiHelper: ApiHelper;
    public users: UsersApi;
    public content: ContentApi;
    public featuredImage: FeaturedImageApi;
    public cardData: CardDataApi;
    public calendar: CalendarApi;
    public stats: StatsApi;
    public mention: MentionApi;
    public search: SearchApi;
    public jwt: JwtApi;
    public newsfeed: NewsApi;
    public permissions: PermissionsApi;
    public excel: ExcelApi;
    public notifications: NotificationsApi;
    public securityGroup: SecurityGroupApi;
    public group: GroupApi;

    constructor(apiRootUrl?: string, apiToken?: string) {
        if (!apiRootUrl) {
            apiRootUrl = `${window.location.origin}/api`;
        }

        this.apiHelper = new ApiHelper(apiRootUrl, apiToken);
        this.users = new UsersApi(this.apiHelper);
        this.content = new ContentApi(this.apiHelper);
        this.featuredImage = new FeaturedImageApi(this.apiHelper);
        this.cardData = new CardDataApi(this.apiHelper);
        this.calendar = new CalendarApi(this.apiHelper);
        this.stats = new StatsApi(this.apiHelper);
        this.mention = new MentionApi(this.apiHelper);
        this.search = new SearchApi(this.apiHelper);
        this.jwt = new JwtApi(this.apiHelper);
        this.newsfeed = new NewsApi(this.apiHelper);
        this.permissions = new PermissionsApi(this.apiHelper);
        this.excel = new ExcelApi(this.apiHelper);
        this.notifications = new NotificationsApi(this.apiHelper);
        this.securityGroup = new SecurityGroupApi(this.apiHelper);
        this.group = new GroupApi(this.apiHelper);
    }

}
