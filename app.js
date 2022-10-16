import express from "express";
import tasks from "./routes/tasks.js"
import { connectDB } from "./db/connect.js";
import env from "dotenv"

env.config()
const app = express()
const port = process.env.PORT

//middleware
app.use(express.json())

//routes
app.use("/api/v1/tasks",tasks)

async function start(){
    try{
        await connectDB(process.env.MONGO_URI)
        app.listen(port,console.log(`server is listening on port ${port}...`))
    }catch(err){
        console.log(err);
    }
}

start()

