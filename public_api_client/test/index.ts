import ApiClient from '../client/apiClient';
import { sendApiTest, sendMultipleApiTest } from './testHelpers';
import { IGetUsersRequest } from '../client/resources/usersApi';

// Update this with your local test site info
const apiClient = new ApiClient('http://localhost/api', 'restTokenHere');

// Add to global scope for calling from debug console
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


// Sample test to create a new page under parent id 46
// apiClient.content.postContent({ title: 'New api page', pageType: 'CalendarEvent', parentId: 46 }).then((response) => {
//     if (response.success) {
//         console.log(
//             response.data
//         );
//     }
// });

/*Sample calendar test cases*/
//sendApiTest('getCalendar', apiClient.calendar.getCalendar(109, {pageSize: 3, startDate: '2020-01-21', endDate: '2020-01-23'}));
//sendApiTest('getEvents', apiClient.calendar.getEvents(109, {startIndex: 1, ownedBy: '1'}));

/*Sample content test cases
// sendApiTest('getContent', apiClient.content.getContent(121));
// sendApiTest('getMultiContent', apiClient.content.getMultiContent([7,17,34,12]));
// sendApiTest('postContent', apiClient.content.postContent({ title: 'New api event page', pageType: 'CalendarEvent', parentId: 46 }));
// sendApiTest('patchContent', apiClient.content.patchContent(121, { title: 'new fancy card test title2' }));
// sendApiTest('postChangeContentOwner', apiClient.content.postChangeContentOwner(121, { userId: 4 }));
// sendApiTest('getContentChildren', apiClient.content.getContentChildren(121));
// sendApiTest('getContentParents', apiClient.content.getContentParents(121));
// sendApiTest('postContentTags', apiClient.content.postContentTags(121, ['freedom', 'fancy', 'chicken']));
// sendApiTest('getContentTags', apiClient.content.getContentTags(121));
// sendApiTest('postMultiContentTags', apiClient.content.postMultiContentTags([121, 8, 1636])); // broken
// sendApiTest('getMultiContentTags', apiClient.content.getMultiContentTags('3772,8,1636'));
// sendApiTest('getContentActivity', apiClient.content.getContentActivity(121, 29));
// sendApiTest('deleteContentTag', apiClient.content.deleteContentTag(3772, 29));
// sendApiTest('deleteContentTags', apiClient.content.deleteContentTags(8));
// sendApiTest('getContentPermissions', apiClient.content.getContentPermissions(121));
// sendApiTest('getContentFollowers', apiClient.content.getContentFollowers(121));
// sendApiTest('postContentFollowers', apiClient.content.postContentFollowers(121, [17,4,5]));
// sendApiTest('deleteContentFollowers', apiClient.content.deleteContentFollowers(121, { userIds : [4574537]} ));
// sendApiTest('getContentParents', apiClient.content.getContentParents(121));
// sendApiTest('getContentLikes', apiClient.content.getContentLikes(121));
// sendApiTest('postContentLike', apiClient.content.postContentLike(3772));
// sendApiTest('deleteContentLike', apiClient.content.deleteContentLike(3772));
// sendApiTest('getContentComments', apiClient.content.getContentComments(3772));
// sendApiTest('postContentClone', apiClient.content.postContentClone(3772, 3772));
// sendApiTest('getPortletContentByCulture', apiClient.content.getPortletContentByCulture(121, 'en'));

/*Sample user test cases
sendApiTest(apiClient.users.GetUserByUsername());
sendApiTest(apiClient.users.GetRandomUser());
sendApiTest(apiClient.users.GetUsers())
sendApiTest(apiClient.users.GetUsers({userId: '1,110', contentIds: '7,317', extraFields: 'Education', includeInactive: true}))
sendApiTest(apiClient.users.GetUser(1, 'Education'))
sendApiTest(apiClient.users.GetProfileFields())
sendApiTest(apiClient.users.GetCurrentUser())
sendApiTest(apiClient.users.GetUserByUsername('kathy'))
sendApiTest(apiClient.users.GetRandomUser('Education'))
sendApiTest(apiClient.users.GetUserGroups(1))
sendApiTest(apiClient.users.GetUserCustomFields(1))
sendApiTest(apiClient.users.GetUserCustomField(1, 4))
sendApiTest(apiClient.users.GetUsersActiveSessions(100))
sendApiTest(apiClient.users.GetUsersUpcomingBirthdays({daysAhead: 30, customBirthdayFieldId: 9, startDay: '2019-10-01', endDay: '2019-11-01', groupContentIds: 142428}));
sendApiTest(apiClient.users.GetUsersUpcomingBirthdays({daysAhead: 30, startDay: '2019-10-01', endDay: '2019-11-01', groupContentIds: 142428}));
sendApiTest(apiClient.users.GetUserState(1, 'Last.LoginDate'));
sendApiTest(apiClient.users.GetUserManager(126));
sendApiTest(apiClient.users.GetUserAlsoReportsTo(112));
sendApiTest(apiClient.users.GetUserDirectReports(1));
sendApiTest(apiClient.users.GetUserPhoto(1));
sendApiTest(apiClient.users.GetUserPhotoCropped({userId: 1, width: 100, height: 100}, true));
sendApiTest(apiClient.users.GetUserGroupCustomField(1, 'Expertiseskills','LanguagesSpoken'))
sendApiTest(apiClient.users.GetUsersFindCustomField('Expertiseskills', 'Education', 'PHD'))
sendApiTest(apiClient.users.GetUserCanView(1, 142415))
sendApiTest(apiClient.users.GetUsersCanView('1,110', 142415))
sendApiTest(apiClient.users.GetUserCanEdit(1, 142415))
*/
