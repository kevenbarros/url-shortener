const mongosse = require('mongoose')
mongoose.connect(
  `mongodb+srv://admin:1234@urlgenerator.db68ucz.mongodb.net/?retryWrites=true&w=majority`
)
  .then(() => {
    console.log("mongoDB conection is working");
    app.listen(5000); //if conection with DB is ok, start the backend
  }).catch(err => console.log(err));

mongosse.Promise = global.Promise

module.exports = mongosse
