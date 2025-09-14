const env = import.meta.env.ENV || "local";

const configEnv = {
  development: {
    api: import.meta.env.API_BASE_URL || "https://apidev.eons.es/",
    env: "development",
  },
  production: {
    api: import.meta.env.API_BASE_URL || "https://api.eons.es/",
    env: "production",
  },
  local: {
    api: import.meta.env.API_BASE_URL || "http://localhost:3000/",
    env: "local",
  },
}[env];

export default configEnv;