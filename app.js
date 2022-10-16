import express from "express";
import tasks from "./routes/tasks.js"
import { connectDB } from "./db/connect.js";
import { notFound } from "./middleware/not_found.js";
import { errorHandlerMiddleware } from "./middleware/error_handler.js";
import env from "dotenv"

env.config()
const app = express()
const port = process.env.PORT || 3000

//middleware
app.use(express.json())

//routes
app.use("/api/v1/tasks",tasks)

app.use(notFound)
app.use(errorHandlerMiddleware)

async function start(){
    try{
        await connectDB(process.env.MONGO_URI)
        app.listen(port,console.log(`server is listening on port ${port}...`))
    }catch(err){
        console.log(err);
    }
}

start()

