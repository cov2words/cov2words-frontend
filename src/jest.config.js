const esModules = ['@ionic'].join('|');
module.exports = {
  transformIgnorePatterns: [
    `<rootDir>/node_modules/(?!${esModules})`
  ],
  //collectCoverageFrom: ['src/**/*.{ts,js}']
};