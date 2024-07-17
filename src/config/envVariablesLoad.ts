import * as dotenv from "dotenv";

type configVariables = {
  APP_PORT: string,
  DATABASE_URL: string,
  JWT_SECRET: string,
  JWT_SECRET_EXPIRES_IN: string
}

dotenv.config();

const requiredEnvVariables = [
  "APP_PORT",
  "DATABASE_URL",
  "JWT_SECRET",
  "JWT_SECRET_EXPIRES_IN"
];

let config: configVariables = {
  APP_PORT: "",
  DATABASE_URL: "",
  JWT_SECRET: "",
  JWT_SECRET_EXPIRES_IN: ""
};

requiredEnvVariables.forEach(variable => {
  if (!process.env[variable]) {
    throw new Error(`Missing required environment variable: ${variable}`);
  }
  config[variable] = process.env[variable]
});

export default config