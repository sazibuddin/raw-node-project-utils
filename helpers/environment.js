const environments = {};

environments.staging = {
    port: 3002,
    envName: 'staging',
    secretKey: 'stage-cc-99',
}

environments.production = {
    port: 5000,
    envName: 'production',
    secretKey: 'prod-cc-00',
}

const currentEnvironment = typeof process.env.NODE_ENV === 'string' ? process.env.NODE_ENV : 'staging';

const environmentToExport = typeof environments[currentEnvironment] === 'object'
    ? environments[currentEnvironment]
    : environments.staging

module.exports = environmentToExport;