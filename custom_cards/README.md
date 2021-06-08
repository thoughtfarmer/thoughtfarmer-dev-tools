# Custom card development tools

These tools allow you to build and deploy custom cards right from your preferred IDE. We do recommend Visual Studio Code as that is where everything has been built and tested.

## Installation

1) Install Node version 14 or higher. https://nodejs.org/en/download/
2) Install gulp-cli globally.
   - `npm install -g gulp-cli`
3) Ensure that your npm global bin folder is added to your systems PATH environment variable. Check the path by running:
   - `npm config get prefix`
4) Install yarn package manager.
   - `npm install -g yarn`
5) Clone or download this repository to your local disk.
6) Open the folder in your preferred IDE.
7) From the integrated terminal make sure you are in the `custom_cards` folder and run `yarn install`.

## Configuration

In the root `custom_cards` folder create a new file `config.json` file. Use the following as a stub for the contents:

```javascript
{
    "sites": {
        "default": {
            "baseUrl": "http://localhost",
            "restToken": "***"
        },
        "prod": {
            "baseUrl": "https://my.thoughtfarmer.com",
            "restToken": "***"
        }
    },
    "sourceMaps": true    
}
```

The `sites` property let's you manage all of the ThoughtFarmer sites you wish to deploy to. The `default` site is a special name that will be used for the main site you are working with. It will be used for all commands when no site parameter is specified. See the [site parameter](#site-parameter) section for details. Add as many sites as you need.

Update the `baseUrl` for the default site with your desired ThoughtFarmer instance URL. The `restToken` comes from the ThoughtFarmer Admin Panel --> Api Tokens admin page. You must generated one for your user. Keep the token safe as it will not be available again once generated. You can reset tokens at any time.

## Getting started

To get started quickly you can use the demo card Rich Text card. Once you have configured your default site with the API Token then simply follow these instructions:

1. Open up the integrated terminal (or any shell) and navigate to the subfolder `/custom_cards/richTextCard`.
2. Run `gulp compile`. This will create both the transpiled JavaScript and CSS files in a `/dist` folder.
3. Run `gulp create`.  
   - This will automatically create a new custom card on your ThoughtFarmer instance using the details from the `manifest.json` and the compiled code.
   - It will get the id for the custom card and create or update the `config.json` for the card.
4. Follow the instructions from the [Rich text Card Readme](richTextCard/README.md) and add a configured card to any page on your ThoughtFarmer instance.
5. Make changes to the code or styles for the card.
6. Deploy the changes using `gulp dev-deploy` (for faster deploy with no linting) or `gulp deploy` to check with ES Lint first.
7. Check the ThoughtFarmer page for your changes.

## Sourcemaps

Sourcemaps are enabled by default. There is a single flag in the root `config.json` that controls this. When enabled sourcemaps will be set to pull from your local disk in the `/dist` folder for each specific card you create.

From the browser developer tools you can then find them by going to the Sources tab, then looking for files under `file://`. All the sourcemaps will be in there for each card you deploy.

You will then be able to add breakpoints and debug your code across all your original component files.

![alt text](/shared/img/sourcemaps.png "Sourcemaps for debugging")

## Linting

ES Lint is a recommended plugin. Once you have run `yarn install` all the pre-requisites should be in place. You may also need to grant permissions to ES Lint for your workspace. To do so:

1. Go to any code file (e.g. `/custom_cards/richTextCard.tsx`)
2. Check the first line `import` statement. If there is an underline hover over it.
3. Click the lightbulb icon click it and grant permission for ES Lint either everywhere, or on the project.

![alt text](./shared/img/eslint.png "Grant permission to ES Lint")

When editing and writing code you should see all syntax and formatting issues highlighted. Hovering over them will give you the ES Lint reason it was flagged. Sometimes there may be multiple reasons as both JavaScript and TypeScript linting rules are in play.

Changes to ES Lint rules can be made in the `./eslintrc.js` file.

## Build commands

All the build commands rely on gulp. There are various commands to build, configure, lint, and even deploy custom cards right from the IDE to your remote ThoughtFarmer instance.

### Site parameter

Any command that interacts with a site (e.g. deploy, auth-test, dev-deploy) all require a `-site` parameter. If none is specified it will default to the `default` site from the `config.json`.

You can have as many sites as you require. Just update the root level `config.json` to add more sites. Additionally, every custom card has a child `config.json` that will need to store the corresponding Custom Card Ids for the sites. 

There is an alternative shortcut to simply call the name of the name of the site as a flag. This will run the command against that site if it is found in the `config.json`.

Examples:

```powershell
gulp deploy  #deploys to the default site

gulp deploy -site prod #deploys to the site labelled prod

gulp deploy -prod #shortcut syntax to deploy to the site labelled prod
```

### Card configuration

Each custom card must also have a `config.json` file in its folder in order to be deployed to a remote site. For each site you wish to deploy to it must have an entry in the sites parameter along with the id.

The id comes from the ThoughtFarmer Admin Panel --> Cards page. Each custom card has an id visible in the first column from that admin page. 

You can either create a new card from the admin interface, and update the `config.json` manually. Or you can use the `gulp create` command.

For example,

```javascript
{
    "sites": {
        "default": {
            "id": 21
        },
        "prod": {
            "id": 16
        }
    }
}
```

### gulp config

This command will create or overwrite the `config.json` file for a specific card. It is mostly used to set up an existing card that has not yet been synced with a remote ThoughtFarmer. For a new card, use the command `gulp newcard`.

### gulp newcard

This command must be run from the root `custom_cards` folder. It will initiate a series of prompts that will set
