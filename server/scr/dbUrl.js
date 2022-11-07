const Url = require("./models/url");
const save = (longURL, shortURL, shortUrlId) => {
  Url.create({ longURL, shortURL, shortUrlId })
  console.log('teste')
};
const find = (shortUrlId) => Url.findOne({ shortUrlId: shortUrlId });
module.exports = {
  save,
  find
};
