import { MongoClient } from 'mongodb'

const mongodbUsername = process.env.MONGODB_USERNAME;
const mongodbPassword = process.env.MONGODB_PASSWORD;
const mongodbUri = process.env.MONGODB_URI;

let fullMongoUrl = `mongodb+srv://${mongodbUsername}:${mongodbPassword}@${mongodbUri}`

if (process.env.LOCAL) {
  fullMongoUrl = "mongodb://127.0.0.1:27017/tcc"
}

console.log("full mongo url", fullMongoUrl)

export const connectToMongo = () =>
  
  new Promise((resolve, reject) => {
    MongoClient.connect(
      fullMongoUrl,
      {
        useNewUrlParser: true,
      },
      (error, client) => {
        if (error) {
          console.error(`Failed to connect to DB at ${mongodbUri}`)
          reject(error)
        }
        console.log("mongo client", client);

        resolve(client.db(process.env.MONGODB_DB))
      }
    )
  })
