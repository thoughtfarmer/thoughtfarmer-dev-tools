module.exports = {
    "rules": {
        "indent": [2, 4, { "SwitchCase": 1 }],
        "quotes": [2, "single"],
        "semi": [2, "always"],
        "no-unused-vars": [2, {"vars": "local", "args": "after-used", "argsIgnorePattern": "^_"}], /*argIgnorePattern allows for the arg to be in the def but identifies it as not being used*/
        "comma-dangle": 0,
        "eqeqeq": [2, "smart"],
        "curly": [2],
        "brace-style": [2],
        "no-console": [1],
        "no-eval": [1],
        "no-undef": [2],
        "no-self-assign": [2, {"props": true}],
        "react/jsx-uses-vars": "warn",
        "keyword-spacing": "warn",
        "arrow-spacing": "warn",
        "space-before-blocks": "warn",
        "no-invalid-this" : 0,
        "no-case-declarations": 0,
        "babel/no-invalid-this": 1,       
        "no-prototype-builtins": "warn",       
        "react-hooks/rules-of-hooks": "error",
        "react-hooks/exhaustive-deps": "warn"
    },
    "env": {
        "es6": true,
        "browser": true
    },
    "extends": ["eslint:recommended"],
    "parser" : "@typescript-eslint/parser",
    "plugins": ["babel", "react", "@typescript-eslint", "react-hooks"],
    "parserOptions": {
        "project": "./tsconfig.json",
        "ecmaVersion": 2018,       
        "sourceType": "module",
        "ecmaFeatures": {
            "jsx": true
        },
        "requireConfigFile": false,
        tsconfigRootDir: __dirname,      
    },
    "overrides": [{
        // for files matching this pattern
        "files": ["*.ts", "*.tsx"],
        "extends": ["plugin:@typescript-eslint/eslint-recommended", "plugin:@typescript-eslint/recommended"],
        "rules": {
            "@typescript-eslint/explicit-function-return-type": 0,
            "@typescript-eslint/interface-name-prefix": 0,
            "@typescript-eslint/no-explicit-any": 0,
            "@typescript-eslint/no-use-before-define": "warn",
            "@typescript-eslint/member-delimiter-style": "warn",
            "@typescript-eslint/explicit-module-boundary-types": "off",
            "@typescript-eslint/no-unused-vars": ["error", { "argsIgnorePattern": "^_" }]
        }
    }],
    "globals": {
        "$": true,     
        "require": true,
        "process": true,
        "React": true,
        "ReactDOM": true,
        "ActiveXObject": true,
        "jQuery": true,
        "prettyPrint": true,
        "CKEDITOR": true,     
        "tf": true,       
        "console": true,    
        "_": true, //lodash       
        "gapi": true, //google api in platform.js  
        "moment": true,
        "PropTypes": true,
        "__dirname": true,

       
        //ThoughtFarmer core react components       
        "LoadingIndicator": true,
        "Button": true,
        "LinkButton": true,
        "AddPageBtn": true,
        "LikeBtn": true,       
        "AutoCompleteInput": true,
        "AutoCompleteUsersInput": true,
        "AutoCompleteSecurityItemsInput": true,
        "PageTypeIcon": true,
        "LinkIcon": true,
        "NewsListItem": true,
        "DatePicker": true,
        "CollapsableContainer": true,     
        "RichtextField": true,      
        "TimePicker": true,
        "ToolTipElement": true,      
        "TabbedContainer": true,       
        "WarningMessage": true,
        "Tooltip": true,
        "ModalPanel": true,
        "CloseBtn": true,
        "ErrorMessage": true,
        "ButtonLoadingIndicator": true,

        // ThoughtFarmer custom card globals
        "tfc": true,
        "ctx": true,
        "replaceView": true,
        "portletId": true,
        "portletConfig": true,
        "portletConfigurationId": true,
        "portletCss": true,
        "portletServerResponse": true,
        "google": true,
        "Matomo": true
    }
}
