//4CzA7PAmoowRXk19
//huanle120201
import { env } from "./environment";

const MONGODB_URI = env.MONGODB_URI;

const DATABASE_NAME = env.DATABASE_NAME;

import { MongoClient, ServerApiVersion } from "mongodb";
let trelloDatabaseInstance = null;
const mongoClientInstance = new MongoClient(MONGODB_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

export const CONNECT_DB = async () => {
  //goi ket noi den mongo atlas
  await mongoClientInstance.connect();
  // ket noi thanh cong lay db theo dbname roi gan vao trellDatabaseInstance
  trelloDatabaseInstance = mongoClientInstance.db(DATABASE_NAME);
};
export const GET_DB = () => {
  if (!trelloDatabaseInstance) throw new Error("Must connect to db ");
  return trelloDatabaseInstance;
};
export const CLOSE_DB = async () => {
  await mongoClientInstance.close;
};
