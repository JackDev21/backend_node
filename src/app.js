import express from "express"
import "dotenv/config"
import mongoose from "mongoose"
import userRoutes from "./routes/user.routes.js"
import bodyParser from "body-parser"

// Usamos express para los middlewares
const app = express()
app.use(bodyParser.json()) // Parsear el body a JSON

// Conectaremos la base de datos:
const mongoURL = `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@mongodb:27017/${process.env.MONGO_DB_NAME}?authSource=admin`;
mongoose.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection

app.use("/users", userRoutes)

const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})