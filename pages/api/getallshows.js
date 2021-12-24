import { connectToDatabase } from './mongodb';
module.exports = async (req, res) => {
    const { db } = await connectToDatabase()
    const collection = await db.collection('goods')
    const result = await collection.find().sort({"_id":-1}).toArray()
    res.status(200).json(result)

    return
}