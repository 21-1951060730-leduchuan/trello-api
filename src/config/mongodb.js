//4CzA7PAmoowRXk19
//huanle120201
const MONGODB_URI =
  "mongodb+srv://huanle120201:4CzA7PAmoowRXk19@trello-api.jmckoii.mongodb.net/?retryWrites=true&w=majority";
const DATABASE_NAME = "trello-api";

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
