import { MongoClient } from "mongodb";
import dbConfig from "../config/dbConfig";

export async function connectToDatabase() {
  const client = await MongoClient.connect(`${dbConfig.dev}`);

  return client;
}
