# ThoughtFarmer Developer Tools

This project contains 2 packages that can be used to create custom cards for ThoughtFarmer.

## Custom cards tools

This package allows you to develop custom cards using TypeScript, JavaScript, Sass and HTML. It supports the following:

- React components using jsx or tsx format.
- Rollup of components and js files using import syntax.
- ES6 syntax and features. All code will be transpiled using Babel.
- Sass for styling across multiple files using import syntax.
- Manage deployment of built code to multiple instances of ThoughtFarmer.
- ESLint tool integration.

For details and configuration instructions please see the [Custom Card Tools Readme](/custom_cards/README.md).

## Public API TypeScript Client

This package is a partial implementation for a TypeScript client for interacting with the ThoughtFarmer API. It is easily extensible to support new methods as they are needed. The most common methods and models are already available.

For details see the [Public API Client Readme](/public_api_client/README.md).

## Code documentation and samples

For details on the code involved in creating cards please see our documentation about using the [Custom card API](https://helpdesk.thoughtfarmer.com/hc/en-us/articles/1500000981081-Custom-card-API) and [Communicating between custom cards with events](https://helpdesk.thoughtfarmer.com/hc/en-us/articles/1500000981161-Communicating-between-custom-cards-with-events).

Additionally, see the [Custom Card helpers and utilities](./custom_cards/shared/README.md) documentation for details the FormFlow API and other concepts once you are up and running and ready to build custom cards.

## Installation and requirements

Both packagages require the following to be setup first.

1) Install Node version 14 or higher. https://nodejs.org/en/download/
2) Install gulp-cli globally.
   - `npm install -g gulp-cli`
3) Ensure that your npm global bin folder is added to your systems PATH environment variable. Check the path by running:
   - `npm config get prefix`
   - Verify gulp is available by running `gulp --version`.
4) Install yarn package manager.
   - `npm install -g yarn`
