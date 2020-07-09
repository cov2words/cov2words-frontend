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
        apiBaseUrl: 'https://api.cov2words.com',
    },
    firebaseConfig: {
      apiKey: "AIzaSyB-kDN2AyWTDTJ2DVWl-2JHRyKLPOgNcs0",
      authDomain: "cov2words-abba6.firebaseapp.com",
      databaseURL: "https://cov2words-abba6.firebaseio.com",
      projectId: "cov2words-abba6",
      storageBucket: "cov2words-abba6.appspot.com",
      messagingSenderId: "956130521305",
      appId: "1:956130521305:web:a832b11b119262ca614ec8",
      measurementId: "G-J0VXDL92D6"
    }
};
