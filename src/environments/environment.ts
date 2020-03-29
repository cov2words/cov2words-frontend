export const environment = {
    production: false
};
/**
 * Production environment (PROD).
 * Always reflect changes in E2E testing environment.
 */
export const ENV = {
    appId: 'cov2words-webapp',
    description: 'PROD',
    production: true,
    version: '%VERSION%',
    cov2words: {
        apiBaseUrl: 'https://cov2words.hepp.io',
    }
};
