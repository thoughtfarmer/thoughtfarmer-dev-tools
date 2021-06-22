/* eslint-disable @typescript-eslint/no-var-requires */
const gulp = require('gulp');
const rollup = require('rollup');
const fs = require('fs');
const commonjs = require('@rollup/plugin-commonjs');
const nodeResolve = require('@rollup/plugin-node-resolve').default;
const file = require('gulp-file');
const sourcemaps = require('gulp-sourcemaps');
const rollupSourcemaps = require('rollup-plugin-sourcemaps');
const babel = require('@rollup/plugin-babel').default;
const plumber = require('gulp-plumber');
const fetch = require('node-fetch');
// eslint-disable-next-line no-unused-vars
const colors = require('colors');
const log = require('fancy-log');
const replace = require('@rollup/plugin-replace');
const envify = require('process-envify');
const gulpif = require('gulp-if');
const scss = require('rollup-plugin-scss');
const sass = require('gulp-dart-sass');
sass.compiler = require('sass');
const moduleImporter = require('sass-module-importer');
const path = require('path');
const gulpReplace = require('gulp-replace');
const inquirer = require('inquirer');
const eslint = require('gulp-eslint');
const tfSassReplace = require('./tf-sass-variable-replace.js');

// Replace node variables in included node_module plugins (if any)
const NODE_ENV = process.env.NODE_ENV || 'development';
const DRAGGABLE_DEBUG = process.env.DRAGGABLE_DEBUG || 'production';
const env = {
    NODE_ENV,
    DRAGGABLE_DEBUG
};

const buildConfig = getConfigOrNull('./config.json');

// fetch command line arguments
const arg = (argList => {

    const arg = {};
    let a, opt, thisOpt, curOpt;
  
    for (a = 0; a < argList.length; a++) {
        thisOpt = argList[a].trim();
        opt = thisOpt.replace(/^-+/, '');

        if (opt === thisOpt) {
            // argument value
            if (curOpt) {
                arg[curOpt] = opt;
            }
            curOpt = null;
        } else {
            // argument name
            curOpt = opt;
            arg[curOpt] = true;
        }
    }

    // if no explicit -site parameter supplied set to default
    if (!arg['site']) {
        arg['site'] = 'default';
    }    

    // if a parameter matches a configured site use that. Convenience shortcut (e.g. gulp deploy -master).
    const configuredSites = Object.keys(buildConfig.sites);    
    for (let i = 0; i < configuredSites.length; i++) {

        const site = configuredSites[i];
        if (arg[site]) {
           
            arg['site'] = site;
            break;
        }  
    }    
  
    return arg;

})(process.argv);

// parse the folder name
const foldersInPath = process.env.INIT_CWD.split('\\');
let folderName = foldersInPath[foldersInPath.indexOf('custom_cards') + 1];
if (arg.folderName) {
    folderName = arg.folderName;
}

function getConfigOrNull(configFilePath) {
    if (!fs.existsSync(configFilePath)) {
        return null;
    }
    const rawData = fs.readFileSync(configFilePath);
    return JSON.parse(rawData);
}

const cardConfig = getConfigOrNull(`./${folderName}/config.json`);
let entryFile = !fs.existsSync(`./${folderName}/${folderName}.tsx`) ? `./${folderName}/${folderName}.jsx` : `./${folderName}/${folderName}.tsx`;
if (!fs.existsSync(entryFile)) {
    entryFile = `./${folderName}/${folderName}.js`;
}

const site = buildConfig.sites[arg.site];
const customPortletId = !site || !cardConfig || typeof (cardConfig.sites[arg.site]) === 'undefined' ? undefined : cardConfig.sites[arg.site].id;
const bypassServerTransform = cardConfig && typeof (cardConfig.bypassServerTransform) !== 'undefined' ? cardConfig.bypassServerTransform : true;

const rollupGlobals = { 'react': 'React', 'react-dom': 'ReactDOM', pikaday: 'Pikaday' , 'styled-components': 'styled', 'tfcFormFlowApi': 'tfcFormFlowApi'};
const rollupExternals = ['react', 'pikaday', 'react-dom', 'styled-components', 'tfcFormFlowApi'];
const babelConfig = {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    presets: [
        ['@babel/preset-typescript',
            {
                'modules': false
            }
        ],
        [
            '@babel/preset-env',
            {
                'modules': false,
                'loose': true
            }
        ],
        [
            '@babel/preset-react',
            {
                'throwIfNamespace': false // defaults to true
            }
        ],
    ],
    sourceMaps: buildConfig.sourceMaps,
    inputSourceMap: buildConfig.sourceMaps,
    plugins: [
        ['@babel/plugin-proposal-decorators', { 'legacy': true }],
        ['@babel/plugin-proposal-class-properties', { 'loose': true }]    
    ],
    babelHelpers: 'bundled',
    babelrc: false
};

const rollupInputOptions = {
    external: rollupExternals,
    input: entryFile,
    plugins: [
        nodeResolve({
            extensions: ['.mjs', '.js', '.jsx', '.json', '.tsx', '.ts']
        }),
        scss({
            output: `./${folderName}/dist/bundle.css`
        }),
        rollupSourcemaps(),
        replace(Object.assign({}, envify(env), {
            preventAssignment: true
        })),
        commonjs({
            include: 'node_modules/**',           
        }),
        babel(babelConfig)
    ]
};

const rollupOutputOptions = {
    sourcemap: buildConfig.sourceMaps,
    globals: rollupGlobals,
    format: 'iife',
    name: folderName
};

async function build() {
    const bundle = await rollup.rollup(rollupInputOptions);
    const gen = await bundle.generate(rollupOutputOptions);
    gen.output.forEach(output => {
        if (buildConfig.sourceMaps) {
            output.code += `\n//# sourceURL=${folderName}.js`;
            output.code += `\n//# sourceMappingURL=${output.map.toUrl()}`;
        }
    });
    return gen;
}

function hasMissingParameters(checkSite, checkFolder, checkCard) {
    let missingParameters = false;

    if (checkSite && !site) {
        log.warn('No api configuration found for the site ' + arg.site.yellow + '. Check the ' + 'config.json'.magenta + ' in the root folder.');
        missingParameters = true;
    }

    if (checkCard && !customPortletId) {
        log.warn('No custom portlet id found for ' + arg.site.yellow + '. Check the ' + 'config.json'.magenta + ' in the folder ' + folderName.yellow);
        missingParameters = true;
    }

    if (checkFolder && !folderName) {
        log.warn('No custom card folder name found. Use ' + '--folderName'.yellow + ' myCardFolder'.magenta + ' , or run the command from the card folder.');
        missingParameters = true;
    } 

    return missingParameters;
}

gulp.task('eslint', () => {
    if (process.argv.indexOf('--no-lint') > -1) {
        log('List disabled with --no-lint. Bypassing...');
        return Promise.resolve();
    }

    return gulp.src([`./${folderName}/**/*.js`,`./${folderName}/**/*.ts`,`./${folderName}/**/*.jsx`,`./${folderName}/**/*.tsx`])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

gulp.task('sass', async () => {
    if (hasMissingParameters(false, true, false)) {
        return Promise.reject('Parameter validation failed');
    }

    if (process.argv[3] === '--no-sass-compile') {
        log('Moving sass to dist. Not compiling to CSS. Imports will not work with this option.');
        return gulp.src(`./${folderName}/${folderName}.scss`)
            .pipe(gulp.dest(`./${folderName}/dist/`));
    }

    log('Compiling sass...');
    return gulp.src(`./${folderName}/${folderName}.scss`)
        .pipe(sass({
            importer: moduleImporter()            
        }).on('error', sass.logError))
        .pipe(tfSassReplace())
        .pipe(gulp.dest(`./${folderName}/dist/`));
});

gulp.task('build', async () => {
    if (hasMissingParameters(false, true, false)) {
        return Promise.reject('Parameter validation failed');
    }
    log('Building custom card ' + folderName.magenta);
    const gen = await build();    
    return file(`${folderName}.js`, gen.output[0].code, { src: true })
        .pipe(plumber())
        .pipe(gulpif(buildConfig.sourceMaps, sourcemaps.init({ loadMaps: true })))
        .pipe(gulpif(buildConfig.sourceMaps, sourcemaps.write('./')))
        .pipe(gulpif(buildConfig.sourceMaps, gulpReplace(`sourceMappingURL=${folderName}.js.map`, `sourceMappingURL=file:///${__dirname.replace(/\\/g, '/')}/${folderName}/dist/${folderName}.js.map`)))
        .pipe(gulp.dest(`${folderName}/dist`));
});

gulp.task('auth-test', async () => {
    if (hasMissingParameters(true, false, false)) {
        return Promise.reject('Parameter validation failed');
    }

    log('Testing authentication to site url ' + site.baseUrl.magenta);

    let response = await fetch(`${site.baseUrl}/api/users/current`, {
        method: 'get',
        headers: {
            'Authorization': site.restToken
        }
    });    

    if (response.status === 200) {
        log('Response: ' + response.status.toString().yellow + ' ' + response.statusText.green);
        const user = await response.json();
        log('Logged on as ' + `${user.firstName} ${user.lastName}`.cyan + ' with username ' + user.username.magenta);
    } else {       
        log.error('Response: ' + response.status.toString().red + ' ' + response.statusText.magenta);
    }
});

gulp.task('clean', async () => {
    if (hasMissingParameters(false, true, false)) {
        return Promise.reject('Parameter validation failed');
    }

    const directory = `./${folderName}/dist`;
    if (!fs.existsSync(directory)) {
        return Promise.resolve();
    }
    return await fs.readdir(directory, (err, files) => {
        if (err) {
            Promise.reject(err);
        }

        for (const file of files) {
            fs.unlink(path.join(directory, file), err => {
                if (err) {
                    Promise.reject(err);
                }
            });
        }

    });
});

function getFileOrEmpty(fileName, encoding = 'utf8') {
    try {
        let fileData = fs.readFileSync(fileName, { encoding });

        // If there are no imports in js files, then the bundle.css will simply say undefined. Must return emtpy instead.
        if (fileName.indexOf('bundle.css') > -1 && fileData.indexOf('undefined') === 0) {
            fileData = '';
        }
        return fileData;
    } catch (_e) {
        log.warn('WARNING:'.yellow + ' File at path ' + fileName.magenta + ' not found. Returning empty string.');
        return '';
    }
}

gulp.task('push', async () => {
    if (hasMissingParameters(true, true, true)) {
        return Promise.reject('Parameter validation failed');
    }

    log('Pushing custom card code to site url ' + site.baseUrl.magenta + ' with custom portlet id ' + customPortletId.toString().yellow + ' ...');

    const styleFileType = process.argv[3] === '--no-sass-compile' ? 'scss' : 'css';

    const response = await fetch(`${site.baseUrl}/api/customportlets/${customPortletId}`, {
        method: 'patch',
        body: JSON.stringify({
            portletTemplateId: customPortletId,
            clientTemplate: getFileOrEmpty(`./${folderName}/dist/${folderName}.js`),
            styleTemplate: getFileOrEmpty(`./${folderName}/dist/${folderName}.${styleFileType}`) + '\n' + getFileOrEmpty(`./${folderName}/dist/bundle.css`),
            htmlTemplate: getFileOrEmpty(`./${folderName}/${folderName}.html`),
            isCurrent: true,
            isTransformDisabled: bypassServerTransform
        }),
        headers: {
            'Authorization': site.restToken,
            'Content-Type': 'application/json'
        }
    });

    if (response.status === 200) {
        log('Response: ' + response.status.toString().yellow + ' ' + response.statusText.green);
    } else {
        log.error('Response: ' + response.status.toString().red + ' ' + response.statusText.magenta);
        throw new Error('Failed to push card');
    }
});

gulp.task('create', async () => {
    if (hasMissingParameters(true, true, false)) {
        return Promise.reject('Parameter validation failed');
    }

    const manifest = getConfigOrNull(`./${folderName}/manifest.json`);
    if (!manifest) {
        return Promise.reject('Card is missing a manifest.json. Unable to create card on remote ThoughtFarmer.');
    }

    log('Creating custom card code to site url ' + site.baseUrl.magenta + ' ...');

    const styleFileType = process.argv[3] === '--no-sass-compile' ? 'scss' : 'css';

    const body = Object.assign({            
        clientTemplate: getFileOrEmpty(`./${folderName}/dist/${folderName}.js`),
        styleTemplate: getFileOrEmpty(`./${folderName}/dist/${folderName}.${styleFileType}`) + '\n' + getFileOrEmpty(`./${folderName}/dist/bundle.css`),
        htmlTemplate: getFileOrEmpty(`./${folderName}/${folderName}.html`)
    }, manifest);

    body.defaultConfiguration = JSON.stringify(manifest.defaultConfiguration, null, 4);

    const response = await fetch(`${site.baseUrl}/api/customportlets/`, {
        method: 'post',
        body: JSON.stringify(body),
        headers: {
            'Authorization': site.restToken,
            'Content-Type': 'application/json'
        }
    });

    if (response.status === 200) {
        log('Response: ' + response.status.toString().yellow + ' ' + response.statusText.green);
        const newCustomPortlet = await response.json();

        let config = getConfigOrNull(`./${folderName}/config.json`);

        if (!config) {
            config = {
                sites: {
                    [arg.site]: {
                        id: newCustomPortlet.portletTemplateId
                    }
                }
            };    
        } else {
            config.sites[arg.site] = { id: newCustomPortlet.portletTemplateId};
        } 

        fs.writeFileSync(`./${folderName}/config.json`, JSON.stringify(config, null, 4));

    } else {
        log.error('Response: ' + response.status.toString().red + ' ' + response.statusText.magenta);
        throw new Error('Failed to push card');
    }
});

gulp.task('upgrade', async () => {
    if (hasMissingParameters(true, true, true)) {
        return Promise.reject('Parameter validation failed');
    }

    log('Upgrading custom card at site url ' + site.baseUrl.magenta + ' with custom portlet id ' + customPortletId.toString().yellow + ' ...');

    const response = await fetch(`${site.baseUrl}/api/customportlets/${customPortletId}/upgrade`, {
        method: 'post',
        headers: {
            'Authorization': site.restToken,
        }
    });

    if (response.status === 200) {
        log('Response: ' + response.status.toString().yellow + ' ' + response.statusText.green);
    } else {
        log('Response: ' + response.status.toString().red + ' ' + response.statusText.magenta);
        throw new Error('Failed to upgrade card');
    }
});


// Gulp-file seems to signal it is complete before the operation has actually flushed to disk.
// This is a workaround.
gulp.task('wait', () => {

    const styleFileType = process.argv[3] === '--no-sass-compile' ? 'scss' : 'css';

    if (!fs.existsSync(`./${folderName}//dist/${folderName}.js`) || !fs.existsSync(`./${folderName}//dist/${folderName}.${styleFileType}`)) {
        log('Files not found. Wait a millisec...');
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve();
            }, 200);
        });
    } else {
        return Promise.resolve();
    }
});

gulp.task('newcard', async (done) => {
    const answer = await inquirer
        .prompt([{
            type: 'input',
            name: 'cardName',
            message: 'Enter camel case name of new card:',
            validate: (cardName) => {
                if (typeof cardName === undefined || !cardName.length) {
                    return 'Must enter a name';
                }
                cardName.replace(/[\^#%&$*:<>?/{|}\s()]/g, '');
                return true;
            }
        },
        {
            type: 'expand',
            name: 'cardType',
            message: 'Using .tsx (t) or .jsx (j) components? Or a webpage (w) with HTML and JavaScript?',
            choices: [{
                key: 't',
                value: 'tsx'
            }, {
                key: 'j',
                value: 'jsx'
            },
            {
                key: 'w',
                value: 'html'
            }]
        },
        {
            type: 'input',
            name: 'customPortletId',
            message: 'Enter custom portlet id for site:',
            validate: (customPortletId) => {
                if (typeof + customPortletId !== 'number' || +customPortletId < 0) {
                    return 'Must enter a number over 0.';
                }
                return true;
            }
        }
        ]);

    const configObject = {
        sites: {
            default: {
                id: answer.customPortletId
            }
        }
    };  
    const configContents = JSON.stringify(configObject, null, 4);    

    fs.mkdirSync(`./${answer.cardName}`);
    fs.mkdirSync(`./${answer.cardName}/components`);
    fs.writeFileSync(`./${answer.cardName}/${answer.cardName}.${answer.cardType}`, '');
    if (answer.cardType === 'html') {
        fs.writeFileSync(`./${answer.cardName}/${answer.cardName}.js`, '');
    }
    fs.writeFileSync(`./${answer.cardName}/${answer.cardName}.scss`, '');
    fs.writeFileSync(`./${answer.cardName}/config.json`, configContents);
    done();
    log(`Successfully created new card ${answer.cardName} with custom portlet id ${answer.customPortletId}.`);

});

gulp.task('manifest', async (done) => {
    if (hasMissingParameters(false, true, false)) {
        return Promise.reject('Parameter validation failed');
    }

    const answer = await inquirer
        .prompt([{
            type: 'input',
            name: 'name',
            message: 'Name of the card: ',
            validate: (value) => {
                if (!value.length) {
                    return 'Name is required.';
                }
                return true;
            }
        },{
            type: 'input',
            name: 'description',
            message: 'Description of the card (optional): ',
            default: ''
        },{
            type: 'input',
            name: 'url',
            message: 'Url for the card (optional): ',
            default: ''
        },{
            type: 'confirm',
            name: 'isActive',
            message: 'Activate the card?',
            default: 'Y'
        },
        {
            type: 'expand',
            name: 'customCardTemplateType',
            message: 'Global card or page card?',
            choices: [{
                key: 'g',
                value: 1
            }, {
                key: 'p',
                value: 0
            }],
            default: 'p'
        },
        {
            type: 'confirm',
            name: 'isAdminOnly',
            message: 'Is admin only?',
            default: 'N'
        },
        {
            type: 'confirm',
            name: 'hasConfig',
            message: 'Has configuration options?',
            default: 'N'
        },
        {
            type: 'confirm',
            name: 'canOverrideConfig',
            message: 'Can override config on template page?',
            default: 'N'
        }
        ]);

    answer.isTransformDisabled = true;
    if (answer.hasConfig) {
        answer.defaultConfiguration = {};
    }
    delete answer.hasConfig;
    
    
    fs.writeFileSync(`./${folderName}/manifest.json`, JSON.stringify(answer, null, 4));
    done();
    log('Finished creating manifest.json file with data');
    log(answer);

});

gulp.task('config', async (done) => {

    if (hasMissingParameters(false, true, false)) {
        return Promise.reject('Parameter validation failed');
    }

    const answer = await inquirer
        .prompt([{
            type: 'input',
            name: 'customPortletId',
            message: 'Enter custom portlet id for this card:',
            validate: (customPortletId) => {
                if (+customPortletId < 0) {
                    return 'Must enter a number over 0.';
                }
                return true;
            }
        }]);

    const configObject = {
        sites: {
            default: {
                id: answer.customPortletId
            }
        }
    };  
    const configContents = JSON.stringify(configObject, null, 4);

    fs.writeFileSync(`./${folderName}/config.json`, configContents);
    done();
    log(`Successfully created config file for ${folderName} with custom portlet id ${answer.customPortletId}.`);
    log(configContents);

});

gulp.task('deploy', gulp.series('clean', 'eslint', 'build', 'sass', 'wait', 'push', 'upgrade'));

gulp.task('dev-deploy', gulp.series('clean', 'build', 'sass', 'wait', 'push', 'upgrade'));

gulp.task('compile', gulp.parallel('build', 'sass'));