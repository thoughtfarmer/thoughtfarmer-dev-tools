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

The root of the custom_cards package contains a `config.json` file that looks like this:

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

## Getting started

To get started quickly you can use the demo card Rich Text card. 


## Build commands



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