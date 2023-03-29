
import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import bodyParser from "body-parser"
import { routesModule } from "./routes/index"

const app = express();
app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(routesModule())

mongoose
  .connect(
    `mongodb+srv://admin:1234@urlgenerator.db68ucz.mongodb.net/?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log("mongoDB conection is working");
    app.listen(3333);
  })
  .catch(err => console.log(err,"deu erro :( "));


export { app }
