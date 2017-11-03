// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
    production: false,
 

    baseApiUrl: 'http://127.0.0.1:8000',
    baseApiPrefix : 'api',
    baseApiVersion: 'v1',
    baseApiClientId : 1,
    baseApiClientSecret: 'R4Or1eGJ4hOn7myFnJLc9UY4T2VCQB9SvVHYiyA6',
    baseApiGrantType : 'password' 
};