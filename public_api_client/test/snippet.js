(function(){

    let testIds = [9999999];
    let testPromises = testIds.map( (userId) => apiClient.users.GetUser(userId, ['Floor', 'Role'] , true));

    sendMultipleApiTest(testPromises);

    
})();