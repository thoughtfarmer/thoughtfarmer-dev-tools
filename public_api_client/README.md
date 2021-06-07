# ThoughtFarmer API Client - TypeScript

This package is a partial implementation for a TypeScript API client for accessing and working with the ThoughtFarmer Public API. It does not represent all endpoints and models. Endpoints and data models can be added as required. All pull requests are welcome.

## Developer Instructions

This package includes `lite-server` so that you can test the API calls right from the browser. Then subsequent changes just require a `gulp build` and the file watch will automatically trigger a reload. This will require that the ThoughtFarmer instance you are testing with has CORS enabled for this local server. 

**Recommended**: If you are developing custom cards you can simply test the API Client directly in code using breakpoints in the sourcemaps after deploying your card to ThoughtFarmer. No need for additional configuration or testing described in the following instructions.

To set this up you must do the following:

 1. On-premise clients can Open SQL MS and run the following against your local dev instance
    - `update ConfigSetting Set Value = 'http://localhost:8000' where Name = 'api.cors.allowed.origins'`
    - recycle the app pool
 2. Cloud clients can contact ThoughtFarmer support to assist in configuring CORS.
 3. Open up Visual Studio Code and open the folder `/public_api_client/`
    - It is recommended to open this project separately so all the debugging and tasj integrations with Visual Studio Code will work.
    - If you want to work on them side by side in the same instance of Visual Studio code then you can do so, but must build and launch manually from the command line.
 4. Crack open the integrated terminal and run `yarn install` 
 5. Update `./public_api_client/test/index.ts`. On the line that news up the `apiClient` use the URL, and APIToken for your own test site
 6. Hit F5. If all is working it should build the test app, open Chrome to http://localhost:8000
 7. The test scripts from `index.ts` should be running and results in the console window
 8. In the debug console run `sendApiTest(apiClient.users.GetCurrentUser())`
 9. Verify you see the request and response in the console window

## Developer tips

Once you have hit F5 and have the http://localhost:8000 running you can just leave it there. Make changes to the code then just run `gulp build` from the terminal OR hit `CTRL+SHIFT+B`. This brings up the build command window and VS Code should auto detect the gulp build task. Rebuilds will trigger the browser to reload automatically with the fresh code.

Use the console window, or the `index.ts` to test code. Alternatively, you can create a snippet in Chrome Dev tools. Use the `snippet.js` as a starting point. It wraps all code in a self executing function. If you want to rerun the snippet then all variables must be in block scope or you will get errors.

## Testing

Use the `index.ts` as the means to test that the TypeScript types and auto-complete are working as expected.

You can use the `index.ts`, snippets, or the console debugger in chrome to test actual API calls and ensure the request and response work as expected.

### Helper methods

You can just test all calls directly using:

```typescript
apiClient.users.getCurrentUser().then(response => {
    console.log(response);
}).catch(error => {
    console.warn(error);
});
```

However, that gets pretty repetitive and cumbersome. There are 2 helper methods that do exactly this to assist testing. There usage is as follows:

#### Send a single API call

```typescript
// Takes a promise and outputs the response to the console.
// Optional name for logging. Helpful when you are making many calls and want to differentiate them in the console.
// Shows rejections as warnings and logs either success or fail.
sendApiTest(apiCall: Promise<any>, name?: string)

// Example usage:

sendApiTest(apiClient.users.getCurrentUser());

```

#### Sending multiple calls

```typescript
// Takes an array of Promises and outputs the responses to the console.
// Shows rejections as warnings and logs either success or fail.
sendMultipleApiTest(apiCalls: Promise<any>[])

// Example usage (extremely contrived, but you get the idea):
let testIds = [23,45,67,123,435,6665,876];
let testPromises = testIds.map( (userId) => apiClient.users.GetUser(userId, ['Floor', 'Role'] , true));

sendMultipleApiTest(testPromises);

```
