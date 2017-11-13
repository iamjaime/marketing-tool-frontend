// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
    production: false,
 

    baseApiUrl: 'http://127.0.0.1:8000',
    baseApiPrefix : 'api',
    baseApiVersion: 'v1',
    baseApiClientId : 4,
    baseApiClientSecret: 'vhywQlpzd6yvhjZ1tq7ZJ31Jq1RRFsDaEX3wRN7Q',
    baseApiGrantType : 'password' 
};