import express from 'express'
import { router } from "./routes"
import mongoose from "mongoose"
import { config } from "dotenv";
import { MailJob } from './job/mailJob';

config()

const app  = express()

app.use(express.json())
app.use(router)

mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}` + 
`@${process.env.MONGO_CLUSTER}/${process.env.MONGO_DB}?retryWrites=true&w=majority`, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err) => {
    if(!err) {
        console.log('connected to database!')
        MailJob.checkMailsToSend()
    } else {
        console.log('mongo error', err)
        console.log('user', process.env.MONGO_USER)
    }
})

export { app }