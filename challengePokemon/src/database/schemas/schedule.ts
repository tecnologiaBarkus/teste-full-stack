import * as mongoose from "mongoose"

const Schema = mongoose.Schema

const schema = new Schema({
    type: String,
    emails: Array<String>(),
    date: Date
})

export default mongoose.model('schedule',schema)