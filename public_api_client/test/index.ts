import ApiClient from '../client/apiClient';
import { sendApiTest, sendMultipleApiTest } from './testHelpers';
import { IGetUsersRequest } from '../client/resources/usersApi';

// Update this with your local test site info
const apiClient = new ApiClient('http://localhost/api', '***');

// Add to global scope for calling from debug console
declare global {
    interface Window { 
        apiClient: any; 
        sendApiTest: any;
        sendMultipleApiTest: any;
    }
}
window.apiClient = apiClient;
window.sendApiTest = sendApiTest;
window.sendMultipleApiTest = sendMultipleApiTest;

// Sample usage
const getUserRequest: IGetUsersRequest = {
    extraFields: ['Education']
};
apiClient.users.getUsers(getUserRequest).then( (response) => {
    if (response.success) {
        response.data.forEach( (user) => {
            console.log({
                fullName: user.fullName,
                userId: user.userId
            });
        });
    }
});


// Sample test to create a new page under parent id 7
// apiClient.content.postContent({ title: 'New api page', pageType: 'CalendarEvent', parentId: 7 }).then((response) => {
//     if (response.success) {
//         console.log(
//             response.data
//         );
//     }
// });



/* Sample calendar test cases */
// const calendarId = 109;
//sendApiTest(apiClient.calendar.getCalendar(calendarId, {pageSize: 50, startDate: '2020-01-21', endDate: '2021-06-07'}), 'getCalendar');
//sendApiTest(apiClient.calendar.getEvents(calendarId, {startIndex: 1, ownedBy: '1'}), 'getEvents');



/*Sample user API test calls */
// sendApiTest(apiClient.users.getUserByUsername('admin'));
// sendApiTest(apiClient.users.getRandomUser(null));
// sendApiTest(apiClient.users.getUsers());
// sendApiTest(apiClient.users.getUsers({userIds: [1,5], contentIds: [7,317], extraFields: ['Education'], includeInactive: true}));
// sendApiTest(apiClient.users.getUser(1, ['Education']));
// sendApiTest(apiClient.users.getProfileFields());
// sendApiTest(apiClient.users.getCurrentUser());
// sendApiTest(apiClient.users.getUserByUsername('kathy'));
// sendApiTest(apiClient.users.getRandomUser(['Education']));
// sendApiTest(apiClient.users.getUserGroups(1));
// sendApiTest(apiClient.users.getUserCustomFields(1));
// sendApiTest(apiClient.users.getUserCustomField(1, 4));
// sendApiTest(apiClient.users.getUsersActiveSessions(100));
// sendApiTest(apiClient.users.getUserState(1, 'Last.LoginDate'));
// sendApiTest(apiClient.users.getUserManager(126));
// sendApiTest(apiClient.users.getUserAlsoReportsTo(112));
// sendApiTest(apiClient.users.getUserDirectReports(1));
// sendApiTest(apiClient.users.getUserCanView(1, 142415));
// sendApiTest(apiClient.users.getUsersCanView('1,110', 142415));
// sendApiTest(apiClient.users.getUserCanEdit(1, 142415));

