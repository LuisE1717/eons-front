const env = "production";
//const env = 'production';
//const env = 'refactor';

const configEnv = {
  development: {
    api: "https://apidev.eons.es/",
    env: "development",
  },
  production: {
    api: "https://api.eons.es/",
    env: "production",
  },
  local: {
    api: "http://localhost:3000/",
    env: "local",
  },
}[env];

export default configEnv;
