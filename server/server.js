import express from "express";
import cors from "cors";
import colors from "colors"
import apiRoutes from "./routes/apiRoutes.js";
import errorhandler from "./middleware/errorHandler.js";


const app = express()
const port = process.env.PORT || 8080

// CORS configuration for production
const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? process.env.CLIENT_URL 
    : ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true
}

app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/api/response",apiRoutes)

app.use(errorhandler)
app.listen(port,()=>{console.log(`Server is running on ${port}...`.bgBlue)})