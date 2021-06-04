export function buildQueryString(parameters: object) {
    const queryString = [];
    for (const parameter in parameters) {
        // eslint-disable-next-line no-prototype-builtins
        if (parameters.hasOwnProperty(parameter)) {
            const value = parameters[parameter];

            if (typeof(value) === 'undefined') {
                continue;
            }

            queryString.push(parameter + '=' + encodeURIComponent(value));
        }
    }
    return queryString.join('&');
}
