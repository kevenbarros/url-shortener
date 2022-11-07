
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require("body-parser");
const { routesModule } = require("./routes/index")
// const services = require("./routes/service");
// const urlDb = require("./dbUrl");


const app = express();
app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(routesModule())

// app.post("/url", async (req, res) => {
//   try {
//     if (!!services.validateUrl(req.body.url)) return res.status(400).send({ msg: "Invalid URL." });

//     const urlKey = services.generateUrlKey();
//     console.log(urlKey)
//     const shortUrl = `http://localhost:5000/${urlKey}`
//     await urlDb.save(req.body.url, shortUrl, urlKey)
//     return res.status(200).send({ shortUrl });
//   } catch (error) {
//     return res.status(500).send({ msg: "Error. Please try again." });
//   }

// });
// app.get("/:shortUrlId", async (req, res) => {
//   try {
//     console.log(req.params.shortUrlId)
//     const url = await urlDb.find(req.params.shortUrlId);
//     return !url ? res.status(404).send("Not found") : res.redirect(301, url.longURL)
//   } catch (error) {
//     return res.status(500).send("Error. Please try again.")
//   }
// });
mongoose
  .connect(
    `mongodb+srv://admin:1234@urlgenerator.db68ucz.mongodb.net/?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log("mongoDB conection is working");
    app.listen(5000); //if conection with DB is ok, start the backend
  })
  .catch(err => console.log(err));



module.exports = app 
