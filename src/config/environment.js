import "dotenv/config";
export const env = {
  MONGODB_URI: process.env.MONGODB_URI,
  DATABASENAME: process.env.DATABASENAME,
  APP_HOST: process.env.APP_HOST,
  APP_PORT: process.env.APP_PORT,
};
