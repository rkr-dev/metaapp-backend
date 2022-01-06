import mongoose from 'mongoose'

export const connectMongo = async () => {
  const conn = await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  console.table(`$$ ~ Mongodb connected to${conn.connection.host}`)
}
