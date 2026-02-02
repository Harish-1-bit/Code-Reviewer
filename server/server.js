import express from "express";
import colors from "colors"
import apiRoutes from "./routes/apiRoutes.js";
import errorhandler from "./middleware/errorHandler.js";


const app = express()
const port = process.env.PORT

app.use(express.json())
app.use(express.urlencoded())

app.use("/api/response",apiRoutes)

app.use(errorhandler)
app.listen(port,()=>{console.log(`Server is running on ${port}...`.bgBlue)})