// mongoClient.js
import dotenv from 'dotenv';
import { MongoClient } from "mongodb";

dotenv.config()

const client = new MongoClient(process.env.URI);
export default client;