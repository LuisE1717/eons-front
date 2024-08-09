const env = "production";
//const env = 'production';
//const env = 'refactor';

const configEnv = {
  development: {
    api: "https://eons-back.onrender.com/",
    env: "development",
  },
  production: {
    api: "https://eons-services.onrender.com/",
    env: "production",
  },
  local: {
    api: "http://localhost:3000/",
    env: "local",
  },
}[env];

export default configEnv;
