


export const ClassNameConfigurations = {
    hideTopBorder: 'hideTopBorder',
    hideBottomBorder: 'hideBottomBorder'
};

const ConfigClassMappings = {
    hideTopBorder: 'tfc-hide-top-border',
    hideBottomBorder: 'tfc-hide-bottom-border'
};

export const GetClassNamesFromConfig = (config: any) => {
    let classNames = '';
    Object.keys(ClassNameConfigurations).forEach( key => {
        if (config[key] && ConfigClassMappings[key]) {
            classNames += ` ${ConfigClassMappings[key]}`;
        }
    });
    return classNames;
};
