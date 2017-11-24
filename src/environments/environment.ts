// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
    production: false,
    urls :'http://localhost:3001',


    baseApiUrl: 'http://localhost:8000',
    baseApiPrefix : 'api',
    baseApiVersion: 'v1',
    baseApiClientId : 6,
    baseApiClientSecret: 'hkCd3B6uOElvkclVE4BVYAN5X4gyUlrRzXysmA1H',
    baseApiGrantType : 'password'
};
