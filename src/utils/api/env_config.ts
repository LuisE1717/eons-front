const env = 'development';
//const env = 'production';
//const env = 'refactor';

const configEnv = {
  development: {
    api: 'https://eons-back.onrender.com/',
    env: 'development'
  },
  production: {
    api: 'https://eons-back.onrender.com/',
    env: 'production'
  },
}[env];

export default configEnv;