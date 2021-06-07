(function(){

    let testIds = [1,2,3];
    let testPromises = testIds.map( (userId) => apiClient.users.GetUser(userId, null , true));

    sendMultipleApiTest(testPromises);

    
})();