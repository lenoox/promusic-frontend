export const environment = {
  production: true,
  apiUrl: window["env"] &&
      window["env"]["apiUrl"] ? window["env"]["apiUrl"] : 'http://localhost:4200',
  oauthSecret: window["env"] &&
      window["env"]["oauthSecret"] ? window["env"]["oauthSecret"] : 'oauth-test-app',
  demoActive: true
};
