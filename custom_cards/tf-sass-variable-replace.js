/* eslint-disable @typescript-eslint/no-var-requires */
const rs = require('replacestream');
const { Transform } = require('stream');

const tfThemeVariables = [
    'siteAccentColor', 
    'bodyFontColor', 
    'mainNavigationSelectedBackgroundColor', 
    'mainNavigationSelectedFontColor', 
    'mainNavigationNormalFontColor',
    'buttonBackgroundColor', 
    'buttonOverBackgroundColor',
    'highImportanceLinkColor'
];

module.exports = function() {    
    return new Transform({             
        objectMode: true,
        transform: function(file, enc, callback) {            
            if (file.isNull()) {
                return callback(null, file);
            }           

            tfThemeVariables.forEach( (tfThemeVariable) => {
                const search = `"${tfThemeVariable}"`;
                const replacement = `$${tfThemeVariable}`;
                if (file.isStream()) {
                    file.contents = file.contents.pipe(rs(search, replacement));                                      
                } else if (file.isBuffer()) {
                    const chunks = String(file.contents).split(search);          
                    const result = chunks.join(replacement);                                        
                    file.contents = Buffer.alloc(Buffer.byteLength(result, enc), result, enc);                    
                }
            });          
            return callback(null, file);
        }
    });
};