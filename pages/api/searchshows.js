import { connectToDatabase } from './mongodb';
module.exports = async (req, res) => {
    const { body } = req
    const { db } = await connectToDatabase()
    const collection = await db.collection('goods')
    let find = {}
    if (JSON.parse(body).marque != '全部品牌')
        find.marque = JSON.parse(body).marque
    if (JSON.parse(body).type != '全部品类')
        find.type = JSON.parse(body).type
    console.log(find);
    const result = await collection.find(find).sort({ "_id": -1 }).toArray()
    res.status(200).json(result)
    return
}