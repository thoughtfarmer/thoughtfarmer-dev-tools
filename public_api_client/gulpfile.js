const gulp = require('gulp');
const rollup = require('rollup');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('rollup-plugin-babel');
const rollupSourcemaps = require('rollup-plugin-sourcemaps');
const plumber = require('gulp-plumber');
const file = require('gulp-file');
const resolve = require('rollup-plugin-node-resolve'); 

const babelConfig = {    
    extensions: ['.js','.ts'],
    presets: [    
        ['@babel/preset-typescript',            
            {
                'modules': false
            }      
        ],     
        [      
            '@babel/preset-env',
            {
                'modules': false
            }        
        ]      
       
    ],
    sourceMaps: true,
    inputSourceMap: true,
    exclude: 'node_modules/**',
    plugins: [   
        ['@babel/plugin-proposal-class-properties', { 'loose': true }],
        ['@babel/plugin-proposal-private-methods', { 'loose': true }]        
    ],
    externalHelpers: true,
    babelrc: false
};

const rollupInputOptions = {   
    input: './test/index.ts',
    plugins: [    
        resolve({
            extensions: [ '.mjs', '.js', '.jsx', '.json' , '.tsx', '.ts']            
        }),
        rollupSourcemaps(),      
        babel(babelConfig),      
    ]
};

const rollupOutputOptions = {
    sourcemap: true,     
    format: 'iife',
    name: 'thoughtfarmerApi'
};

async function build() {
    const bundle = await rollup.rollup(rollupInputOptions);
    const gen = await bundle.generate(rollupOutputOptions);
    gen.output.forEach(output => {
        output.code += `\n//# sourceMappingURL=${output.map.toUrl()}`;       
    });
    return gen;
}

gulp.task('build', async () => {   
    const gen = await build();
    return file('thoughtfarmerApi.js', gen.output[0].code, { src: true })
        .pipe(plumber())
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(sourcemaps.write('./bin/'))
        .pipe(gulp.dest('test/bin'));
});