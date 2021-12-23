import { MongoClient } from 'mongodb'
const MONGODB_URI = "mongodb+srv://unio:UKqT_H2bv7!zU!D@cluster0.hx0my.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
const MONGODB_DB = "show"
let cached = global.mongo
if (!cached) {
  cached = global.mongo = { conn: null, promise: null }
}

export async function connectToDatabase() {
  if (cached.conn) {
    // eslint-disable-next-line no-console
    console.log('cached.conn haved')
    return cached.conn
  }
  if (!cached.promise) {
    const opts = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
    cached.promise = MongoClient.connect(MONGODB_URI, opts).then((client) => {
      // eslint-disable-next-line no-console
      console.log('first connected mongodb  dont have pached.promise ')
      return {
        client,
        db: client.db(MONGODB_DB),
      }
    })
  }
  // eslint-disable-next-line no-console
  console.log('connected mongodb')
  cached.conn = await cached.promise
  return cached.conn
}